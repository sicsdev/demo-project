import React from 'react'

import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useState } from 'react';
import Button from '../../Common/Button/Button';
const Billing = ({ basicFormData }) => {
    const stripe = useStripe();
    const elements = useElements();
    console.log(basicFormData)
    const [errors, setError] = useState([]);
    const [loading, setLoading] = useState();
    return (
        <div className='p-6'>
            <form >
                <div
                    className="border rounded px-2 border-gray-100"
                    style={{ borderColor: "#80808080" }}
                >
                    <CardElement
                        className="form-control"
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    padding: "2vh",
                                    lineHeight: "2.5",
                                    color: "#495057",
                                    borderRadius: "1vh",
                                    borderStyle: "solid",
                                },
                            },
                        }}
                    />
                </div>

                {loading && <p className="message">Processing Payment...</p>}
                <Button type={"submit"} className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm checkout"

                >
                    Submit
                </Button>
            </form>

            <div>
                {errors.map((error, i) => (
                    <p key={i} className="text-red text-center">
                        {error}
                    </p>
                ))}

                {errors.includes("A user with that email already exists.") && (
                    <div className="text-center mt-2">
                        <span>
                            Please{" "}
                            <a
                                className="link underline text-sky text-center mt-1"
                                href="/login"
                            >
                                login
                            </a>{" "}
                            to continue
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Billing