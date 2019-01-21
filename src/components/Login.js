import React from 'react';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';
import App from './App';

class Login extends React.Component{
    state = {
        uid: null,
        user: null
    };

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.authHandler({user});
            }
        })
    }

    authHandler = async (authData) => {
        console.log(authData);
        const UserData = await base.fetch(authData.user.uid, { context: this });

        if(!UserData.email){
            await base.post(`${authData.user.uid}`, {
                data: {
                    email: authData.user.email
                }
            });
        }

        this.setState({
            uid: authData.user.uid,
            user: authData.user
        });
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();

        this.setState({ uid: null, user: null });
    }

    render(){
        const logout = <button onClick={this.logout}>Log Out!</button>

        if(!this.state.uid){
            return (
                <nav>
                    <h2>Login</h2>
                    <button
                        onClick={() => this.authenticate("Google")}
                    >
                        Log in With Google
                    </button>
                </nav>
            )
        } else {
            return (
                <div>
                    {logout}
                    <p>Hola {this.state.user.displayName}</p>
                    <a href="/categories"> Categorías </a>
                    <a href="/reports"> Reportes </a>
                    <App uid={this.state.uid} />
                </div>
            )
        }
    }
}

export default Login;