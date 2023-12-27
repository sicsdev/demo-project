import { EllipsisHorizontalIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import DeleteWorkflow from "../KnowledgeBase/DeleteKnowledgeBaseFlow";
import Modal from "../Common/Modal/Modal";

const SideModal = ({ deleteWorkflowModal,
  setDeleteWorkflowModal, setShow, children, heading, border = true, deleteButton = false, data, deleteRecord, width = 'md:w-[800px]', titleStyles, showSubHeadings = false, subHeadings = `` }) => {
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        setShow();
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleEscapeKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);
  return (
    <>
      <div
        className="rightSlideAnimations sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50"
        onClick={() => setShow(false)}
      >
        {" "}
      </div>
      <div
        className={`mt-[63px] sm:mt-0 md:mt-0 lg:mt-0 z-50 overflow-y-scroll w-full ${width} p-5 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}
      >
        <div
          className={`flex flex-row gap-2 items-center py-4 ${border && "border-b border-border border-lowgray"
            } dark:bg-gray-800 `}
        >
          <div className="block md:flex flex-1 items-center justify-start gap-3 mx-2">
            <h2 className={`max-w-[100%] md:max-w-[75%] text-black-color text-sm !font-semibold opacity-90 ${titleStyles && titleStyles}`} style={{ fontFamily: '' }}>{heading}</h2>
            {showSubHeadings && (
              subHeadings
            )}

          </div>
          <div className="flex hover:cursor-pointer items-center justify-center gap-2">
            {deleteButton && (
              <ButtonComponent
                data={data}
                deleteRecord={deleteRecord}
                deleteWorkflowModal={deleteWorkflowModal}
                setDeleteWorkflowModal={setDeleteWorkflowModal}
              />
            )}
            <div className="flex justify-end gap-2">
              <div className="cursor-pointer" onClick={(e) => setShow(false)}>
                <XMarkIcon className="h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2" />
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
};

export default SideModal;



export const ButtonComponent = ({ data, deleteRecnullord, deleteRecord, deleteWorkflowModal, setDeleteWorkflowModal }) => {
  const [showDelete, setShowDelete] = useState();


  const divRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowDelete(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-pointer relative"
        ref={divRef}
        onClick={(e) => {
          setShowDelete((prev) => {

            if (prev === data.id) {
              return null;
            } else {
              return data.id;
            }
          });
        }}
      >
        <EllipsisHorizontalIcon className="h-8 w-8 rounded-lg text-black  hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2" />
        {showDelete === data.id && (
          <div
            className={`absolute right-[0px] top-[20px] z-10 w-auto bg-[#F8F8F8] divide-y divide-gray-100shadow`}
          >
            <button
              type="button"
              className="text-heading text-xs font-semibold  border border-border rounded-lg  hover:bg-black hover:text-white flex items-center justify-center gap-1 px-2 py-2 "
              onClick={() => setDeleteWorkflowModal(true)}
            // onClick={() => deleteRecord(data.id)}
            >
              <XCircleIcon className="w-4 h-4" />
              Delete
            </button>
          </div>

        )}
        {
              deleteWorkflowModal &&
              <Modal title={`Are you sure you want to delete?`} show={deleteWorkflowModal} setShow={setDeleteWorkflowModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
                <DeleteWorkflow setShow={setDeleteWorkflowModal} deleteID={deleteRecord} data={data}  />
              </Modal>
            }
      </div>
    </>
  );
};
