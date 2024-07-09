import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';






function Registration() {
    
    const [user, setUser] = useState({        
        username: '', 
        firstName: '', 
        lastName: '', 
        email: '',
        password: '', 
        isActivated: false,
    });
    const [inputValidation, setInputValidation] = useState(null);
    const [emailExistsMsg, setEmailExistsMsg] = useState(null);
    const [usernameExistsMsg, setUsernameExistsMsg] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); 

    
    useEffect(() => {
        document.title = "Sign Up | Oyebanji Gabriel";        
    }, []);


    function validateForm() {
        return user.email.length > 0 && user.password.length > 0;
    }    

    // function handleOnKeyUp(e) {
    //     console.clear();
    //     console.log('Username: ', user.username)
    //     console.log('First Name: ', user.first_name)
    //     console.log('Last Name: ', user.last_name)
    //     console.log('Email: ', user.email)
    //     console.log('Password: ', user.password)
    //     console.log('Account isActive: ', user.isActive)
    // }    
    

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? !e.target.checked : e.target.value;
        setUser({
          ...user,
          [name]: value
        });
    }      
    

    function handleOnKeyUp(e) {
        console.clear();
        console.log(`COLLECTING USER DETAILS.....\nUsername: ${user.username} \nFull Name: ${user.firstName} ${user.lastName} \nEmail: ${user.email} \nPassword: ${user.password} \nisActive: ${user.isActivated}`);
    }

    
    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/v1/admin/users/manage/create", user)
        .then((response) => {
            const { success, message } = response.data ;
            if ((!success) && message === 'Fill all the required inputs') {
                setIsSubmitting(success);
                setInputValidation("Fill all the required inputs.");              
                return;
            } else if ((!success) && message === 'User with email exists. Please sign-in.') {
                setIsSubmitting(success);
                setEmailExistsMsg(`${user.email.toLowerCase()} exists. Please log-in`);
                return;
            } else if ((!success) && message  === 'User with username exists. Please sign-in.') {
                setIsSubmitting(success);
                setUsernameExistsMsg(`${user.username.toLowerCase()} exists. Please log-in`);
                return;
            } else {
                setIsSubmitting(success);
                // setTimeout(() => {
                //     window.location.href = "http://127.0.0.1:3000/user/login";
                // }, 2500);
                return;
            };
        })
        .catch((error) => {
            console.log("Error occurred while creating new user: ", error);
        });
    }

    
    return (
        <div className="Registration">
            <Header />
            <main>
                <h1 className="page-title">Sign Up</h1>

                <div className='d-flex container justify-content-center'>
                    <div className='row flex-column mx-auto' style={{width:360}}>

                        <div className={`alert valhalla ${inputValidation ? 'alert-shown' : 'alert-hidden'}`}>
                            <h2 className='alert alert-danger'>{inputValidation}</h2>
                        </div> 
                        <div className={`alert winter ${emailExistsMsg ? 'alert-shown' : 'alert-hidden'}`}>
                            <h2 className='alert alert-danger'>{emailExistsMsg}</h2>
                        </div>
                        <div className={`alert thrones ${usernameExistsMsg ? 'alert-shown' : 'alert-hidden'}`}>
                            <h2 className='alert alert-danger'>{usernameExistsMsg}</h2>
                        </div>                    

                        <form className='' onSubmit={handleSubmit}>

                            <label htmlFor="username">Username
                                <input type="text" name="username" className="form-control" placeholder="Username" onChange={handleChange} onKeyUp={handleOnKeyUp}/>
                            </label>

                            <div className='form-row d-flex justify-content-between'>
                                <div className='col' >
                                    <label htmlFor="firstName">First Name
                                        <input type="text" name="firstName" className="form-control" placeholder="First Name"  onChange={handleChange} onKeyUp={handleOnKeyUp}/>
                                    </label>
                                </div>
                                <div className='col'>
                                    <label htmlFor="lastName">Last Name
                                        <input type="text" name="lastName" className="form-control" placeholder="Last Name" onChange={handleChange} onKeyUp={handleOnKeyUp}/>
                                    </label>
                                </div>
                            </div>

                            {/* <label htmlFor="phone">Phone Number
                                <input type="number" name="phone" placeholder="Phone Number"  onChange={handleChange} onKeyUp={handleOnKeyUp} value={user.phone} />
                            </label>

                            <label htmlFor="state">State
                                <select id="state" name="state" onChange={handleChange} onKeyUp={handleOnKeyUp} value={user.state}>
                                    <option defaultValue="">Choose...</option><option value="Abia">Abia</option><option value="Adamawa">Adamawa</option><option value="Akwa Ibom">Akwa Ibom</option><option value="Anambra">Anambra</option><option value="Bauchi">Bauchi</option><option value="Bayelsa">Bayelsa</option><option value="Benue">Benue</option><option value="Borno">Borno</option><option value="Cross River">Cross River</option><option value="Delta">Delta</option><option value="Ebonyi">Ebonyi</option><option value="Edo">Edo</option><option value="Ekiti">Ekiti</option><option value="Enugu">Enugu</option><option value="Gombe">Gombe</option><option value="Imo">Imo</option><option value="Jigawa">Jigawa</option><option value="Kaduna">Kaduna</option><option value="Kano">Kano</option><option value="Katsina">Katsina</option><option value="Kebbi">Kebbi</option><option value="Kogi">Kogi</option><option value="Kwara">Kwara</option><option value="Lagos">Lagos</option><option value="Nasarawa">Nasarawa</option><option value="Niger">Niger</option><option value="Ogun">Ogun</option><option value="Ondo">Ondo</option><option value="Osun">Osun</option><option value="Oyo">Oyo</option><option value="Plateau">Plateau</option><option value="Rivers">Rivers</option><option value="Sokoto">Sokoto</option><option value="Taraba">Taraba</option><option value="Yobe">Yobe</option><option value="Zamfara">Zamfara</option><option value="FCT, Abuja">FCT, Abuja</option>
                                </select>
                            </label> */}

                            <label htmlFor="email">Email
                                <input type="email" name="email" className="form-control" placeholder="Enter e-mail" onChange={handleChange} onKeyUp={handleOnKeyUp}/>
                            </label>
                        
                            <label htmlFor="password">Password
                                <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} onKeyUp={handleOnKeyUp}/>        
                            </label>

                            <div className='tac d-flex'>
                                <label htmlFor="isActivated" className='text'>I agree to terms and condition?
                                    <input type="checkbox" className='checkBox' name="isActivated" onChange={handleChange} onKeyUp={handleOnKeyUp}/>
                                </label>
                            </div>

                            {/* onClick={() => setIsSubmitting(false)} */}
                            <button type="submit" className="form-control" disabled={!validateForm()}>Create account</button>

                            <div className={`alert alert-success ${isSubmitting ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => setIsSubmitting(false)}>
                                <strong className='isSubmitting'>submitting...</strong>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Registration;