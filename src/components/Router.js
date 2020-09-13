import React from "react";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import Categories from "./Categories";
import App from "./App";
import Reports from "./Reports";
import Login from "./Login";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

class Router extends React.Component {
  state = {
    uid: null,
    user: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    console.log(authData);
    const UserData = await base.fetch(authData.user.uid, { context: this });

    if (!UserData.email) {
      await base.post(`${authData.user.uid}`, {
        data: {
          email: authData.user.email,
        },
      });
    }

    this.setState({
      uid: authData.user.uid,
      user: authData.user,
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();

    this.setState({ uid: null, user: null });
  };

  // PrivateRoute({ component: Component, ...rest }) {
  //     return (
  //         <Route
  //             {...rest}
  //             render={props =>
  //                 this.state.uid ? (
  //                     <Component {...props} />
  //                 ) : (
  //                     <Redirect
  //                         to={{
  //                             pathname: "/",
  //                             state: { from: props.location }
  //                         }}
  //                     />
  //                 )
  //             }
  //         />
  //     );
  // }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    const Router = (
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={Login}/>
                                <Route exact path="/categories" component={Categories}/>
                                <Route exact path="/reports" component={Reports}/> */}
          {/* <Link to="/categories">Categorías</Link> */}
          {/* <Link to="/reports">Reportes</Link> */}
          <Route path="/" component={Route} />
          <PrivateRoute path="/categories" component={Categories} />
        </Switch>
      </BrowserRouter>
    );

    if (!this.state.uid) {
      return (
        <nav>
          <h2>Login</h2>
          <button onClick={() => this.authenticate("Google")}>
            Log in With Google
          </button>
        </nav>
      );
    } else {
      return (
        <div>
          {Router}
          {logout}
          <p>Hola: {this.state.user.displayName}</p>
          <App uid={this.state.uid} />
        </div>
      );
    }
  }
}
export default Router;
