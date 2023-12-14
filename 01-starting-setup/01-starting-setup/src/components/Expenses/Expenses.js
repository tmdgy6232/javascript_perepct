import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";

const Expenses = (props) => {
  const [filterYear, setFilterYear] = useState("2020");
  let filterInfoText = "2019, 2021 & 2022";

  if (filterYear === "2019") {
    filterInfoText = "2020, 2021 & 2022";
  } else if (filterYear === "2020") {
    filterInfoText = "2019, 2021 & 2022";
  } else if (filterYear === "2021") {
    filterInfoText = "2019, 2020 & 2022";
  } else {
    filterInfoText = "2019, 2020 & 2021";
  }

  const filterChangeHandler = (selectYear) => {
    setFilterYear(selectYear);
  };

  const filteredExpense = props.items.filter(expense => {
    return expense.date.getFullYear().toString() === filterYear
  })
  let expensesContent =  <p>No expenses found</p>;

  if(filteredExpense.length > 0){
    expensesContent = filteredExpense.map((item) => (
      <ExpenseItem
        key={item.id}
        id={item.id}
        title={item.title}
        amount={item.amount}
        date={item.date}
      />
    ))
  }
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          initYear={filterYear}
          onChangeFilter={filterChangeHandler}
        />
        <p style={{ color: "white" }}>
          Data for years {filterInfoText} is hidden.
        </p>

        {expensesContent}
        {/* {filteredExpense.length === 0 && <p>No expenses found</p>}
        {filteredExpense.length > 0 && filteredExpense.map((item) => (
          <ExpenseItem
            key={item.id}
            id={item.id}
            title={item.title}
            amount={item.amount}
            date={item.date}
          />
        ))} */}
        {/* {filteredExpense.length === 0 ? <p>No expenses found</p> : filteredExpense.map((item) => (
          <ExpenseItem
            key={item.id}
            id={item.id}
            title={item.title}
            amount={item.amount}
            date={item.date}
          />
        ))} */}
        
      </Card>
    </div>
  );
};

export default Expenses;
