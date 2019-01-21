import React from 'react';

class CategoriesForm extends React.Component{
    state = {
        key: "",
        name: ""
    };

    handleChange = (ev) => {
        this.setState({name:  ev.currentTarget.value});
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.saveCategory(this.state.key, this.state.name);
        this.setState({name: "", key:""});
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Ingrese Categoría</h2>
                <input 
                    type="text"
                    name="categoryName"
                    onChange={this.handleChange}
                    value={this.state.name}
                    required 
                    placeholder="Nombre"
                />
                <button type="submit">Guardar</button>
            </form>
        );
    }
}

export default CategoriesForm;