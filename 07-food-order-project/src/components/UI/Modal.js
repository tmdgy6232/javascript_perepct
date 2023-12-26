import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const Modaloverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <Modaloverlay>{props.children}</Modaloverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Modal;
