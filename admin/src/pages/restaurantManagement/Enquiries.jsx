import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaArrowsAlt, FaTrash } from 'react-icons/fa';

export default function Enquiries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const enquiries = [
    {
      id: 1,
      name: 'Test data',
      email: 'test@mailinator.com',
      message:
        'Lorem ispum is dummy text to type setting the industry. Lorem ispum is dummy text to type setting the industry. Lorem ispum is dummy text to type setting the industry. Lorem ispum is dummy text to type setting the industry.',
      createdDate: 'Oct 29, 2024 05:28 AM',
      updatedDate: 'Oct 29, 2024 05:28 AM'
    }
  ];

  const filtered = enquiries.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentEnquiries = filtered.slice(indexOfFirst, indexOfLast);

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
          <h1 className="text-2xl font-semibold">Enquiries</h1>
        </div>

        <div className="p-4 bg-white rounded-md shadow">
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
                placeholder="Search by name"
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
                  <th className="border px-4 py-2"></th>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Created Date</th>
                  <th className="border px-4 py-2">Updated Date</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEnquiries.length > 0 ? (
                  currentEnquiries.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border px-4 py-2 text-center cursor-move"><FaArrowsAlt /></td>
                      <td className="border px-4 py-2">{indexOfFirst + index + 1}</td>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">{item.email}</td>
                      <td className="border px-4 py-2 max-w-xs">{item.message}</td>
                      <td className="border px-4 py-2">{item.createdDate}</td>
                      <td className="border px-4 py-2">{item.updatedDate}</td>
                      <td className="border px-4 py-2 text-center">
                        <button className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded" title="Delete">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing {filtered.length === 0 ? '0 to 0' : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filtered.length)}`} of {filtered.length} entries
            </div>
            <div className="space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}