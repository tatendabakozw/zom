const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//create an account
//post request
//http://localhost:6789/api/v1/auth/register
exports.regisiterUser = async (req, res, next) => {
    try {
        const { username, firstname, lastname, email, phonenumber, address, password, password2 } = req.body
        // //defining pictures
        // let proPictures = [];
        // if (req.files.length > 0) {
        //     proPictures = req.files.map(file => {
        //         return { img: file.filename }
        //     })
        // }
        const exist = await User.findOne({ email: email })
        if (!username || !firstname || !lastname || !email || !password || !phonenumber) {
            return res.status(200).json({ error: "please enter all fields" })
        }
        if (exist) {
            res.status(200).json({ error: "Account Exists" })
        } else {
            if (password.length < 6) {
                return res.status(200).json({ error: "Password too short" })
            }
            else if (password !== password2) {
                return res.status(200).json({ error: "passwords do not match" })
            } else {
                const hash = await bcrypt.hash(password, 10)
                if (hash) {
                    const user = new User({
                        username,
                        firstname,
                        lastname,
                        email,
                        phonenumber,
                        address,
                        password: hash,
                    })
                    const saveduser = await user.save()

                    res.status(200).json({ message: "Account Created", user: saveduser })
                } else {
                    res.status(500).json({ error: "Password Not Hashed" })
                }
            }
        }

    } catch (error) {
        next(error)
    }
}

//login with existing account
//post request
//http://localhost:6789/api/v1/auth/login
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(200).json({ error: "Enter All Fields" })
        } else {
            const user = await User.findOne({ email: email })
            if (user) {
                const exists = await bcrypt.compare(password, user.password);
                if (exists) {
                    const token = jwt.sign({
                        username: user.username,
                        email: user.email,
                        user_id: user._id,
                        role: user.role,
                        phonenumber: user.phonenumber,
                        address: user.address,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        picture: user.proPictures,
                        verified: user.verified
                    }, process.env.JWT_SECRET)
                    res.status(200).json({
                        message: 'Login Successful',
                        token: token,
                        user: {
                            username: user.username,
                            email: user.email,
                            user_id: user._id,
                            role: user.role,
                            phonenumber: user.phonenumber,
                            address: user.address,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            picture: user.proPictures,
                            verified: user.verified
                        }
                    })
                } else {
                    return res.status(200).json({ error: 'Invalid Credentials' })
                }
            } else {
                return res.status(200).json({ error: 'Account does not exist' })
            }
        }
    } catch (error) {
        next(error)
    }
}

//logout of an account
//post request
//http://localhost:6789/api/v1/auth/logout
exports.logoutUser = (req, res) => {
    res.send('logout of user acc')
}