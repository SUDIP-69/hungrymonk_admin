import React, { useState, useEffect, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip, TextField, Button, MenuItem } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";

const MenuItemForm = ({
  handleclose,
  foodItem,
  restaurantname,
  restaurantid,
}) => {
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    image: foodItem?.image || "",
    imageUrl: "",
    name: foodItem?.name || "",
    description: foodItem?.description || "",
    price: foodItem?.price || "",
    category: foodItem?.category || "",
    subcategory: foodItem?.subcategory || "",
    status: foodItem?.available_status ? "available" : "unavailable",
  });

  useEffect(() => {
    if (foodItem) {
      if (foodItem._id) {
        setUpdate(true);
      }
      setFormData({
        image: foodItem.image || "",
        imageUrl: "",
        name: foodItem.name || "",
        description: foodItem.description || "",
        price: foodItem.price || "",
        category: foodItem.category || "",
        subcategory: foodItem.subcategory || "",
        status: foodItem?.available_status ? "available" : "unavailable",
      });
    }
  }, [foodItem]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  }, []);

  const handleImageUrlChange = useCallback((e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      imageUrl: value,
      image: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      restaurant_id: restaurantid,
      restaurantname: restaurantname,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      subcategory: formData.subcategory,
      image: formData.image,
      available_status: formData.status === "available",
    };

    console.log("Payload before sending:", payload);

    try {
      if (update) {
        const { data } = await axios.post("/api/updateoneitem", {
          ...payload,
          fid: foodItem._id,
        });
        if (data.success) {
          console.log("Food item updated successfully:", data.data);
          handleclose();
          window.location.reload();
        } else {
          console.error("Failed to update food item:", data.message);
        }
      } else {
        const { data } = await axios.post("/api/createnewcategoryitem", payload);
        if (data.success) {
          console.log("Food item added successfully:", data.data);
          handleclose();
          window.location.reload();
        } else {
          console.error("Failed to add food item:", data.message);
        }
      }
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  return (
    <div
      className="fixed z-50 h-screen w-screen top-0 left-0 flex justify-center items-center bg-black/20 backdrop-blur-sm"
      aria-labelledby="form-title"
    >
      <div className="bg-[#fff9ea] max-h-[90%] overflow-y-auto p-6 rounded-md shadow-md lg:max-w-[50vw] mx-auto relative">
        <Tooltip title="close">
          <span
            onClick={handleclose}
            className="absolute top-2 z-50 right-2 cursor-pointer"
            aria-label="close form"
          >
            <CloseIcon />
          </span>
        </Tooltip>
        <form onSubmit={handleSubmit} aria-labelledby="form-title">
          <h2 id="form-title" className="sr-only">Menu Item Form</h2>
          <div className="mb-4">
            {formData.image && (
              <img
                src={formData.image}
                alt="Selected"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
            <label className="block text-[#440129] font-semibold mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="upload-file"
              aria-label="upload file"
            />
            <div className="flex items-center">
              <label htmlFor="upload-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Upload
                </Button>
              </label>
              <TextField
                label="or Enter Image URL"
                variant="outlined"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleImageUrlChange}
                className="ml-4"
                aria-label="image url"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Name
              </label>
              <TextField
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                aria-label="name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Availability Status
              </label>
              <TextField
                select
                name="status"
                value={formData.status}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                aria-label="availability status"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </TextField>
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Category
              </label>
              <TextField
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                aria-label="category"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Sub Category
              </label>
              <TextField
                select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                aria-label="subcategory"
              >
                <option value="">Select Subcategory</option>
                <option value="Veg">Veg</option>
                <option value="Non Veg">Non Veg</option>
              </TextField>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[#440129] font-semibold mb-2">
              Description
            </label>
            <TextField
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              aria-label="description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#440129] font-semibold mb-2">
              Price
            </label>
            <TextField
              name="price"
              value={formData.price}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              aria-label="price"
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="button"
              onClick={() =>
                setFormData({
                  image: "",
                  imageUrl: "",
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                  subcategory: "",
                  status: "available",
                })
              }
              variant="contained"
              className="mr-2 bg-[#440129]"
              aria-label="reset form"
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" color="success" aria-label="save">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemForm;
