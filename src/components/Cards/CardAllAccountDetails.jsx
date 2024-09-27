// components
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import "../../assets/styles/tailwind.css";





export default function CardAllAccountDetails() {
  
  
    const [activeForm, setActiveForm] = useState('user-form');


    // ************************************
    // MANAGE STATE:-  TO FIND USER BY ID
    // ************************************
    const {id} = useParams();
    // console.log("STAFF ID: ", id);
    const [ user, setUser ] = useState(null);
    // console.log("RETRIEVED STAFF INFO: ", user);

    const [redirToUserPage, setRedirToUserPage] = useState(true);
    
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
                // console.log("Success: ", success);
                // console.log("Data: ", data);
                // console.log("Message: ", message);
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


    // **************************************************************************************************
    // FUNCTION TO RE-DIRECT TO PREVIOUS PAGE BASED ON USER'S ROLE
    // **************************************************************************************************
    useEffect(() => {      
        function handleRedirectBackTo() {
            for (var i = 0; i < user?.roles?.length; i++) {
                if (user?.roles[i]?.role === 'ROLE_USERS') {
                    setRedirToUserPage(true);
                } else {
                    setRedirToUserPage(false);
                };
            };
        };
        handleRedirectBackTo();
    }, [user, redirToUserPage]);

    function updateUserDetails() {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        setActiveForm('update-form');        
    }; 
    // *******************************************************************************************//
    // *******************************************************************************************// 






    // const [updatedUserInfo, setUpdatedUserInfo ] = useState(null);   
    // const [updatedUserInfo, setUpdatedUserInfo ] = useState({ 
        // username: '',
        // firstName: '',
        // lastName: '',
        // email: '', 
        // phone: '', 
        // address: '', 
        // address2: '', 
        // city: '', 
        // state: '', 
        // country: '', 
        // postalCode: '', 
        // aboutMe: '', 
        // status: '', 
        // isVerified: '', 
    // });
    // console.log("UPDATING STAFF INFO: ", updatedUserInfo);
    const [submitUpdate, setSubmitUpdate ] = useState(false);

    async function handleChangeUserInfo(e) {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    };

    async function handleUpdateUserInfo(e) {
        e.preventDefault();
     
        const uri = `/api/v1/admin/users/manage/update`;
        const payLoad = { 
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email, 
            phone: user?.phone, 
            address: user?.address, 
            address2: user?.address2, 
            city: user?.city, 
            state: user?.state, 
            country: user?.country, 
            postalCode: user?.postalCode, 
            aboutMe: user?.aboutMe, 
            // status: '', 
            // isVerified: '', 
        };

        api.put(uri, payLoad)
        .then((response) => {
            const { success, data, message } = response.data;

            if (!success && message === "No match found") { 
                setSubmitUpdate(false);                
                console.log("Success: ", success);
                console.log("Message: ", message);                
            };
          
            setSubmitUpdate(true);
            setUser(data);

            console.log("Success: ", success);
            console.log("Data: ", data);
            console.log("Message: ", message);

            setTimeout(() => {
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });  
                setSubmitUpdate(false);  
                setActiveForm('user-form');
            }, 3000);        
        })
        .catch((error) => {
            console.log("Internal server error: ", error);
        });
    };

    useEffect(() => {  
        if (submitUpdate === true) {    
            function findUpdatedUserID() {
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
                    // console.log("Success: ", success);
                    // console.log("Data: ", data);
                    // console.log("Message: ", message);
                })
                .catch((error) => {
                    // Handle error state or logging here
                    console.log("Error encountered: ", error);
                });
            };
            
            findUpdatedUserID();
        };
    }, [submitUpdate]);


    



    return (
        <>
            <div id="accountDetails" className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

                <div className={`activeDisplay ${activeForm === 'user-form' ? 'block' : 'hidden'}`}>
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button">
                                <Link to={redirToUserPage ? '/admin/users' : '/admin/staffs'}> Back</Link>
                            </button>
                        </div>
                    </div>

                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        {/* ORIGINAL USER DATA FORM */}
                        <form>
                            <h6 className="text-blueGray-400 text-2xl mt-12 mb-12 font-bold uppercase">
                            User Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label 
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                            htmlFor="username">
                                            Username   

                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                // defaultValue="lucky.jesse"
                                                value={user?.userName}
                                            />
                                        </label>
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
                                            htmlFor="city"
                                        >
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            // defaultValue="New York"
                                            value={user?.city}
                                        />
                                    </div>

                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="state"
                                        >
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                           
                                            value={user?.state}
                                        />
                                    </div>

                                </div>
                                
                                <div className="w-full lg:w-12/12 px-4 flex gap-8">
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
                                </div>

                                <div className="w-full lg:w-12/12 px-4 flex justify-start gap-8">
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password">
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
                                        // defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                                        value={user?.aboutMe}
                                        rows="4"
                                    ></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-end">
                            <button onClick={updateUserDetails}
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button">Edit details
                            </button>
                        </div>
                    </div>
                </div>  





                <div className={`activeDisplay ${activeForm === 'update-form' ? 'block' : 'hidden'}`}>
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button">
                                <Link to={redirToUserPage ? '/admin/users' : '/admin/staffs'}> Back</Link>
                            </button>
                        </div>
                    </div>

                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        {/* FORM FOR UPDATING USER DATA */}
                        <form onSubmit={handleUpdateUserInfo}>
                            <h6 className="text-blueGray-400 text-2xl mt-12 mb-12 font-black uppercase">
                            Update User Information
                            </h6>
                            <div className="flex flex-wrap">
                                
                                {/* Username */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label 
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                            htmlFor="username">
                                            Username                        

                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue={user?.userName}
                                                name="username"
                                                onChange={handleChangeUserInfo}                                                                                           
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* E-mail */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="email">
                                            Email address
                                        
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow hover:cursor-not-allowed focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                              
                                                defaultValue={user?.email} 
                                                name="email"
                                                onChange={handleChangeUserInfo} 
                                                readOnly                                                                                           
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* First Name */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="firstName">
                                            First Name
                                           
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue={user?.firstName}
                                                name="firstName"
                                                onChange={handleChangeUserInfo}                                      
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="lastName">
                                            Last Name     

                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue={user?.lastName}
                                                name="lastName"
                                                onChange={handleChangeUserInfo}                                            
                                            />
                                        </label>
                                    </div>
                                </div>

                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Contact Information
                            </h6>
                            <div className="flex flex-wrap">

                                <div className="w-full lg:w-12/12 px-4 flex gap-8">

                                    {/* Address */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="address">
                                            Address

                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                                defaultValue={user?.address}
                                                name="address"
                                                onChange={handleChangeUserInfo}                                              
                                            />
                                        </label>
                                    </div>

                                    {/* Address 2 */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="address2">
                                            Address 2
                                       
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue={user?.address2}
                                                name="address2"
                                                onChange={handleChangeUserInfo}                                        
                                            />
                                        </label>
                                    </div>
                                    
                                </div>


                                <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                                    {/* City */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="city">
                                            City
                                        
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                            
                                                name="city"
                                                onChange={handleChangeUserInfo}
                                                defaultValue={user?.city}
                                            />
                                        </label>
                                    </div>

                                    {/* State */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="state">
                                            State
                                       
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                              
                                                defaultValue={user?.state}
                                                name="state"
                                                onChange={handleChangeUserInfo}                                               
                                            />
                                        </label>
                                    </div>
                               
                                </div>


                                <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                                    {/* Country */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="country">
                                            Country
                                       
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                              
                                                defaultValue={user?.country}
                                                name="country"
                                                onChange={handleChangeUserInfo}                                                
                                            />
                                        </label>
                                    </div>

                                    {/* Postal Code */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="postalCode">
                                            Postal Code
                                     
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                name="postalCode"
                                                onChange={handleChangeUserInfo}
                                                defaultValue={user?.postalCode}
                                            />
                                        </label>
                                    </div>

                                </div>

                                <div className="w-full lg:w-12/12 px-4 flex justify-start gap-8">
                                    
                                    {/* Phone Number */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="phone">
                                            Phone Number
                                    
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 h-16 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue={user?.phone}
                                                name="phone"
                                                onChange={handleChangeUserInfo}                                            
                                            />
                                        </label>
                                    </div>                    

                                </div>
                            </div>                              

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            About Me
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">

                                    {/* About Me */}
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="aboutMe">
                                            About me
                                    
                                            <textarea
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                                defaultValue={user?.aboutMe}
                                                name="aboutMe"
                                                onChange={handleChangeUserInfo}                                              
                                                rows="4">
                                            </textarea>
                                        </label>
                                    </div>

                                </div>
                            </div>


                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center flex justify-end">
                                    <button onClick={handleUpdateUserInfo}
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit">Update details
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-end">
                            <button onClick={saveUserDetails}
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit">Update details
                            </button>
                        </div>
                    </div> */}
                </div>         
            </div>
        </>
    );
};
