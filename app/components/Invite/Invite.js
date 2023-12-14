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
  const [role, setRole] = useState('COLLABORATOR')
  const [formValues, setFormValues] = useState({ name: '', phone: '' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: ""
    },
    resolver: yupResolver(schema),
  });


  const handleFormValues = (e) => {
    let value = e.target.value

    if (e.target.name == 'phone') {
      value = formatPhoneNumber(value)
    }

    setFormValues({
      ...formValues,
      [e.target.name]: value
    })

  }

  const onSubmit = async (data) => {
    let phoneRegex = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/
    const phoneNumber = formValues.phone;
    const isValidPhoneNumber = phoneRegex.test(phoneNumber);

    if (!isValidPhoneNumber) { setError('Invalid phone format.'); return }

    const phoneNumberWithoutPrefix = formValues.phone.slice(2, formValues.phone.length)
    
    setLoading(true);
    const response = await InviteMembers({ email: data.email, phone_prefix: '+1', phone: phoneNumberWithoutPrefix, name: formValues.name, role: role });
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


  const formatPhoneNumber = (value) => {
    // Remove all characters except digits
    let numbersOnly = value.replace(/[^\d]/g, "");

    // Add back the +1 country code
    numbersOnly =
      "1" + numbersOnly.substring(numbersOnly.startsWith("1") ? 1 : 0);

    // Apply formatting to match the pattern +1 (XXX) XXX-XXXX
    if (numbersOnly.length > 1) {
      // Add parentheses and space after the area code (3 digits)
      if (numbersOnly.length < 5) {
        return `+1 (${numbersOnly.slice(1)}`;
      }
      // Add a space and hyphen after the next block of 3 digits
      if (numbersOnly.length < 8) {
        return `+1 (${numbersOnly.slice(1, 4)}) ${numbersOnly.slice(4)}`;
      }
      // Full format
      return `+1 (${numbersOnly.slice(1, 4)}) ${numbersOnly.slice(
        4,
        7
      )}-${numbersOnly.slice(7, 11)}`;
    }

    return "+1 ";
  };


  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-start block text-sm font-semibold text-heading  ">
          Team Member Information <span className="text-[10px]">(required)</span>
        </p>

        <div className='my-2'>
          <small>Team member email</small>
          <TextField
            className={`py-3`}
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
        </div>

        <div className='my-2'>
          <small>Team member name</small>
          <div className='sm:my-0 relative'>
            <TextField
              type="text"
              id="name"
              name="name"
              value={formValues?.name ?? "+1"}
              onChange={handleFormValues}
              className="py-3 mt-1 outline-none"
              placeholder={"Member name"}
              error={""}
              maxLength={38}
              required
            />
          </div>
        </div>

        <div className='my-2'>
          <small>Team member phone</small>
          <div className='sm:my-0 relative'>
            <TextField
              type="text"
              id="phone"
              name="phone"
              value={formValues?.phone ?? "+1"}
              onChange={handleFormValues}
              className="py-3 mt-1 outline-none"
              placeholder={"Phone"}
              error={""}
              required
            />
          </div>
        </div>

        <p className="text-start block text-sm font-semibold text-heading mt-5">
          Team Member Role
        </p>

        <div className={`flex items-center pl-4 border border-border rounded !cursor-pointer my-2 ${role == 'ADMINISTRATOR' && ('bg-[#D4F1F4]')}`} onClick={() => setRole('ADMINISTRATOR')} >
          <input id="admin" type="radio" checked={role == 'ADMINISTRATOR'} name="bordered-radio" className="w-4 h-4" />
          <label for="admin" className="w-full py-4 ml-2 text-xs font-medium !cursor-pointer">Admins can manage billing, DNS records, API's, and all bot settings.</label>
        </div>
        <div className={`flex items-center pl-4 border border-border rounded !cursor-pointer my-2 ${role == 'MEMBER' && ('bg-[#D4F1F4]')}`} onClick={() => setRole('MEMBER')}>
          <input checked={role == 'MEMBER'} id="member" type="radio" name="bordered-radio" className="w-4 h-4 " />
          <label for="member" className="w-full py-4 ml-2 text-xs font-medium !cursor-pointer">Members can edit all bot settings, but cannot adjust billing settings, DNS records, or create bots.</label>
        </div>
        <div className={`flex items-center pl-4 border border-border rounded !cursor-pointer my-2 ${role == 'COLLABORATOR' && ('bg-[#D4F1F4]')}`} onClick={() => setRole('COLLABORATOR')}>
          <input checked={role == 'COLLABORATOR'} id="collab" type="radio" name="bordered-radio" className="w-4 h-4 " />
          <label for="collab" className="w-full py-4 ml-2 text-xs font-medium !cursor-pointer">Collaborators have view only access to all bot settings.</label>
        </div>

        {error && (
          <div className='w-100 flex justify-center text-bold'>
            <span className="text-xs text-danger col-span-2 mt-2 text-center font-semibold">
              {error}
            </span>
          </div>
        )}
        {/* <hr className="text-border my-8" /> */}
        <div className="pb-10 text-left mt-4">
          <Button
            type={"submit"}
            className="mt-2 inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
          >
            {loading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
              <span>Loading...</span> </> : "Send Invite"}
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Invite;
