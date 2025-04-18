
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddCoupons() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        discountType: '',
        discount: '',
        usageType: '',
        usageLimit: '',
        couponCode: '',
        minAmount: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        alert('Coupon saved!');
        navigate('/promocode')
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/promocode">Coupons</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-4 rounded-md shadow-md bg-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium">Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    required
                                    className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Discount Type <span className="text-red-500">*</span></label>
                                    <select
                                        name="discountType"
                                        value={form.discountType}
                                        onChange={handleChange}
                                        required
                                        className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Fixed</option>
                                        <option value="2">Percentage</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-medium">Discount <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="discount"
                                        value={form.discount}
                                        onChange={handleChange}
                                        placeholder="Discount"
                                        required
                                        className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium">Coupon Usage Type <span className="text-red-500">*</span></label>
                                <select
                                    name="usageType"
                                    value={form.usageType}
                                    onChange={handleChange}
                                    required
                                    className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Limited</option>
                                    <option value="2">Unlimited</option>
                                </select>
                            </div>

                            {form.usageType === '1' && (
                                <div>
                                    <label className="block font-medium">Coupon Usage Limit <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="usageLimit"
                                        value={form.usageLimit}
                                        onChange={handleChange}
                                        placeholder="Coupon usage limit"
                                        className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Coupon Code <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="couponCode"
                                        value={form.couponCode}
                                        onChange={handleChange}
                                        placeholder="Coupon Code"
                                        required
                                        className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Min. Order Amount <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="minAmount"
                                        value={form.minAmount}
                                        onChange={handleChange}
                                        placeholder="Min. Order Amount"
                                        required
                                        className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Start Date <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={form.startDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">End Date <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={form.endDate}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium">Description <span className="text-red-500">*</span></label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    placeholder="Description"
                                    className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 text-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/promocode')}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-black hover:bg-neutral-700 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}



