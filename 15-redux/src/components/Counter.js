import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux"; // 리액트 리덕스에서 만든 커스텀 훅
const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);

  const incrementhandler = () => {
    dispatch({ type: "increment" });
  };
  const decrementhandler = () => {
    dispatch({ type: "decrement" });
  };

  const increaseHandler = () => {
    dispatch({ type: "increase", value: 5 });
  };
  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>

      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementhandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementhandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

// class Counter extends Component {
//   incrementhandler() {
//     this.props.increment();
//   }
//   decrementhandler() {
//     this.props.decrement();
//   }
//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementhandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementhandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "increment" }),
//     decrement: () => dispatch({ type: "decrement" }),
//   };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(Counter);
export default Counter;
