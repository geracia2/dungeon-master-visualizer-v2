import { useEffect } from "react";
import axios from "axios";

export function loaAPI({ setApiData }) {

    async function getApiData() {

        // Fetch option:
        // try {
        //     const url = "/api/<placeholder>";
        //     const options = {
        //         method: "GET", // GET, POST, PUT, DELETE
        //         body: JSON.stringify(todo), // transferring data needs to be strings, add express.json() to the server to receive
        //         headers: {
        //             // headers just telling the receiving server what the request type is, basically to take this string and use a json method to decode?
        //             "Content-Type": "application/json",
        //         },
        //     };
        //     const response = await fetch(url, options);
        //     const data = await response.json();
        //     console.log('Response from server:')
        //     console.log(response);
        //     setApiData(data);
        // } catch (err) {
        //     console.log(error)
        // }


        // Axios Option:
        try {
            const response = await axios.get('/api/<placeholder>')
            console.log(response)
            setApiData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getApiData()
    }, [])

}