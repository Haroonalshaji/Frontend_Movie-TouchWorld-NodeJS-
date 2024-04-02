import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import Header from './Header';
import axios from 'axios';

function Auth({ register }) {
    const base_url = "http://localhost:8000"

    const location = useNavigate()

    const isRegisterForm = register ? true : false

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    })
    console.log(userData);

    const registerData = async () => {
        const { username, email, password } = userData
        if (!username || !email || !password) {
            alert("Please fill the form ")
        }
        else {
            const result = await axios.post(`${base_url}/register`, userData)
            console.log(result);
            if (result.status == 200) {
                alert(result.data.message)//user registration successful
                location('/')
            }
            else {
                alert(result.response.data.message)//user already registered
            }
        }
        console.log(userData);
    }

    const loginData = async () => {
        const { email, password } = userData
        if (!email || !password) {
            alert("Please fill the form ")
        }
        else {
            const result = await axios.post(`${base_url}/`, userData)
            console.log(result);
            if (result.status == 200) {
                alert("Login Successfull !")//user registration successful
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
                sessionStorage.setItem("token", result.data.token)
                location('/body')
            }
            else {
                alert(result.response.data)//user already registered
            }
        }
        console.log(userData);
    }

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="card shadow p-2 m-2">
                        {/* content */}

                        <h5 className='text-center mt-5'>
                            {
                                isRegisterForm ? 'Register here' : 'Login here'
                            }
                        </h5>

                        <form className='p-5'>
                            {
                                isRegisterForm &&
                                <input type="text" value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} placeholder='Username' className='form-control mb-3' />
                            }
                            <input type="text" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder='Email' className='form-control mb-3' />
                            <input type="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} placeholder='Password' className='form-control ' />
                        </form>

                        {
                            isRegisterForm ?
                                <div className='text-center m-3'>
                                    <button onClick={registerData} className='btn btn-success '>Register</button>
                                    <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                                        <p className='mt-3 text-dark' >Already Register? please login from here...</p>
                                    </Link>
                                </div>
                                :
                                <div className='text-center m-3'>
                                    <button onClick={loginData} className='btn btn-warning '>Login</button>
                                    <Link to={'/register'} style={{ textDecoration: 'none', color: 'white' }}>
                                        <p className='mt-3 text-dark' >New to here? Please Register...</p>
                                    </Link>
                                </div>
                        }

                    </div>
                </div>
                <div className="col-4"></div>
            </div>


        </div>
    )
}

export default Auth