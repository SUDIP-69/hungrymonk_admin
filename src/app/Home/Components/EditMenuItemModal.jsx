import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip, TextField, Button } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";


const MenuItemForm = ({
  handleclose,
  foodItem,
  restaurantname,
  restaurantid,
}) => {
  const [update, setupdate] = useState(false)
  console.log(foodItem);
  const [formData, setFormData] = useState({
    image: foodItem?.image || "",
    imageUrl: "", 
    name: foodItem?.name || "",
    description: foodItem?.description || "",
    price: foodItem?.price || "",
    category: foodItem?.category || "",
    subcategory: foodItem?.subcategory || "",
    status:
      !foodItem?.status || foodItem == null
        ? ""
        : foodItem?.available_status
        ? "available"
        : "unavailable",
  });

  useEffect(() => {
    if (foodItem) {
      if(foodItem._id){
        setupdate(true);
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

  const handleImageUrlChange = (e) => {
    setFormData({
      ...formData,
      imageUrl: e.target.value,
      image: e.target.value,
    });
  };

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

    console.log("Payload before sending:", payload); // Debugging line

    try {
      if (update) {
        const { data } = await axios.post(
          "/api/updateoneitem",
          { ...payload, fid: foodItem._id }
        );
        if (data.success) {
          console.log("Food item updated successfully:", data.data);
          handleclose();
          window.location.reload();
        } else {
          console.error("Failed to update food item:", data.message);
        }
      } else {
        const { data } = await axios.post(
          "/api/createnewcategoryitem",
          payload
        );
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
    <div className="fixed z-50 h-screen w-screen top-0 left-0 flex justify-center overflow-x-auto items-center bg-black/20 backdrop-blur-sm">
      <div className="bg-[#fff9ea] max-h-[90%] overflow-y-auto p-6 rounded-md shadow-md lg:max-w-[50vw] mx-auto relative">
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
            />
            <div className="flex items-center">
              <label htmlFor="upload-file">
                <Button
                  variant="contained"
                  className="p-4"
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
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" color="success">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemForm;
