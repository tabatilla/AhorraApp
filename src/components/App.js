import React from "react";
import base from "../base";
import ExpensesList from "./ExpensesList";
import ExpensesForm from "./ExpensesForm";
import Footer from "./Footer";

class App extends React.Component {
  // state = {
  //   categories: {},
  //   expenses: {},
  // };

  // componentDidMount() {
  //   base.bindToState(`${this.props.uid}/categories`, {
  //     context: this,
  //     state: "categories",
  //   });
  //   base.syncState(`${this.props.uid}/expenses`, {
  //     context: this,
  //     state: "expenses",
  //   });
  // }

  // updateExpense = (key, value, attr) => {
  //   const expenses = { ...this.state.expenses };

  //   if (key) {
  //     expenses[key][attr] = value;
  //   }

  //   this.setState({ expenses: expenses });
  // };

  // createExpense = (expense) => {
  //   const expenses = { ...this.state.expenses };
  //   expenses[`exp${Date.now()}`] = expense;
  //   this.setState({ expenses: expenses });
  // };

  // removeExpense = (key) => {
  //   const expenses = { ...this.state.expenses };
  //   expenses[key] = null;
  //   this.setState({ expenses: expenses });
  // };

  render() {
    return (
      <div className="wrapper">
        <div className="content">App Page</div>
        {/* <ExpensesList
          expenses={this.state.expenses}
          categories={this.state.categories}
          updateExpense={this.updateExpense}
          removeExpense={this.removeExpense}
        /> */}
        {/* <ExpensesForm
          categories={this.state.categories}
          createExpense={this.createExpense}
        /> */}
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
