import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import Layout from "./components/layout/layout";
import { useAuth } from './context/AuthContext'
import Error from './screen/error/error'
import ForgotPassword from './components/Authentication/ForgotPassword'
import Landing from './components/landing/landing'

function App() {

  var { isAuthenticated } = true;
  const { currentUser } = useAuth()

  if (currentUser !== null) {
    localStorage.setItem('userId', currentUser.uid)
  } else {
    localStorage.removeItem('userId')
  }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
        {/* <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} /> */}
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/Login" component={Login} />
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route component={Error} />
        {/* <Route path="/" exact component={Landing} /> */}
      </Switch>
    </BrowserRouter>

  );
  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => {
          return currentUser ? <Component {...props} /> : <Redirect
            to={{
              pathname: "/Login",
              state: {
                from: props.location,
              },
            }}
          />
        }
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}


export default App;
