import { useEffect } from "react";
import "./modal.css";
import { Input } from "../../Common/Input/MultiStepFormInput";
import TextField from "../../Common/Input/TextField";
import Modal from "../../Common/Modal/Modal";
export function ModalValue({ isOpen, onClose, handleInputValues, data, handleCheckboxChange, submitModal }) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && event.target.classList.contains("overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);
  const DisablingButton = () => {
    const requiredKeys = [
      "firstName",
      "lastName",
      "companyEmail",
      "isSubscribed"
    ];
    const isRequiredFieldsEmpty = requiredKeys.some(
      (key) => !data[key] || data[key].trim() === ""
    );

    return isRequiredFieldsEmpty;
  }
  return (
    <Modal
      title={
        <h3 className="text-base !font-bold">Suggest Resource</h3>
      }
      className={"sm:w-[30%] w-[100%]"}
      show={isOpen}
      setShow={onClose}
      showCancel={true}
      customHideButton={false}
      showTopCancleButton={false}
      hr={false}
    >
      <div className={`overlay ${isOpen ? "active" : ""}`}>
        <div className="modal">
     

          {/* <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close Modal
        </button> */}
        </div>
      </div>
    </Modal>
  );
}
