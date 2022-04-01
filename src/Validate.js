import axios from 'axios';
import { useState } from 'react';
const ValidateApp = () => {
    let [authors, setAuthors] = useState([]);
    let items = useState();
    const saveUser = (e) => {
        e.preventDefault();
        let password = e.target.password.value;
        let username = e.target.username.value;
        axios
            .post(`/examuser/checklogin/${username}/${password}`)
            .then((res) => {
                console.log(res.data); items = res.data.token;
                localStorage.setItem('token', JSON.stringify(items));
            })
            .catch((e) => console.log(e));
    };
    return (
        <div>
            <h2>Welcome to Login page</h2>
            <form className='todo' onSubmit={saveUser}>
                <label>
                    <h3>Username</h3>
                </label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter username'
                    name='username'
                />
                <br />
                <label>
                    <h3>Password</h3>
                </label>
                <input
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    className='form-control'
                />
                <div className='text-center'>
                    <button>Validate</button>
                </div>
            </form>
        </div>
    );
};
export default ValidateApp;