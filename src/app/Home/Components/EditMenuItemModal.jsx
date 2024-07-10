import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

const MenuItemForm = ({ handleclose, foodItem }) => {
  console.log(!foodItem?.status);
  const [formData, setFormData] = useState({
    image: foodItem?.image || "",
    name: foodItem?.name || "",
    description: foodItem?.description || "",
    category: foodItem?.category || "",
    subcategory: foodItem?.subcategory || "",
    status: (!foodItem?.status||foodItem==null)?'': foodItem?.available_status ? 'available' : 'unavailable',
  });

  useEffect(() => {
    if (foodItem) {
      setFormData({
        image: foodItem.image || "",
        name: foodItem.name || "",
        description: foodItem.description || "",
        category: foodItem.category || "",
        subcategory: foodItem.subcategory || "",
        status: foodItem?.available_status==true ? 'available' : 'unavailable',
      });
    }
  }, [foodItem]);

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
    console.log("Form Data:", formData);
  };

  return (
    <div className="fixed z-50 h-screen w-screen top-0 left-0 flex justify-center overflow-x-auto items-center bg-black/20 backdrop-blur-sm">
      <div className="bg-[#fff9ea] p-6 rounded-md shadow-md lg:max-w-[50vw] mx-auto relative">
        <Tooltip title="close">
          <span
            onClick={handleclose}
            className="absolute top-2 z-50 right-2 cursor-pointer"
          >
            <CloseIcon />
          </span>
        </Tooltip>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#440129] font-semibold mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-[#440129]"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Selected"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Availability Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="p-2 py-[9px] rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              >
                <option value="available">Choose Availability</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Sub Category
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="p-2 py-[9px] rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              >
                <option value="">select subcategory</option>
                <option value="Veg">Veg</option>
                <option value="Non Veg">Non Veg</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[#440129] font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  image: "",
                  name: "",
                  description: "",
                  category: "",
                  subcategory: "",
                  status: "available",
                })
              }
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
