import React from "react";
import moment from "moment";
import { formatPrice } from "../helpers";

class ExpensesList extends React.Component {
  calendarIcon = require("./../assets/calendar.svg");
  caretIcon = require("./../assets/caret.svg");

  state = {
    day: moment(),
    showByDay: true,
  };

  handleChange = (ev) => {
    this.props.updateExpense(
      ev.currentTarget.id,
      ev.currentTarget.value,
      ev.currentTarget.name
    );
  };

  changeDate = (variation) => {
    if (this.state.showByDay) {
      this.setState({ day: this.state.day.add(variation, "days") });
    } else {
      this.setState({ day: this.state.day.add(variation, "week") });
    }
  };

  setShowByDay = (value) => {
    this.setState({ day: moment(), showByDay: value });
  };

  getItem = (key, category, name, price) => {
    const categories = this.props.categories;
    const options = Object.keys(this.props.categories).map((key) => (
      <option key={key} value={key}>
        {categories[key]}
      </option>
    ));

    return (
      <li key={key}>
        <select
          type="text"
          name="category"
          id={key}
          onChange={this.handleChange}
          value={category}
        >
          <option defaultValue> -- select an option -- </option>
          {options}
        </select>
        <input
          type="text"
          name="name"
          id={key}
          onChange={this.handleChange}
          value={name}
        ></input>
        <input
          type="text"
          name="price"
          id={key}
          onChange={this.handleChange}
          value={price}
        ></input>
        <button onClick={() => this.props.removeExpense(key)}>Eliminar</button>
      </li>
    );
  };

  render() {
    const expenses = this.props.expenses;
    let total = 0;
    let report = {};

    const listItems = Object.keys(expenses).map((key) => {
      let type = "";
      this.state.showByDay ? (type = "day") : (type = "week");

      if (type && moment(expenses[key].date).isSame(this.state.day, type)) {
        total += parseFloat(expenses[key].price);

        if (expenses[key].category in report) {
          report[expenses[key].category] += parseFloat(expenses[key].price);
        } else {
          report[expenses[key].category] = parseFloat(expenses[key].price);
        }

        return this.getItem(
          key,
          expenses[key].category,
          expenses[key].name,
          expenses[key].price
        );
      }
    });

    const listReport = Object.keys(report).map((key) => {
      return (
        <li key={key}>
          {this.props.categories[key]} = {report[key].toFixed(2)}
        </li>
      );
    });

    const cabecera = (
      <div>
        {this.state.showByDay ? (
          <div>
            <button onClick={() => this.changeDate(-1)}>&#8592;</button>
            <span>{moment(this.state.day).format("Do MMM YY")}</span>
            <button onClick={() => this.changeDate(1)}>&#8594;</button>
            <button onClick={() => this.setShowByDay(false)}>
              Mostrar por Semana
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => this.changeDate(-1)}>&#8592;</button>
            <span>Semana: {moment(this.state.day).format("ww")}</span>
            <button onClick={() => this.changeDate(1)}>&#8594;</button>
            <button onClick={() => this.setShowByDay(true)}>
              Mostrar por Día
            </button>
          </div>
        )}
      </div>
    );

    return (
      <div className="content expenses-list">
        <div className="expenses-list__header">
          <div className="expenses-list__header--icon">
            <img className="w-100" src={this.caretIcon}></img>
          </div>
          <div className="expenses-list__header--big">14</div>
          <div className="expenses-list__header--regular">
            <div>Setiembre</div>
            <div>Lunes</div>
          </div>
          <div className="expenses-list__header--icon expenses-list__header--rotate">
            <img className="w-100" src={this.caretIcon}></img>
          </div>
        </div>
        <div class="expenses-list__body">
          <div className="expenses-list__total">
            <div className="expenses-list__total--title">
              <div>Total</div>
              <div>S/. 1204.70</div>
            </div>
            <div className="expenses-list__icon">
              <img className="w-100" src={this.calendarIcon}></img>
            </div>
          </div>
          <div className="expenses-list__list-items">
            <div className="expenses-list__item">
              <div className="expenses-list__item--title">Pizza Gian Carlo</div>
              <div className="expenses-list__item--category">Comida</div>
              <div className="expenses-list__item--price">S/. 45.90</div>
            </div>
            <div className="expenses-list__item">
              <div className="expenses-list__item--title">Coca Grande</div>
              <div className="expenses-list__item--category">bebidas</div>
              <div className="expenses-list__item--price">S/. 11.90</div>
            </div>
            <div className="expenses-list__item">
              <div className="expenses-list__item--title">Skyrim</div>
              <div className="expenses-list__item--category">Juegos</div>
              <div className="expenses-list__item--price">S/. 110.90</div>
            </div>
            <div className="expenses-list__item">
              <div className="expenses-list__item--title">Cervezas Pilsen</div>
              <div className="expenses-list__item--category">Alcohol</div>
              <div className="expenses-list__item--price">S/. 68.00</div>
            </div>
            <div className="expenses-list__item">
              <div className="expenses-list__item--title">Amex</div>
              <div className="expenses-list__item--category">Deuda</div>
              <div className="expenses-list__item--price">S/. 968.00</div>
            </div>
          </div>
        </div>
        {/* {cabecera}
        <ul>{listItems}</ul>
        <p>
          Total: <span>{total}</span>
        </p>
        Reporte
        <ul>{listReport}</ul> */}
      </div>
    );
  }
}

export default ExpensesList;
