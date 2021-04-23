import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { apiUrl } from '../API/apiUrl';
import General from '../Layout/General';
import axios from 'axios'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Register() {
    const [email, setEmail] = useState('')
    const [username, setusername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [password2, setPassword2] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordVisible2, setPasswordVisible2] = useState(false)
    const history = useHistory()

    const registerUser = (e) => {
        e.preventDefault()
        axios.post(`${apiUrl}/auth/register`, {
            email: email,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            username: username,
            password: password,
            password2: password2
        })
            .then(function (response) {
                if (response.data.error) {
                    setMsg(response.data.error)
                }
                else {
                    setMsg(response.data.message)
                    setTimeout(() => {
                        history.push('/login')
                    }, 2000);
                }
            })
            .catch(function (error) {
                setMsg('Something went wrong, refresh page')
                console.log(error)
            });
    }

    return (
        <General>
            <div className="mt-16 pb-8">
                <form onSubmit={registerUser} className="login flex flex-col items-center">
                    <p className="text-gray-700 text-2xl mb-8 dark:text-white font-semibold">Sign Up</p>
                    {msg ? (<p className="bg-blue-200 text-gray-700 capitalize font-semibold text-center p-2 rounded">{msg}</p>) : null}
                    {/* <button className="bg-green-900 self-center w-2/5 justify-center rounded p-2 flex flex-row items-center ">
                    <img src={google} alt="logo" className="w-8 mr-2"/>
                    <p className="text-white font-semibold">Sign in using Google</p>
                </button>
                <p className="text-gray-500 my-4">or sign in using credentials</p> */}
                    <div className="first grid grid-cols-2 gap-2 md:grid-cols-1 items-center justify-between md:w-2/5 w-4/5">
                        <div className="emai flex flex-col w-full my-4 col-span-1">
                            <label htmlFor="email" className="text-gray-700 text-sm mb-1 dark:text-gray-200 font-semibold">First Name</label>
                            <input
                                type="text"
                                id="email"
                                onChange={e => setFirstname(e.target.value)}
                                placeholder="Your first name" className="border-2 border-green-400 rounded p-2" />
                        </div>
                        <div className="emai flex flex-col w-full my-4 col-span-1">
                            <label htmlFor="email" className="text-gray-700 text-sm mb-1 dark:text-gray-200 font-semibold">Last Name</label>
                            <input
                                type="text"
                                id="email"
                                onChange={e => setLastname(e.target.value)}
                                placeholder="Your last name" className="border-2 border-green-400 rounded p-2" />
                        </div>
                    </div>
                    <div className="emai flex flex-col md:w-2/5 w-4/5 my-4">
                        <label htmlFor="service" className="text-gray-700 text-sm mb-1 dark:text-gray-200 font-semibold">Email Address</label>
                        <input
                            type="text"
                            id="service"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Your email address" className="border-2 border-green-400 rounded p-2" />
                    </div>
                    <div className="emai flex flex-col md:w-2/5 w-4/5 my-4">
                        <label htmlFor="service" className="text-gray-700 text-sm mb-1 dark:text-gray-200 font-semibold">What do you want to be seen as?</label>
                        <input
                            type="text"
                            id="service"
                            onChange={e => setusername(e.target.value)}
                            placeholder="Your display name" className="border-2  border-green-400 rounded p-2" />
                    </div>
                    <div className="emai flex flex-col md:w-2/5 w-4/5 my-4">
                        <label htmlFor="phonenumber" className="text-gray-700 text-sm mb-1 dark:text-gray-200 font-semibold">Phonenumber?</label>
                        <input
                            type="text"
                            id="phonenumber"
                            onChange={e => setPhonenumber(e.target.value)}
                            placeholder="Your phonenumber" className="border-2 border-green-400 rounded p-2" />
                    </div>
                    <div className="emai flex flex-col md:w-2/5 w-4/5 my-4">
                        <label htmlFor="passwordd" className="text-gray-700 text-sm mb-1 dark:text-gray-200 font-semibold">Password</label>
                        <div className="border-2 border-green-400 rounded w-full px-2 text-gray-600 flex bg-white flex-row items-center">
                            <input
                                type={passwordVisible2 ? "text" : "password"}
                                id="email"
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter password" className="outline-none rounded p-2 w-full" />
                            {passwordVisible2 ? (<span onClick={() => setPasswordVisible2(false)} className="cursor-pointer text-gray-600">
                                <VisibilityOffIcon />
                            </span>) : (<span onClick={() => setPasswordVisible2(true)} className="cursor-pointer text-gray-600">
                                <VisibilityIcon />
                            </span>)}
                        </div>
                    </div>

                    <div className="emai flex flex-col md:w-2/5 w-4/5 my-4">
                        <label htmlFor="password2" className="text-gray-700 text-sm mb-1 dark:text-gray-200 font-semibold">Confirm Password</label>
                        <div className="border-2 border-green-400 rounded w-full px-2 text-gray-600 flex bg-white flex-row items-center">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="email"
                                onChange={e => setPassword2(e.target.value)}
                                placeholder="Enter password" className="outline-none rounded p-2 w-full" />
                            {passwordVisible ? (<span onClick={() => setPasswordVisible(false)} className="cursor-pointer text-gray-600">
                                <VisibilityOffIcon />
                            </span>) : (<span onClick={() => setPasswordVisible(true)} className="cursor-pointer text-gray-600">
                                <VisibilityIcon />
                            </span>)}
                        </div>
                    </div>

                    {msg ? (<p className="bg-blue-200 text-gray-700 capitalize font-semibold text-center p-2 rounded">{msg}</p>) : null}

                    <button type="submit" className="bg-green-500 hover:bg-green-400 self-center font-semibold w-2/5 mt-8 justify-center rounded text-white p-2 flex flex-row items-center">Sign Up</button>
                    <p className="text-gray-500 mt-2 text-sm">Already registered? <Link to='/login'>Sign In here</Link></p>
                </form>
            </div>
        </General>
    );
}

export default Register