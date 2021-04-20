import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {
    const user = localStorage.getItem('zomuser')
    return (
        <Route {...rest} render={(props) => (
            user ? (<Component {...props} />)
              : (<Redirect to='/login' />)
          )} />
    )
}

export default PrivateRoute
