import React from 'react';

class ExpensesForm extends React.Component{
    state = {
        name: "",
        category: "",
        date: "",
        price: 0
    };

    handleChange = (ev) => {
        this.setState({[ev.currentTarget.name]:  ev.currentTarget.value});
    }

    handleSubmit = (ev) => {
        ev.preventDefault();

        this.props.createExpense({
            name: this.state.name,
            category: this.state.category,
            date: Date.now(),
            price: this.state.price        
        });
        this.setState({name: "", category:"", date:"", price:0});
    }

    render(){
        var categories = this.props.categories;
        var options = Object.keys(this.props.categories).map(key => 
            <option key={key} value={key}>{categories[key]}</option>
        );
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Ingrese Gasto</h2>
                <select type="text" name="category" onChange={this.handleChange} value={this.state.category}> 
                    <option defaultValue> -- select an option -- </option>
                    {options}
                </select>
                <input 
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    required 
                    placeholder="Nombre"
                />
                <input 
                    type="number"
                    name="price"
                    onChange={this.handleChange}
                    value={this.state.price}
                    required 
                    placeholder="Nombre"
                />
                <button type="submit">Guardar</button>
            </form>
        );
    }
}

export default ExpensesForm;