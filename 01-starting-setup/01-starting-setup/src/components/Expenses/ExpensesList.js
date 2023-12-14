import React from 'react';
import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';


const ExpensesList = props => {

    if(props.items.length === 0){
      return <h2 className='expenses-list__fallback'> Expense no found.</h2>
    }
    return (
      <ul className='expenses-list'>
        {props.items.map((item) => (
          <ExpenseItem
            key={item.id}
            id={item.id}
            title={item.title}
            amount={item.amount}
            date={item.date}
          />
        ))}
      </ul>
    )
}
export default ExpensesList;