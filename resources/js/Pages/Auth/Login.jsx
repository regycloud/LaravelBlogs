import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/login', { email, password }, {
            onError: (error) => {
                setErrors(error);
            },
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <h2>Login</h2>
                {errors && (
                    <div style={{ color: 'red' }}>
                        {Object.values(errors).map((err, idx) => (
                            <p key={idx}>{err}</p>
                        ))}
                    </div>
                )}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px', width: '100%' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;