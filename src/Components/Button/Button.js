import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = (props) => {
  return (
    <>
      <button
        className={`custom-btn ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
};
export const Outlinebutton = (props) => {
  return (
    <>
      <button
        className={`btn-outline ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
