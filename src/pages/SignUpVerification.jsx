import { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Nav, ButtonSubmit, } from "../components";







const SignUpVerification = () => {
    
    // console.clear();



    const { token } = useParams();
    const [ user, setUser ] = useState({ _id: token.id }); 
    console.log("Is Existing User: ", user);
    

    useEffect(() => {
        axios.post(`http://127.0.0.1:3000/user/verify/${token}`, user, { 
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            const { success, data, message } = res.data;
            if (!success) {
                console.log("success", success);
                console.log("message", message);
            }
            
            console.log("success", success);
            console.log("message", message);
            console.log("data", data);
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    }, []);


        
    return (
        <>
            <Nav />
            <div className="absolute top-0 w-full h-screen -z-10">
                <main className="w-full h-128 relative">

                    <div className="mt-40 pt-24 items-center">
                        <div className="text-center pt-16 form--title">
                            <h5>Registration Completed</h5>
                        </div>


                        <div className="px-8 pt-14 pb-20">
                            <div className="form--wrapper gap-6">
                                <label htmlFor="email">
                                    <input type="disabled" name="email" value={user.email} />
                                </label>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default SignUpVerification;
