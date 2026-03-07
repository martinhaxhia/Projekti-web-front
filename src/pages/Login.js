import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            // Save token + update auth state
            login(res.data.token);
            // Redirect to protected page
            navigate('/getProduct');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || "Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
