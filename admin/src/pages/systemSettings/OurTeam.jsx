import React, { useState } from 'react';
import {
  FaFacebookSquare,
  FaYoutube,
  FaInstagramSquare,
  FaEdit,
  FaTrash,
  FaPlus,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function OurTeam() {
  const initialTeam = [
    {
      id: 1,
      name: 'Diana R Wilmot',
      designation: 'Tradewell',
      socialLinks: {
        facebook: 'https://www.facebook.com/',
        youtube: 'https://www.instagram.com/',
        instagram: 'https://www.google.com/',
      },
      createdDate: 'Jul 29, 2024 01:27 AM',
      updatedDate: 'Jul 29, 2024 01:27 AM',
    },
    {
      id: 2,
      name: 'Hector L Holst',
      designation: 'Webcom Business Services',
      socialLinks: {
        facebook: 'https://www.facebook.com/',
        youtube: 'https://www.instagram.com/',
        instagram: 'https://www.google.com/',
      },
      createdDate: 'Jul 29, 2024 01:26 AM',
      updatedDate: 'Jul 29, 2024 01:26 AM',
    },
    {
      id: 3,
      name: 'Donald W Hembree',
      designation: 'Health Educator',
      socialLinks: {
        facebook: 'https://www.facebook.com/',
        youtube: 'https://www.instagram.com/',
        instagram: 'https://www.google.com/',
      },
      createdDate: 'Jul 29, 2024 01:25 AM',
      updatedDate: 'Jul 29, 2024 01:25 AM',
    },
    {
      id: 4,
      name: 'James K Taber',
      designation: 'Legal Adviser',
      socialLinks: {
        facebook: 'https://www.facebook.com/',
        youtube: 'https://www.youtube.com/',
        instagram: 'https://www.instagram.com/',
      },
      createdDate: 'Jan 04, 2023 12:35 PM',
      updatedDate: 'Jul 29, 2024 01:25 AM',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const filteredTeam = initialTeam.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeam.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTeam = filteredTeam.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h1 className="text-2xl font-semibold">Our Team</h1>
          <Link
            to="/our-team/add"
            className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700 flex items-center gap-2"
          >
            <FaPlus /> Add New
          </Link>
        </div>

        <div className="bg-gray-50 p-4 shadow rounded-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
            <div className="flex gap-2">
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                Excel
              </button>
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                PDF
              </button>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span>Search:</span>
              <input
                type="search"
                placeholder="Search by name"
                className="border px-4 py-1 rounded w-full md:w-64"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page on search
                }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">#</th>
                  <th className="border px-3 py-2 text-left">Name</th>
                  <th className="border px-3 py-2 text-left">Designation</th>
                  <th className="border px-3 py-2 text-left">Social Links</th>
                  <th className="border px-3 py-2 text-left">Created Date</th>
                  <th className="border px-3 py-2 text-left">Updated Date</th>
                  <th className="border px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTeam.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  paginatedTeam.map((member, index) => (
                    <tr key={member.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border px-3 py-2">{startIndex + index + 1}</td>
                      <td className="border px-3 py-2">{member.name}</td>
                      <td className="border px-3 py-2">{member.designation}</td>
                      <td className="border px-3 py-2">
                        <div className="flex gap-2">
                          <a
                            href={member.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:scale-110"
                          >
                            <FaFacebookSquare />
                          </a>
                          <a
                            href={member.socialLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:scale-110"
                          >
                            <FaYoutube />
                          </a>
                          <a
                            href={member.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:scale-110"
                          >
                            <FaInstagramSquare />
                          </a>
                        </div>
                      </td>
                      <td className="border px-3 py-2">{member.createdDate}</td>
                      <td className="border px-3 py-2">{member.updatedDate}</td>
                      <td className="border px-3 py-2">
                        <div className="flex gap-2">
                          <Link
                            to={`/our-team/${member.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => alert('Delete action')}
                            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing{' '}
              {filteredTeam.length === 0
                ? '0 to 0'
                : `${startIndex + 1} to ${Math.min(endIndex, filteredTeam.length)}`}{' '}
              of {filteredTeam.length} entries
            </div>
            <div className="space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
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
