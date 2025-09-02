import { useState } from 'react';
import API from '../api';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', form);
            console.log(res);  // Kontrollo çfarë vjen nga serveri
            alert(res.data?.msg || "Success!");
        } catch (err) {
            console.error(err);  // Shfaq errorin në console
            alert(err.response?.data?.msg || "Something went wrong");
        }
    };
    
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
