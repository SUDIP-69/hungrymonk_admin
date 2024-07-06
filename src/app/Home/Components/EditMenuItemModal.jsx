import React, { useState } from 'react';

const MenuItemForm = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
    category: '',
    subcategory: '',
    status: 'available',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className='fixed z-50 h-screen w-screen top-0 left-0 flex justify-center items-center bg-black/20 backdrop-blur-sm'>
    <div className="bg-[#fff9ea] p-6 rounded-md shadow-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[#440129] font-semibold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-[#440129]"
          />
          {formData.image && <img src={formData.image} alt="Selected" className="mt-2 w-32 h-32 object-cover rounded-md" />}
        </div>
        <div className="mb-4">
          <label className="block text-[#440129] font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#440129] font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-[#440129] font-semibold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#440129] font-semibold mb-2">Subcategory</label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#440129] font-semibold mb-2">Availability Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setFormData({ image: '', name: '', description: '', category: '', subcategory: '', status: 'available' })}
            className="bg-[#440129] text-white py-2 px-4 rounded-md mr-2"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-[#440129] text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default MenuItemForm;
