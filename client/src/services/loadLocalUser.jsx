import React, { useEffect } from 'react'
import { useStateStore } from '../store';
import { useShallow } from 'zustand/react/shallow'
import axios from 'axios';

export default function loadLocalUser() {
    let setUser = useStateStore((store) => store.setUser)
    const { loading, setLoading } = useStateStore(
        useShallow((store) => ({ loading: store.loading, setLoading: store.setLoading })),
    )

    useEffect(() => {
        // look for token in localstorage if we are logged in.
        console.log('looking into localStorage')
        const token = localStorage.getItem("token");
        if (token) {
            // get user info, which is just token : asdfasdf right now in localstorage
            console.log('got token')
            getUser(token);
        } else {
            console.log('No token')
            setLoading(false);
        }
    }, []);

    // grab user from database with token as ID
    async function getUser(token) {
        try {
            console.log('starting to get user')
            const response = await axios.get("http://localhost:5000/api/users", {
                headers: {
                    Authorization: token,
                },
            });
            setUser(response.data);
            console.log('token and DB user match', response.data)
        } catch (err) {
            console.log(err);
            localStorage.removeItem("token");
        }
        // we need time to check if token is loaded in to state, not just localStorage
        setLoading(false);
    }
    return loading;
}


