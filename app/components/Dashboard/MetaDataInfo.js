import React from 'react'

const MetaDataInfo = () => {

    return (
        <div className='bg-[#F8F8F8]  m-auto border rounded-lg border-[#F0F0F1] my-6 mb-5 w-[70%] sm:p-[40px] p-[10px]'>

            <div className='px-4 text-center'>

                <div>
                    <h1 className=" font-semibold mb-4 text-[12px]">How to Pass Data to the Widget</h1>
                    <p className="text-gray-600 text-[10px]">
                        To pass data to the widget via your app or browser, ensure to store the user's account information (email and name) in the 'deflectionWidgetTemporalData' variable. This variable should be saved in sessionStorage, localStorage, or Cookies, matching the user session's duration. This allows the widget to keep the information synchronized with the user's active session.
                        <br />
                        <br></br>
                        To ensure that the widget has access to your user's information, follow these steps:
                    </p>
                </div>



                <div className='mt-3 mb-[3rem]'>
                    <h2 className=" text-bold mt-5 mb-[1rem] text-[10px]"><b>Step 1:</b> Get User Information</h2>
                    <p className="text-[10px]">
                        First, you need to obtain user information from your database. You can do this through an API call or any other method you prefer.
                    </p>

                    <div className="bg-[#efefef] rounded-md text-xs my-2 p-2" style={{ fontFamily: 'monospace' }}>
                        {`let user_info = getInfoFromUser();`}<span className='opacity-50'> // Your API call to retrieve user information.</span>
                    </div>
                </div>




                <div className='mt-3 mb-[2rem]'>
                    <h2 className=" font-bold mt-5 pt-3 mb-[1rem] text-[10px]"><b>Step 2:</b> Format the Data</h2>
                    <p className=" text-[10px]">
                        Next, format the data into an object that contains the information you want to pass to the widget. In this example, we are including the email, name, and phone number of the user in the object.
                    </p>

                    <div className="bg-[#efefef] rounded-md text-xs my-2 p-2" style={{ fontFamily: 'monospace' }}>
                        {`let formattedObject = {
    email: user_info.email,
    name: user_info.name,
    phone: user_info.phone
};`}
                    </div>
                </div>



                <div className='mt-4 mb-[2rem]'>
                    <h2 className=" font-semibold mt-5 mb-[1rem] text-[12px]"><b>Step 3:</b> Store Data in the Session</h2>
                    <p className="text-gray-600 text-[10px]">
                        Finally, store the data in the browser's so that the widget can access it.
                    </p>
                    <div className="bg-[#efefef] rounded-md text-xs my-2 p-2" style={{ fontFamily: 'monospace' }}>
                        {`window.sessionStorage.setItem
                        ('deflectionWidgetTemporalData', 
                        formatedObject);`}<span className='opacity-50'></span>
                    </div>


                    <p className=" mt-5 pt-5 text-[12px]">
                        <b>NOTE:</b> Make sure to match user's session expiration with this variable. In this example, sessionStorage will remove this information after closing the tab. You can also use localStorage or Cookies with same name, if needed.
                    </p>
                </div>

            </div>


        </div >
    )
}

export default MetaDataInfo