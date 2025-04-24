import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProduct } from '../../hook/useProduct';
import { FaX } from 'react-icons/fa6';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { toast } from 'sonner';

export default function Products() {
  const { products, fetchAllProducts, deleteProduct, toggleProductStatus, toggleTodaySpecialStatus, } = useProduct();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const rowsPerPage = 5;

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };


  const confirmDelete = (catId) => {
    setDeleteId(catId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteId) {
      await deleteProduct(deleteId);
      await fetchAllProducts();
      toast.success("Product deleted successfully!");
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <CommonLayout>
      <DeleteConfirmationModal show={showDeleteModal} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirmed} />
      <div className="p-5 space-y-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className='flex gap-2'>
            <Link
              to='/admin/item/add'
              className="px-4 py-1.5 bg-black text-white rounded flex justify-center w-full md:w-fit items-center gap-2 hover:bg-neutral-700"
            >
              <FaPlus /> Add New
            </Link>
            <Link
              to=''
              className="px-4 py-1.5 bg-black text-white rounded flex justify-center w-full md:w-fit items-center gap-2 hover:bg-neutral-700"
            >
              Export <span className="bg-[#dc3545] text-xs px-2 py-[1px] text-white rounded-md">Addon</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="flex w-full gap-2">
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">Excel</button>
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">PDF</button>
            </div>
            <div className="flex items-center justify-between md:justify-end w-full gap-1">
              <span>Search:</span>
              <input
                type="search"
                placeholder="Search by product name"
                className="border w-full md:w-fit px-4 py-1 rounded-md outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Stock</th>
                  <th className="border px-4 py-2">Today special</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Created Date</th>
                  <th className="border px-4 py-2">Updated Date</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                    <td className="border px-4 py-2 w-48">
                      <div className="flex gap-1 items-start justify-start">
                        <img
                          src={product?.type === 'veg' ? '/img/veg.svg' : '/img/nonveg.svg'}
                          alt="Non-Veg"
                          className="w-3 h-3 mt-1"
                        />
                        <span>{product?.name}</span>
                      </div>
                      <span className="text-[10px] bg-green-500 w-fit px-2 my-1 rounded-md text-white flex items-center gap-1">
                        <FaEye size={14} /> {product.productView || 23}
                      </span>
                    </td>
                    <td className="border px-4 py-2">{product?.category?.name}</td>
                    <td className="border px-4 py-2">
                      {product.hasVariants ? (
                        <span className="bg-cyan-400 text-[10px] font-semibold whitespace-nowrap py-0.5 px-1.5 text-white rounded-md">
                          In Variants
                        </span>
                      ) : (
                        <>₹{product.sellingPrice}</>
                      )}
                    </td>
                    <td className="border px-4 py-2 space-x-1 whitespace-nowrap">
                      {product.hasVariants ? (
                        <span className="bg-cyan-400 text-[10px] font-semibold whitespace-nowrap py-0.5 px-1.5 text-white rounded-md">
                          In Variants
                        </span>
                      ) : (
                        <>
                          {Array.isArray(product.stock) && product.stock.length > 0 ? (
                            <div className='flex flex-col gap-1 w-fit'>
                              <span className="bg-green-500 text-[10px] px-1.5 text-white rounded-md">In Stock</span>
                              {product.stock[0].stockQty <= product.stock[0].lowQtyWarning && (
                                <span className="bg-yellow-500 text-[10px] px-1.5 text-white rounded-md">
                                  Low QTY
                                </span>
                              )}
                            </div>
                          ) : (
                            <span>-</span>
                          )}
                        </>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <span
                      onClick={() => toggleTodaySpecialStatus(product._id)}
                        className={`text-white w-fit p-1.5 rounded-md flex items-center justify-center cursor-pointer ${product.todaySpecial ? 'bg-green-500' : 'bg-red-500'}`}
                      >
                        {product.todaySpecial ? <FaCheck /> : <FaX />}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <span
                      onClick={() => toggleProductStatus(product._id)}
                        className={`text-white w-fit p-1.5 rounded-md flex items-center justify-center cursor-pointer ${product.status ? 'bg-green-500' : 'bg-red-500'}`}
                      >
                        {product.status ? <FaCheck /> : <FaX />}
                      </span>
                    </td>
                    <td className="border px-4 py-2 md:w-32">{new Date(product.createdAt).toLocaleString()}</td>
                    <td className="border px-4 py-2 md:w-32">{new Date(product.updatedAt).toLocaleString()}</td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col gap-2">
                        <Link to={`/admin/item/${product._id}`} className="bg-blue-500 w-fit hover:bg-blue-600 text-white p-1.5 rounded-md">
                          <FaEdit />
                        </Link>
                        <button onClick={() => confirmDelete(product._id)} className="bg-red-500 w-fit hover:bg-red-600 text-white p-1.5 rounded-md">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
            <div>
              Showing {products.length === 0 ? '0 to 0' : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredProducts.length)}`} of {filteredProducts.length} entries
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
