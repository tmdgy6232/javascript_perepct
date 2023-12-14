import React, {useState} from 'react'
import './ExpenseItem.css'
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const ExpenseItem = (props) => {
    // useState는 값을 상태로 등록하여 변경시 이 컴포넌트가 리로딩 되게 하는 기능이다.
    // 반드시 컴포넌트 함수 안에서 사용해야 한다.(모든 훅 동일, 반드시 컴포넌트 함수 안에서 직접호출)
    // useState는 React Hook의 한 종류이다. React Hook은 다양하다.
    // 모든 react Hook은 이름이 use로 시작한다.
    // useState는 항상 두가지 값을 가진 배열을 반환함
    // 첫번째 값은 항상 현재의 상태값이며
    // 두번째값은 값을 셋팅(업데이트)해줄 함수임. 이 함수 실행 시 컴포넌트가 재 랜더링됨
    const [title, setTitle] = useState(props.title);

    const clickHandler = () => {
        setTitle('Updated!!!');
        console.log(title);
    }
    return (
        <li>
            <Card className="expense-item">
                <ExpenseDate date={props.date}></ExpenseDate>
                <div className="expense-item__description">
                    <h2>{title}</h2>
                    <div className="expense-item__price">${props.amount}</div>
                </div>
                <button onClick={clickHandler}>Change Title</button>
            </Card>
        </li>
    );
}

export default ExpenseItem;