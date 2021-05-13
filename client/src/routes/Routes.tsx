import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Routes_uri from './routes_uri'
import {CircularProgress} from '@material-ui/core'
const Signup = React.lazy(()=>import('pages/user/signup'))
const Login = React.lazy(()=>import('pages/user/auth/Login'))
const Contact = React.lazy(()=>import('pages/contact'))
const NotFound = React.lazy(()=>import('pages/notFound'))
const ChatList = React.lazy(()=>import('pages/chatList'))
const Chat = React.lazy(()=>import('pages/chat'))

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<div className="p-center"><CircularProgress/></div>}>
      <Switch>
        <Route component={Signup} path={Routes_uri.SIGNUP} exact />
        <Route component={Login} path={Routes_uri.LOGIN} exact />
        <Route component={Contact} path={Routes_uri.CONTACT} exact />
        <Route component={ChatList} path={Routes_uri.CHAT_LIST} exact />
        <Route component={Chat} path={Routes_uri.CHAT} exact />
        <Route
          component={() => <Redirect to={Routes_uri.CHAT_LIST} />}
          path="/"
          exact
        />
        <Route component={NotFound} path="*" />
      </Switch>
    </Suspense>
  )
}

export default Routes
