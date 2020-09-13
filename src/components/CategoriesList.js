import React from "react";

class CategoriesList extends React.Component {
  removeCategory = (key) => {
    this.props.removeCategory(key);
  };

  handleChange = (ev) => {
    this.props.saveCategory(ev.currentTarget.id, ev.currentTarget.value);
  };

  render() {
    var categories = this.props.categories;
    var listItems = Object.keys(categories).map((key) => (
      <li key={key}>
        <input
          type="text"
          name="name"
          id={key}
          onChange={this.handleChange}
          value={categories[key]}
        ></input>
        <button onClick={() => this.removeCategory(key)}>Eliminar</button>
      </li>
    ));
    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default CategoriesList;
