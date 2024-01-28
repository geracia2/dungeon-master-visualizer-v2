import React, { useEffect, useState } from 'react'

const [user, setUser] = useState({}); //ZUSTAND
// we need time to check if token is loaded in to state, not just localStorage
const [loading, setLoading] = useState(true); //ZUSTAND

// grab user from database with token as ID
async function getUser(token) {
    try {
        const response = await axios.get("/api/users", {
            headers: {
                Authorization: token,
            },
        });
        setUser(response.data);
    } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
    }
    setLoading(false);
}

useEffect(() => {
    // look for token in localstorage if we are logged in.
    const token = localStorage.getItem("token");
    if (token) {
        // get user info, which is just token : asdfasdf right now in localstorage
        getUser(token);
    } else {
        setLoading(false);
    }
}, []);

export default getUser