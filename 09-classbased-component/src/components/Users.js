import { Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
    };
  }
  /**
   * 클래스 기반 컴포넌트에서 상태는 하나의 객체로 관리된다.
   * 상태를 업데이트하려면 내가 원하는 상태가 아닌것들의 이전값을 보존해주기위해
   * setState 함수를 사용해야되고, 함수기반 컴포넌트와 마찬가지로 안에 콜백함수를 사용하여 업데이트 한다.
   */
  toggleUsersHandler() {
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }
  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No users provided!");
    }
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

export default Users;
