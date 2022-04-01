import axios from 'axios';
import { useEffect, useState } from 'react';
const RegisterApp = () => {
    let [authors, setAuthors] = useState([]);
    useEffect(() => {
        axios.get('users/');
    }, []);
    const createTable = () => {
        axios.get('/examuser/createtable');
    };
    const saveUser = (e) => {
        e.preventDefault();
        let id = e.target.id.value;
        let password = e.target.password.value;
        let username = e.target.username.value;
        axios
            .post('/examuser', { id, username, password })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    };
    return (
        <div>
            {createTable()}
            <h2>Welcome to registration page</h2>
            <form className='todo' onSubmit={saveUser}>
                <label>
                    <h3>Id </h3>
                </label>
                <input type="number" className='form-control' placeholder='Enter Id' name="id" /><br />
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
                    <button>Register</button>
                </div>
            </form>
        </div>
    );
};
export default RegisterApp;