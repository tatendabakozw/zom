import React, { useState } from "react";
import axios from 'axios'
import apiUrl from './apiUrl'

export const GetRequest = ({location}) =>{

    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(flase)

    setLoading(true)
    axios.get(`${apiUrl}/${location}`)
    .then(function (response) {
        setMsg(response.data.message)
        setLoading(false)
    })
    .catch(function (error) {
      console.log(error);
    });
}