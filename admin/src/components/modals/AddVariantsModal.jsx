import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

export default function AddVariantsModal({ isOpen, onClose, onAddVariant }) {
    const [variantName, setVariantName] = useState('');
    const [variantOptions, setVariantOptions] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedName = variantName.trim();
        const optionsArray = variantOptions.split('|').map(opt => opt.trim()).filter(Boolean);

        if (!trimmedName || optionsArray.length === 0) return;

        onAddVariant({ name: trimmedName, options: optionsArray });

        onClose();
        setVariantName('');
        setVariantOptions('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white mx-4 rounded-xl shadow-lg w-full max-w-lg p-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h5 className="text-xl font-semibold">Add Variant</h5>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <MdClose size={20} />
                    </button>
                </div>

                <form className="mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Variant Name</label>
                        <input
                            type="text"
                            value={variantName}
                            onChange={(e) => setVariantName(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            placeholder="e.g. Color"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Variant Options</label>
                        <input
                            type="text"
                            value={variantOptions}
                            onChange={(e) => setVariantOptions(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            placeholder="e.g. Red|Blue|Green"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel</button>
                        <button type="button" onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
