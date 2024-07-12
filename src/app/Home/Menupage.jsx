"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import rest from "../../assets/rest.jpg";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Menucard from "./Components/Menucard";
import axios from "axios";
import Loadingpage from "./Components/Loadingpage";
import MenuItemForm from "./Components/EditMenuItemModal";
import { toast, Toaster } from "react-hot-toast";

const TableRestaurantSection = ({ restaurantinfo }) => {
  const { restaurantname, restaurantid } = restaurantinfo;
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [update, setUpdate] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedFoodItem(null);
  };

  const handleOpen = (foodItem, update = false) => {
    if (update) setUpdate(true);
    setSelectedFoodItem(foodItem);
    setOpen(true);
  };

  useEffect(() => {
    const fetchMenuByRestId = async () => {
      const restaurant_id = localStorage.getItem("restaurant_id");
      try {
        const { data } = await axios.post(`/api/fetchmenubyid`, {
          restaurant_id: restaurant_id,
        });
        if (data.success) {
          setMenus(data?.data?.food_items);
          setFilteredMenus(data?.data?.food_items || []);
        }
      } catch (error) {
        toast.error("Failed to fetch menu items");
      } finally {
        setLoader(false);
      }
    };
    fetchMenuByRestId();
  }, []);

  useEffect(() => {
    setFilteredMenus(
      menus?.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          item?.category.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          item?.subcategory
            ?.toLowerCase()
            .includes(searchQuery?.toLowerCase()) ||
          item?.price?.toLowerCase().includes(searchQuery?.toLowerCase())
      )
    );
  }, [searchQuery, menus]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loader) {
    return <Loadingpage />;
  }

  return (
    <div className="w-full h-full lg:ml-2 overflow-x-hidden mt-4">
      <Toaster />
      <Image
        src={rest}
        width={1000}
        height={1000}
        alt="restaurant image"
        className="w-full h-48 object-cover object-right-bottom z-0 rounded-xl"
      />
      <div className="flex flex-col md:flex-row justify-between items-center relative p-4">
        <div className="relative w-full md:max-w-md mb-4 md:mb-0">
          <SearchRoundedIcon className="absolute left-2 top-2.5 text-gray-400" />
          <input
            type="text"
            name="menu"
            id="menu"
            placeholder="Enter a dish"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:ring focus:ring-[#440129] focus:border-[#440129] text-gray-800"
          />
        </div>
        <button
          onClick={() => handleOpen(null)}
          className="w-full md:w-auto p-2 bg-[#440129] text-white rounded-md hover:bg-[#6f0143] flex items-center justify-center space-x-2"
        >
          <AddRoundedIcon />
          <span>Add Menu Item</span>
        </button>
      </div>
      <hr className="border border-[#440129]" />
      {menus.length === 0 && (
        <p className="text-center text-xl mt-10 px-4">
          You have not added any menu items yet.
          <br />
          <br />
          Please add items to enjoy our table-to-kitchen service.
        </p>
      )}
      {filteredMenus?.length > 0 && (
        <section className="p-4">
          <Menucard
            menus={{ food_items: filteredMenus }}
            open={open}
            selectedFoodItem={selectedFoodItem}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </section>
      )}
      {open && (
        <MenuItemForm
          update={update}
          restaurantid={restaurantid}
          restaurantname={restaurantname}
          foodItem={selectedFoodItem}
          handleclose={handleClose}
        />
      )}
    </div>
  );
};

export default TableRestaurantSection;
