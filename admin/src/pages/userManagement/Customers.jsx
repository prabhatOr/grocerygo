import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaX } from 'react-icons/fa6';

export default function Customers() {
    const { token } = useAuth();

    const fetchCustomer = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCustomers(res.data);
        } catch (error) {
            console.error('Failed to fetch Customer:', error);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Customer?')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCustomer();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    // toggle status of a customer
    const handleToggleStatus = async (id) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/admin/users/${id}`,
                {}, // empty body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchCustomer();
        } catch (err) {
            console.error("Status toggle failed:", err.response?.data || err.message);
        }
    };


    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">Customers</h1>
                    <Link
                        to="/admin/users/add"
                        className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded"
                    >
                        <FaPlus /> Add New
                    </Link>
                </div>

                <div className="p-4 bg-gray-50 rounded-md shadow">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
                        <div className="flex w-full gap-2">
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                                Excel
                            </button>
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                                PDF
                            </button>
                        </div>
                        <div className="flex items-center justify-between md:justify-end w-full gap-1">
                            <span>Search:</span>
                            <input
                                type="search"
                                placeholder="Search by customer name"
                                className="border w-full md:w-fit px-4 py-1 rounded-md outline-none"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full text-sm border border-gray-200 rounded-md">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border px-4 py-2 text-left">#</th>
                                    <th className="border px-4 py-2 text-left">Name</th>
                                    <th className="border px-4 py-2 text-left">Email</th>
                                    <th className="border px-4 py-2 text-left">Mobile</th>
                                    <th className="border px-4 py-2 text-left">Referral Code</th>
                                    <th className="border px-4 py-2 text-left">Login With</th>
                                    <th className="border px-4 py-2 text-left">Verification</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Created Date</th>
                                    <th className="border px-4 py-2 text-left">Updated Date</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCustomers.map((customer, idx) => (
                                    <tr key={idx}
                                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                                    >
                                        <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                        <td className="border px-4 py-2">{customer?.name}</td>
                                        <td className="border px-4 py-2">{customer?.email}</td>
                                        <td className="border px-4 py-2">{customer?.mobile}</td>
                                        <td className="border px-4 py-2">{customer?.referralCode || "ADEFFE23"}</td>
                                        <td className="border px-4 py-2">{customer?.loginWith}</td>
                                        <td className="border px-4 py-2">{customer?.verificationStatus}</td>
                                        <td className="border px-4 py-2">
                                            <span onClick={() => handleToggleStatus(customer._id)} className={`text-white w-fit p-1.5 rounded-md flex items-center justify-center cursor-pointer ${customer.status ? "bg-green-500" : "bg-red-500"}`} >
                                                {customer?.status ? <FaCheck /> : <FaX />}
                                            </span>
                                        </td>
                                        <td className="border px-3 py-2">{new Date(customer?.createdAt || customer?.created).toLocaleString()}</td>
                                        <td className="border px-3 py-2">{new Date(customer?.updatedAt || customer?.updated).toLocaleString()}</td>
                                        <td className="border px-4 py-2 text-white">
                                            <div className="flex items-center gap-2">
                                                <Link to={`/admin/users/${customer._id}`} className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                                    <FaEdit />
                                                </Link>
                                                <Link to={`/admin/users/${customer._id}/detail`} className="bg-black hover:bg-neutral-700 p-1.5 rounded-md" title="Edit">
                                                    <FaEye />
                                                </Link>
                                                <button onClick={() => handleDelete(customer._id)} className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md" title="Delete">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing {filteredCustomers.length === 0 ? "0 to 0" : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredCustomers.length)}`} of {filteredCustomers.length} entries
                        </div>
                        <div className="space-x-2">
                            <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
                            <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
