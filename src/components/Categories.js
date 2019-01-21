import React from 'react';
import base from '../base';
import CategoriesList from './CategoriesList';
import CategoriesForm from './CategoriesForm';
import firebase from 'firebase';

class Categories extends React.Component{
    state = {
        categories: {},
        uid: null
    };

    componentDidMount(){
        //Se debería enviar el uid desde el componente padre, no se está haciendo ahora es por eso que se tiene que verificar si está logueado
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({uid: user.uid});

                this.ref = base.syncState(`${this.state.uid}/categories`, {
                    context: this,
                    state: 'categories'
                });
            } else {
                this.props.history.push("/");
            }
        })
    }

    saveCategory = (key, name) => {
        const categories = { ...this.state.categories };

        if(key){
            categories[key] = name;
        } else {
            categories[`cat${Date.now()}`] = name;
        }

        this.setState({categories: categories});
    }  

    removeCategory = (key) => {
        const categories = { ...this.state.categories };
        categories[key] = null;
        this.setState({categories: categories});
    }

    editCategory = (key) => {
        const categorieEdited = {
            key: key,
            name: this.state.categories[key]
        }
        this.setState({categorieEdited: categorieEdited});
    }

    ///////////////////////////////////
    goToRoot = (ev) => {
        ev.preventDefault();
        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <a href="/" onClick={this.goToRoot} > Atrás </a>
                <h2>Categorias</h2>
                <CategoriesList categories={this.state.categories} removeCategory={this.removeCategory} saveCategory={this.saveCategory} />
                <CategoriesForm saveCategory={this.saveCategory} />
            </div>
        );
    }
}

export default Categories;