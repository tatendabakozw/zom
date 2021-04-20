import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../StateContext/StateProvider';
import axios from 'axios'
import General from '../Layout/General';
import { apiUrl } from '../API/apiUrl';

function SellerLogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')
    const [loggedInUser, setLoggedInUser] = useState()
    // eslint-disable-next-line
    const [{}, dispatch] = useStateValue()

    const loginUser = (e) => {
        e.preventDefault()
        axios.post(`${apiUrl}/auth/login`, {
            password: password,
            email: email,
        })
            .then(function (response) {
                if (response.data.error) {
                    setMsg(response.data.error)
                }
                else {
                    setLoggedInUser(response.data.user)
                    setMsg(response.data.message)
                    setErr(response.data.error)
                    localStorage.setItem('zomtoken', response.data.token)
                    localStorage.setItem('zomuser', JSON.stringify(response.data.user))
                    dispatch({
                        type: 'SET_USER',
                        user: loggedInUser
                    })
                    setTimeout(() => {
                        history.push('/dashboard')
                    }, 2000);
                }
            })
            .catch(function (error) {
                setMsg('Account Does Not Exist')
                console.log(error)
            });
    }

    console.log(err)

    return (
        <General>
            <div className="mt-16">
                <form onSubmit={loginUser} className="login flex flex-col items-center">
                <p className="text-gray-700 text-2xl mb-8 font-semibold">Thank you for becoming a seller, login to you seller dashboard</p>
                    <p className="text-gray-700 text-2xl mb-8 font-semibold">Login</p>
                    {msg ? (<p className="bg-blue-200 text-gray-700 font-semibold text-center p-2 rounded">{msg}</p>) : null}
                    <div className="emai flex flex-col md:w-2/5 w-4/5 my-4">
                        <label htmlFor="email" className="text-gray-700 text-sm mb-1">Email Address</label>
                        <input
                            type="text"
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email" className="border-2 border-green-400 rounded p-2" />
                    </div>
                    <div className="emai flex flex-col md:w-2/5 w-4/5 my-4">
                        <span className="flex flex-row items-center justify-between">
                            <p className="text-gray-700 text-sm mb-1">Password</p>
                        </span>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password" className="border-2 border-green-400 rounded p-2" />
                    </div>
                    <button type="submit" className="bg-green-500 self-center font-semibold w-2/5 mt-8 justify-center rounded text-white p-2 flex flex-row items-center">Go to dashboard</button>
                </form>
            </div>
        </General>
    )
}

export default SellerLogin
