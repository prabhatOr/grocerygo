import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function CustomerDetail() {
  const { id } = useParams();

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col md:flex-row justify-between gap-3 items-start md:items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/users">Customers</Link> / {id ? 'Update' : 'Add New'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <div className="bg-white p-4 rounded shadow">
              <div className="text-center">
                <img
                  src="https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/profile/unknown.png"
                  alt="profile"
                  className="w-20 h-20 mx-auto rounded-full"
                />
                <h5 className="mt-3 text-lg font-semibold">srftret</h5>
                <p className="text-gray-500 text-sm">sdgdsg@g.com</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded shadow flex flex-col items-center text-center">
              <i className="fa-solid fa-cart-shopping text-lg mb-2" />
              <h5 className="text-lg font-semibold">0</h5>
              <p className="text-gray-500 text-sm">Orders</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded shadow flex flex-col items-center text-center">
              <i className="fa-solid fa-share-from-square text-lg mb-2" />
              <h5 className="text-lg font-semibold">IQu60jpRtF</h5>
              <p className="text-gray-500 text-sm">Referral Code</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded shadow">
              <h5 className="font-bold border-b pb-2 mb-2">Wallet</h5>
              <p className="text-sm text-gray-500">Total wallet balance</p>
              <h4 className="text-xl font-semibold mt-1">$2,099.00</h4>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white p-4 rounded shadow">
              <h5 className="font-bold border-b pb-2 mb-3">Manage Wallet</h5>
              <input type="text" placeholder="Amount" className="input input-bordered w-full mb-3" />
              <div className="flex gap-2">
                <button className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded w-1/2">
                  <i className="fa fa-arrow-up mr-1" />
                  Add Money
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded w-1/2">
                  <i className="fa fa-arrow-down mr-1" />
                  Deduct Money
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded shadow p-4">
          <h5 className="font-bold border-b pb-3 mb-3">Orders</h5>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Order Number</th>
                  <th className="p-2 border">Total Amount</th>
                  <th className="p-2 border">Payment Type</th>
                  <th className="p-2 border">Order Type</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Created Date</th>
                  <th className="p-2 border">Updated Date</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9} className="text-center p-3 text-gray-500">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded shadow p-4">
          <h5 className="font-bold border-b pb-3 mb-3">Transactions</h5>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center p-3 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
