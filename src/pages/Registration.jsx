import { useState, } from "react";
import axios from "axios";
import { Nav } from "../components";







const Registration = () => {

    const [user, setUser] = useState({ username: "", firstName: "", lastName: "", email: "", password: "", isActivated: false, });





    async function handleChange(e) {
        const name = e.target.name;
        const value = e.target.checkbox ? e.target.checked : e.target.value;

        setUser({
            ...user,
            [name]: value
        })

        console.log("Collected User Details: ", user);
    };





    function handleSubmit() {
        axios.post("http://127.0.0.1:8000/api/v1/admin/users/manage/create", user)
        .then((res) => {
            const { success, message, data } = res.data;
            if (!success && message === "Fill all the required inputs.") {
                console.log("Success: ", success, "\nMessage: ", message);
            } else if (!success && message === "E-mail exists. Please sign-in.") {
                console.log("Success: ", success, "\nMessage: ", message);
            } else if (!success && message === "Username exists. Please sign-in.") {
                console.log("Success: ", success, "\nMessage: ", message);
            } else {
                console.log("Success: ", success, "\nData: ", data, "\nMessage: ", message);
            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };
    
    




    return (
        <>
            <Nav />
            <div className="absolute top-0 w-full h-screen">
                <main className="w-full h-128 relative">
                    <div className="flex justify-center mt-40 pt-24">


                        <form id="signUp" onSubmit={handleSubmit}>

                            <div className="text-center pt-16 form--title">
                                <h5>Registration Form</h5>
                            </div>

                            <div className="pb-20">
                                <div className="form--wrapper gap-6">

                                    <label htmlFor="username">
                                        <input type="text" name="username" value={user.username} placeholder="Username" onChange={handleChange} />
                                    </label>

                                    <div className="flex flex-row gap-4">
                                        <label htmlFor="firstName">
                                            <input type="text" name="firstName" value={user.firstName} placeholder="First Name" onChange={handleChange} />
                                        </label>
                                        <label htmlFor="lastName">
                                            <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" onChange={handleChange} />
                                        </label>
                                    </div>

                                    <label htmlFor="email">
                                        <input type="email" name="email" value={user.email} placeholder="example@email.com" onChange={handleChange} />
                                    </label>

                                    <label htmlFor="password">
                                        <input type="text" name="password" value={user.password} placeholder="*************" onChange={handleChange} />
                                    </label>

                                    <label htmlFor="isActivated" className="flex justify-end items-end flex-row-reverse gap-4">I agree to terms & conditions?
                                        <input type="checkbox" name="isActivated" value={user.isActivated} onChange={handleChange} />
                                    </label>

                                    <button type="submit" className="text-white bg-blue-600 text-2xl capitalize w-52 px-6 py-5 rounded-lg">submit</button>

                                </div>
                            </div>

                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Registration;
