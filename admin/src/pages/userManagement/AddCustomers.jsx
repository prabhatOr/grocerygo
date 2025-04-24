import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AddCustomers() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        loginWith: 'Email',
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token'); // make sure this is set at login

    useEffect(() => {
        if (id) {
            fetch(`${import.meta.env.VITE_BASE_URL}/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        ...formData,
                        name: data.name || '',
                        email: data.email || '',
                        mobile: data.mobile || '',
                        password: '', // keep password blank during update
                        loginWith: data.loginWith || 'Email',
                    });
                })
                .catch(err => {
                    console.error("Failed to fetch customer", err);
                    alert("Failed to load customer data");
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = id
            ? `${import.meta.env.VITE_BASE_URL}/admin/users/update/${id}`
            : `${import.meta.env.VITE_BASE_URL}/admin/users/`;

        const method = id ? 'PUT' : 'POST';

        // Remove password if updating and it's empty
        const payload = { ...formData };
        if (id && !payload.password) delete payload.password;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                navigate('/admin/users');
            } else {
                const result = await response.json();
                alert(result.message || 'Failed to save customer');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/users">Customers</Link> {id ? '' : '/ Add New'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-6 rounded-md shadow-md bg-white space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block font-medium mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <label htmlFor="mobile" className="block font-medium mb-1">
                                Mobile <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Mobile"
                            />
                        </div>

                       {!id && <div>
                            <label htmlFor="password" className="block font-medium mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required={!id}
                                    className="p-2 pr-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link
                            to="/admin/users"
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-700 transition"
                        >
                            {id ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
