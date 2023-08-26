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
      Swal.fire("Invited", "Team member invited successfully", "success");
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
          className={"mt-4 py-3"}
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
        <p className="text-start block my-4 text-md font-semibold text-heading  ">
          Team Member Role <sup>(required)</sup>
        </p>
        <div className="flex flex-row gap-4">
          <div
            className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] text-left"
            value={admin}
            onClick={handlerAdminChecked}
          >
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="flexRadioDefault"
              id="Admin"
              checked
            />
            <label
              className="mt-px text-heading font-bold pl-[0.15rem] hover:cursor-pointer sm:flex gap-5"
              for="Admin"
            >
              Admin
              <div>
                <p
                  className={`text-normal ${
                    admin ? "text-first-section-color" : "text-border"
                  }`}
                >
                  {" "}
                  Admins will be able to log in and help manage this
                  integration.
                </p>
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-2">
          <div
            className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] text-left"
            value={admin}
            onClick={handlerCollaboratorChecked}
          >
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="flexRadioDefault"
              id="Collaborator"
              checked
            />
            <label
              className="mt-px text-heading font-bold sm:flex gap-5 pl-[0.15rem] hover:cursor-pointer"
              for="Collaborator"
            >
              Collaborator
              <div>
            <p
              className={`text-normal ${
                collab ? "text-first-section-color" : "text-border"
              }`}
            >
              {" "}
              Collaborators can log in to view performance data, user feedback,
              and access embed tools, but can't make changes.
            </p>
          </div>
            </label>
          </div>
        </div>
        {error && (
          <span className="text-xs text-danger col-span-2 mt-2 text-center">
            {error}
          </span>
        )}
        <hr className="text-border my-8" />
        <div className="pb-10">
          <Button
            type={"submit"}
            className="inline-block float-right mb-2 font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
          >
            {loading ? "Loading..." : "Send Invite"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Invite;
