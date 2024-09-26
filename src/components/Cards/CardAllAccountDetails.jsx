// components
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from '../../api';
import '../../assets/styles/tailwind.css';





export default function CardAllAccountDetails() {
  
  
    // ************************************
    // MANAGE STATE:-  TO FIND USER BY ID
    // ************************************
    const {id} = useParams();
    // console.log("STAFF ID: ", id);

    const [ user, setUser ] = useState(null);

    // **************************************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND USER BY ID
    // **************************************************************************************************
    useEffect(() => {      
        function findMyUserByID() {
            const url = `/api/v1/auth/account/manage/${id}`;
            api.get(url)
            .then((response) => {
                const { success, data, message } = response.data;
                if ((!success) || (message === "User not found")) {
                    console.log("Message: ", message);
                    console.log("Success: ", success);
                };
                            
                // Perform Actions Here if Truthy
                setUser(data);
                console.log("Success: ", success);
                console.log("Data: ", data);
                console.log("Message: ", message);
            })
            .catch((error) => {
                // Handle error state or logging here
                console.log("Error encountered: ", error);
            });
            // .finally(() => {
            //     setIsLoading(false);    // Always disable loading state, whether successful or not
            // });
        };
        
        var timerID = setTimeout(findMyUserByID, 500);   // Delay execution of findAllUsers by 1800ms
        return () => {
            // Clean up timer if component unmounts or token changes
            clearTimeout(timerID);
        };
    }, [id]);

    const [redirAppropriately, setRedirAppropriately] = useState(true);
    useEffect(() => {      
        function redirTo() {
            for (var i = 0; i < user?.roles?.length; i++) {
                if (user?.roles[i]?.role === 'ROLE_USERS') {
                    setRedirAppropriately(true);
                } else {
                    setRedirAppropriately(false);
                };
            };
        };
        redirTo();   // Delay execution of findAllUsers by 1800ms
    }, [redirAppropriately]);
    // *******************************************************************************************//
    // *******************************************************************************************//
    // console.log("User with ID: ", user);
    console.log("STAFF DETAILS: ", user);

  


    return (
        <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button">
                    <Link 
                    to={redirAppropriately ? '/admin/users' : '/admin/staffs'}                  
                    > Back</Link>
                </button>
            </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form className="user_details">
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
                </h6>
                <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // defaultValue="lucky.jesse"
                        // value={user?.username}
                    />
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // defaultValue="jesse@example.com"
                        value={user?.email}
                    />
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // defaultValue="Lucky"
                        value={user?.firstName}
                    />
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // defaultValue="Jesse"
                        value={user?.lastName}
                    />
                    </div>
                </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
                </h6>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4 flex gap-8">
                        <div className="relative w-3/6 mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                value={user?.address}
                            />
                        </div>
                        <div className="relative w-3/6 mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Address 2
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                value={user?.address2}
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-12/12 px-4 flex gap-8">
                        <div className="relative w-3/6 mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                City
                            </label>
                            <input
                                type="email"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                // defaultValue="New York"
                                value={user?.city}
                            />
                        </div>
                        <div className="relative w-3/6 mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                // defaultValue="United States"
                                value={user?.country}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-12/12 px-4 flex gap-8">
                        <div className="relative w-3/6 mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Postal Code
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                // defaultValue="Postal Code"
                                value={user?.postalCode}
                            />
                        </div>
                        <div className="relative w-3/6 mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                // defaultValue="Phone Number"
                                value={user?.phone}
                            />
                        </div>
                    </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                About Me
                </h6>
                <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        About me
                    </label>
                    <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                        rows="4"
                    ></textarea>
                    </div>
                </div>
                </div>
            </form>
            </div>
        </div>
        </>
    );
};
