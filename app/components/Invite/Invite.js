import React, { useState } from "react";
import { Input } from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextField from "../Common/Input/TextField";
import { InviteMembers } from "@/app/API/pages/Members";
import { useDispatch } from "react-redux";
import { fetchMembers } from "../store/slices/memberSlice";
import Swal from "sweetalert2";
import { successMessage } from "../Messages/Messages";
import { ToastContainer } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();
const Invite = ({ setTeamModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await InviteMembers({ email: data.email });
    if (response?.status === 201) {
      dispatch(fetchMembers());
      setTeamModal(false);
      setError(null);
      setLoading(false);
      // successMessage("Team member invited successfully")
    } else {
      setLoading(false);
      setError(response.error);
    }
  };

  const [admin, setAdmin] = useState(false);
  const [collab, setCollab] = useState(true);

  const handlerAdminChecked = () => {
    setAdmin(true);
    setCollab(false);
  };
  const handlerCollaboratorChecked = () => {
    setCollab(true);
    setAdmin(false);
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={"mt-2 py-3"}
          labelClassName={"text-start"}
          title={"Team Member Email"}
          register={register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          error={errors.email}
          placeholder={"Enter Email"}
          type={"email"}
          id={"email"}
        />
        <p className="text-start block my-4 text-sm font-semibold text-heading  ">
          Team Member Role <span className="text-[10px]">(required)</span>
        </p>
        {/* <div className="flex flex-row items-center gap-4">
          <div
            className="block sm:flex items-center justify-center mb-[0.125rem] min-h-[1.5rem] pl-[1.5rem] text-left "
            value={admin}
            onClick={handlerAdminChecked}
          >
            <input
              className="relative float-left -ml-[1rem] mr-1 mt-0.5 h-[1rem] w-[1rem] appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-black checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.5rem] checked:after:w-[0.5rem] checked:after:rounded-full checked:after:border-black checked:after:bg-black checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-black checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-black dark:checked:after:border-black dark:checked:after:bg-black dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-black dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="flexRadioDefault"
              id="Admin"
              checked
            />
            <label
              className="mt-px text-heading text-sm items-center font-bold pl-[0.15rem] hover:cursor-pointer sm:flex gap-5"
              for="Admin"
            >
              Admin
              <div>
                <p
                  className={`text-xs ${admin ? "" : "text-border"
                    }`}
                >
                  {" "}
                  Admins will be able to log in and help manage this
                  integration.
                </p>
              </div>
            </label>
          </div>
        </div> */}

        <div className={`flex items-center pl-4 border border-border rounded !cursor-pointer my-2 ${admin &&('bg-[#D4F1F4]')}`} onClick={handlerAdminChecked} >
          <input id="admin" type="radio" checked={admin} value={admin} name="bordered-radio" className="w-4 h-4" />
          <label for="admin" className="w-full py-4 ml-2 text-xs font-medium !cursor-pointer">Admins will be able to log in and help manage this integration.</label>
        </div>
        <div className={`flex items-center pl-4 border border-border rounded !cursor-pointer my-2 ${collab &&('bg-[#D4F1F4]')}`}  onClick={handlerCollaboratorChecked}>
          <input checked={collab} id="collab" type="radio" value={collab} name="bordered-radio" className="w-4 h-4 " />
          <label for="collab" className="w-full py-4 ml-2 text-xs font-medium !cursor-pointer">Collaborators can log in to view performance data, user feedback,
            and access embed tools, but can't make changes.</label>
        </div>

        {/* <div className="flex flex-row gap-4 mt-2">
          <div
            className="block sm:flex items-center justify-center mb-[0.125rem] min-h-[1.5rem] pl-[1.5rem] text-left "
            value={admin}
            onClick={handlerCollaboratorChecked}
          >
            <input
              className="relative float-left -ml-[1rem] mr-1 mt-0.5 h-[1rem] w-[1rem] appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-black checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.5rem] checked:after:w-[0.5rem] checked:after:rounded-full checked:after:border-black checked:after:bg-black checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-black checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-black dark:checked:after:border-black dark:checked:after:bg-black dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-black dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="flexRadioDefault"
              id="Collaborator"
              checked
            />
            <label
              className="mt-px text-heading text-sm font-bold sm:flex gap-5 pl-[0.15rem] items-center hover:cursor-pointer"
              for="Collaborator"
            >
              Collaborator
              <div>
                <p
                  className={`text-xs ${collab ? "" : "text-border"
                    }`}
                >
                  {" "}
                  Collaborators can log in to view performance data, user feedback,
                  and access embed tools, but can't make changes.
                </p>
              </div>
            </label>
          </div>
        </div> */}
        {error && (
          <span className="text-xs text-danger col-span-2 mt-2 text-center">
            {error}
          </span>
        )}
        <hr className="text-border my-8" />
        <div className="pb-10 text-left">
          <Button
            type={"submit"}
            className="mt-2 inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
          >
            {loading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                    <span>Loading...</span> </>  : "Send Invite"}
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Invite;
