import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Modal.scss";
import { AiOutlineClose } from "react-icons/ai";
const Modal = (props) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(props.active);
  }, [props.active]);
  return (
    <>
      <div id={props.id} className={`modal ${active ? "active" : ""}`}>
        {props.children}
      </div>
    </>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);
  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    //check it s
    if (props.onClose) props.onClose();
  };
  return (
    <>
      <div ref={contentRef} className="modal_content">
        {props.children}
        <div className="modal_content_close" onClick={closeModal}>
          <AiOutlineClose />
        </div>
      </div>
    </>
  );
};
ModalContent.propTypes = {
  onClose: PropTypes.func,
};
export default Modal;
