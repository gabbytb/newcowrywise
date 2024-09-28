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
    const { id } = useParams();
    // console.log("STAFF ID: ", id);
    const [ user, setUser ] = useState({ 
        firstName: '',
        lastName: '',
        email: '', 
        phone: '', 
        address: '', 
        address2: '', 
        city: '', 
        state: '', 
        country: '', 
        postalCode: '', 
        aboutMe: '', 
    });
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
    console.log("GOT STAFF INFO: ", user);



    function showUpdateForm() {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        setActiveForm('update-form');        
        document.querySelector('#userUpdateFormID').reset();
    };
    function showUserInfo() {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        document.querySelector('#userUpdateFormID').reset();
        setActiveForm('user-form');        
    }; 


    const [submitUpdate, setSubmitUpdate ] = useState(false);
  
    async function handleChangeUserInfo(e) {
        const name = e.target.name,
              value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    async function handleSubmitUserInfo(e) {
        e.preventDefault();
     
        const uri = `/api/v1/admin/users/manage/update`;
        // const payLoad = { 
        //     // username: user?.username,
        //     firstName: user?.firstName,
        //     lastName: user?.lastName,
        //     email: user?.email, 
        //     phone: user?.phone, 
        //     address: user?.address, 
        //     address2: user?.address2, 
        //     city: user?.city, 
        //     state: user?.state, 
        //     country: user?.country, 
        //     postalCode: user?.postalCode, 
        //     aboutMe: user?.aboutMe, 
        //     // status: '', 
        //     // isVerified: '', 
        // };

        await api.put(uri, user)
        .then((response) => {
            const { success, data, message } = response.data;

            if (!success && message === "No match found") { 
                setSubmitUpdate(success);                
                console.log("Success: ", success);
                console.log("Message: ", message);                
            };
          
            setSubmitUpdate(success);
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
                // if (submitUpdate === true) {       
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
    }, [id, submitUpdate]);


    

    // **************************************************************************************************
    // FUNCTION TO RE-DIRECT TO PREVIOUS PAGE BASED ON USER'S ROLE
    // **************************************************************************************************
    const [redirToUserPage, setRedirToUserPage] = useState(true);
    
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
    // *******************************************************************************************//
    // *******************************************************************************************// 





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
                        {/* FORM FOR SHOWING USER DATA */}
                        <form id="showUserFormID">
                            <h6 className="text-blueGray-400 text-2xl mt-12 mb-12 font-bold uppercase">
                            User Information
                            </h6>
                            <div className="flex flex-wrap">

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
                                            disabled
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
                                        disabled
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
                                        disabled
                                    />
                                    </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                            disabled
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-end">
                            <button onClick={showUpdateForm}
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button">Edit details
                            </button>
                        </div>
                    </div>
                </div>  


                <div className={`activeDisplay ${activeForm === 'update-form' ? 'block' : 'hidden'}`}>
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                            <button onClick={showUserInfo}
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"> Back
                            </button>
                        </div>
                    </div>


                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        {/* FORM FOR UPDATING USER DATA */}
                        <form id="userUpdateFormID" onSubmit={handleSubmitUserInfo}>
                            <h6 className="text-blueGray-400 text-2xl mt-12 mb-12 font-black uppercase px-4">
                            Update User Information
                            </h6>
                            <div className="flex flex-wrap">
                                                                               
                                {/* First Name */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="firstName">
                                            First Name
                                           
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 mt-3 mb-4 placeholder-gray-500 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder={user?.firstName}
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
                                                className="border-0 px-3 py-3 mt-3 mb-4 placeholder-gray-500 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder={user?.lastName}
                                                name="lastName"
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
                                                className="border-0 px-3 py-3 placeholder-gray-500 text-blueGray-600 bg-white rounded text-sm shadow hover:cursor-not-allowed focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                              
                                                placeholder={user?.email} 
                                                name="email"
                                                onChange={handleChangeUserInfo} 
                                                readOnly                                                                                           
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="phone">
                                        Phone Number
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 h-16 placeholder-gray-500 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder={user?.phone}
                                            name="phone"
                                            onChange={handleChangeUserInfo}                                            
                                        />
                                    </label>
                                </div>  

                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-lg mt-10 mb-8 px-4 font-bold uppercase">
                            Contact Information
                            </h6>
                            <div className="flex flex-wrap">

                                {/* ADDRESS 1 AND 2 */}
                                <div className="w-full lg:w-12/12 px-4 flex gap-8">

                                    {/* Address */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="address">
                                            Address

                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                                placeholder={user?.address}
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
                                                className="border-0 px-3 py-3 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder={user?.address2}
                                                name="address2"
                                                onChange={handleChangeUserInfo}                                        
                                            />
                                        </label>
                                    </div>
                                    
                                </div>

                                {/* CITY AND STATE */}    
                                <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                                    {/* City */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="city">
                                            City
                                        
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                            
                                                placeholder={user?.city}
                                                name="city"
                                                onChange={handleChangeUserInfo}                                                
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
                                                className="border-0 px-3 py-3 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                              
                                                placeholder={user?.state}
                                                name="state"
                                                onChange={handleChangeUserInfo}                                               
                                            />
                                        </label>
                                    </div>
                               
                                </div>

                                {/* COUNTRY AND POSTAL CODE */}
                                <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                                    {/* Country */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="country">
                                            Country
                                       
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                              
                                                placeholder={user?.country}
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
                                                className="border-0 px-3 py-3 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder={user?.postalCode}
                                                name="postalCode"
                                                onChange={handleChangeUserInfo}                                               
                                            />
                                        </label>
                                    </div>

                                </div>

                            </div>                              

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-lg mt-3 mb-6 font-bold uppercase">
                            About User
                            </h6>
                            <div className="flex flex-wrap">
                                
                                {/* OPTIONAL: ABOUT ME */}
                                <div className="w-full lg:w-12/12 px-4">

                                    {/* About Me */}
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="aboutMe">
                                            About me
                                    
                                            <textarea
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-gray-600 text-blueGray-600 bg-gray-900 rounded text-sm shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                                placeholder={user?.aboutMe}
                                                name="aboutMe"
                                                onChange={handleChangeUserInfo}                                              
                                                rows="6">
                                            </textarea>
                                        </label>
                                    </div>

                                </div>

                            </div>


                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center flex justify-end">
                                    <button type="submit"
                                        onClick={handleSubmitUserInfo}
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    >Update details</button>
                                </div>
                            </div>
                        </form>
                    </div>                   
                </div>  

            </div>
        </>
    );
};
