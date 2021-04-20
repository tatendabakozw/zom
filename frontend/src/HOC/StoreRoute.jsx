import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function StoreRoute({ component: Component, ...rest }) {
    const user = localStorage.getItem('zomuser')
    return (
        <Route {...rest} render={(props) => (
            JSON.parse(user).role === 'seller' ? (<Component {...props} />)
                : (<Redirect to='/' />)
        )} />
    )
}

export default StoreRoute
