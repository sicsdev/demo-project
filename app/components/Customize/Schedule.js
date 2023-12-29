import {
  ClipboardDocumentIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { use } from "react";
import { useState } from "react";
import "./schedule.css";
import { useSearchParams } from "next/navigation";
import Button from "../Common/Button/Button";
import { MinusIcon } from "@heroicons/react/24/outline";
import {
  CloudArrowUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import {
  DocumentIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import StatusIndicator from "../StatusIndicator/Status";
const Schedule = ({
  basicFormData,
  setBasicFormData,
  Submission,
  driveLoad,
  setDriveLoad,
  loading,
  setLoading,
}) => {
  const searchParams = useSearchParams();

  const [custom, setCustom] = useState(true);
  const [errors, setErrors] = useState([]);
  const [schedule, setSchedules] = useState(basicFormData);
  const [openClose, setOpenClose] = useState(false);
  const handleHourInputStart = (event) => {
    const { value, id, name } = event.target;
    const updatedSchedule = { ...schedule };
    updatedSchedule[name][id].start = value;
    setSchedules(updatedSchedule);
    debugger;
    Submission(updatedSchedule);
    setBasicFormData((prev) => {
      return {
        ...prev,
        updatedSchedule,
      };
    });
  };

  const handleHourInputEnd = (event) => {
    const { value, id, name } = event.target;
    const updatedSchedule = { ...schedule };
    updatedSchedule[name][id].end = value;
    setSchedules(updatedSchedule);
    debugger;
    Submission(updatedSchedule);
    setBasicFormData((prev) => {
      return {
        ...prev,
        updatedSchedule,
      };
    });
  };

  const sendObjects = (obj) => {
    if (obj?.updatedSchedule) {
      delete obj.updatedSchedule;
    }
    return obj;
  };

  const handleDeleteHour = (day, index) => {
    const dayArray = [...schedule[day]];
    dayArray.splice(index, 1);
    setSchedules((prevState) => ({
      ...prevState,
      [day]: dayArray,
    }));
    debugger;
    Submission({ ...schedule, [day]: dayArray });
    setBasicFormData((prev) => {
      return {
        ...prev,
        [day]: dayArray,
      };
    });
  };

  const handleAddHour = (day) => {
    const dayArray = [...schedule[day]];
    dayArray.push({ start: "", end: "" });
    setSchedules((prevState) => ({
      ...prevState,
      [day]: dayArray,
    }));
    setBasicFormData((prev) => {
      return {
        ...prev,
        [day]: dayArray,
      };
    });
    debugger;
    Submission({ ...schedule, [day]: dayArray });
  };
  const handleCheckbox = (e, day) => {
    console.log("evednt", e);
    if (e.target.checked == true) {
      setOpenClose(true);
    } else {
      setOpenClose(false);
    }
    let dayArray = [];
    if (schedule[day].length === 0) {
      dayArray = [...schedule[day]];
      dayArray.push({ start: "00:00", end: "23:59" });
    }
    setSchedules((prevState) => ({
      ...prevState,
      [day]: dayArray,
    }));
    setBasicFormData((prev) => {
      return {
        ...prev,
        [day]: dayArray,
      };
    });
    Submission({ ...schedule, [day]: dayArray });
  };

  console.log("ass", schedule);
  const time = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
  ];
  const [timeValue, setTimeValue] = useState(time[0]);

  const handleUpClick = (value, id, name) => {
    const currentIndex = time.indexOf(value);
    const nextIndex = (currentIndex + 1) % time.length;
    handleHourInputStart({ target: { value: time[nextIndex], id, name } });
  };

  const handleDownClick = (value, id, name) => {
    const currentIndex = time.indexOf(value);
    const prevIndex = (currentIndex - 1 + time.length) % time.length;
    handleHourInputStart({ target: { value: time[prevIndex], id, name } });
  };
  const handleUpClickEnd = (value, id, name) => {
    const currentIndex = time.indexOf(value);
    const nextIndex = (currentIndex + 1) % time.length;
    handleHourInputEnd({ target: { value: time[nextIndex], id, name } });
  };

  const handleDownClickEnd = (value, id, name) => {
    const currentIndex = time.indexOf(value);
    const prevIndex = (currentIndex - 1 + time.length) % time.length;
    handleHourInputEnd({ target: { value: time[prevIndex], id, name } });
  };
  return (
    <div className="">
      {/* EXISTING SCHEDULE OPTION */}
      {!custom && (
        <div className="">
          <div>
            <div className="my-4">Which schedule do you want to use?</div>
          </div>

          <div className="border lg:w-1/2 border-gray p-3">
            <small>Current</small>
            <select
              className={`custom-select mt-1 block px-3 lg:w-1/2 new_input bg-white border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color" `}
            >
              <option>Summer schedule</option>
              <option>Another one</option>
              <option>Blabla..</option>
            </select>
          </div>

          <div className="my-3 mx-3 mt-5 pt-5">
            <small>Eastern Time - US & Canada</small>
          </div>

          <div className="border border-2 rounded border-gray p-3 lg:w-1/2">
            <small>
              <b>WEEKLY HOURS</b>
            </small>
            <div class="grid grid-cols-2 gap-2 py-3">
              <div className="flex justify-start items-center bg-gray-200 p-2">
                Sun
              </div>
              <div className="flex justify-start items-center bg-gray-100 p-2">
                Unavailable
              </div>
              <div className="flex justify-start items-center bg-gray-200 p-2">
                MON
              </div>
              <div className="flex justify-start items-center bg-gray-100 p-2">
                9-00am - 5:00pm
              </div>
              <div className="flex justify-start items-center bg-gray-200 p-2">
                TUE
              </div>
              <div className="flex justify-start items-center bg-gray-100 p-2">
                9-00am - 5:00pm
              </div>
              <div className="flex justify-start items-center bg-gray-200 p-2">
                WED
              </div>
              <div className="flex justify-start items-center bg-gray-100 p-2">
                9-00am - 5:00pm
              </div>
              <div className="flex justify-start items-center bg-gray-200 p-2">
                THU
              </div>
              <div className="flex justify-start items-center bg-gray-100 p-2">
                9-00am - 5:00pm
              </div>
              <div className="flex justify-start items-center bg-gray-200 p-2">
                FRI
              </div>
              <div className="flex justify-start items-center bg-gray-100 p-2">
                9-00am - 5:00pm
              </div>
              <div className="flex justify-start items-center bg-gray-200 p-2">
                SAT
              </div>
              <div className="flex justify-start items-center bg-gray-100 p-2">
                9-00am - 5:00pm
              </div>
            </div>
          </div>
        </div>
      )}
  

      {/* CUSTOM SCHEDULE OPTION */}
      {custom && (
        <div className="">
          <div className=" p-3  ">
            <h3 class="text-sm font-semibold my-3">Set your weekly hours</h3>
            <div className="forCheckbox">
              {Object.keys(sendObjects(schedule)).map((day) => (
                <>
                  <div
                    key={day}
                    className="grid grid-cols-2 m-2 my-2 items-center  justify-between sm:justify-between gap-[0px] sm:gap-3"
                  >
                    <div className="    grid grid-cols-2 sm:grid-cols-[40%,10%,10%] gap-[10px] sm:gap-3  col-span-1">
                      <div className="">
                        <p className="text-xs sm:text-[12px] ">{day}</p>
                      </div>
                      <div className="flex items-center justify-start gap-4 ">
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="billingEnabled"
                            checked={schedule[day].length > 0}
                            onClick={(e) => handleCheckbox(e, day)}
                          />
                          <span className="slider round h-[21px] w-[40px]"></span>
                        </label>
                      </div>
                      <div className="hidden sm:block">
                        <p className=" text-xs sm:text-[12px]">
                          {schedule[day].length > 0 ? "Open" : "Closed"}
                        </p>
                      </div>
                    </div>

                    <div className="lg:flex flex items-center gap-3">
                      <div className="col-span-1 w-[225px] sm:w-[270px]">
                        {schedule[day].length > 0 ? (
                          schedule[day].map((time, index) => (
                            <div
                              key={index}
                              style={{ gridTemplateColumns: "repeat(3, auto)" }}
                              className={`grid grid-cols-3 gap-[0px] sm:gap-3 h-[40px]  ${
                                index !== 0 ? "pt-2" : ""
                              }`}
                            >
                              <div className="relative">
                                <input
                                  id={index}
                                  // onChange={handleHourInputStart}
                                  value={schedule[day][index].start}
                                  type="time"
                                  name={day}
                                  readOnly
                                  className="text-center flex items-center justify-center new_input !p-0 !pr-[0.85rem] !m-0 h-[37.5px] !text-[9px] sm:!text-[10px] focus:!text-[9px] sm:focus:!text-[10px] border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full relative py-1 hover:border-sky cursor-pointer"
                                />


                                <div className="absolute right-0 top-[7px]">
                                  <ChevronUpIcon
                                    className="h-[10px] w-6 text-gray-500 cursor-pointer"
                                    onClick={(e) =>
                                      handleUpClick(
                                        schedule[day][index].start,
                                        index,
                                        day
                                      )
                                    }
                                  />

                                  <ChevronDownIcon
                                    className="h-[10px] w-6 text-gray-500 cursor-pointer"
                                    onClick={(e) =>
                                      handleDownClick(
                                        schedule[day][index].start,
                                        index,
                                        day
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <span className="  lowercase text-xs sm:text-[12px] text-center  flex justify-center items-center">
                                To
                              </span>

                              <div className="relative">
                                <input
                                  id={index}
                                  // onChange={handleHourInputEnd}
                                  value={schedule[day][index].end}
                                  type="time"
                                  disabled
                                  name={day}
                                  className="text-center !pr-[0.85rem]  flex items-center justify-center new_input !p-0 !m-0 new_input h-[37.5px] !text-[9px] sm:!text-[10px] focus:!text-[9px] sm:focus:!text-[10px] border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full relative py-1 hover:border-sky cursor-pointer"
                                />
                                <div className="absolute right-0 top-[7px]">
                                  <ChevronUpIcon className="h-[10px] w-6 text-gray-500 cursor-pointer" 
                                   onClick={(e) =>
                                    handleUpClickEnd(
                                      schedule[day][index].end,
                                      index,
                                      day
                                    )
                                  }
                                  />

                                  <ChevronDownIcon className="h-[10px] w-6 text-gray-500 cursor-pointer"
                                     onClick={(e) =>
                                      handleDownClickEnd(
                                        schedule[day][index].end,
                                        index,
                                        day
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              {/* <div className="flex items-center">
                                <MinusIcon
                                  className="w-4 cursor-pointer hover:text-red"
                                  onClick={() => handleDeleteHour(day, index)}
                                />
                              </div> */}
                            </div>
                          ))
                        ) : (
                          <div
                            key={"index"}
                            style={{ gridTemplateColumns: "repeat(3, auto)" }}
                            className="grid grid-cols-3 gap-1 sm:gap-3 cursor-pointer h-[40px]"
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <StatusIndicator driveLoad={driveLoad} loading={loading} />
            {errors?.map((e) => (
              <div className="text-center my-2">
                <small className="text-red">{e}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
