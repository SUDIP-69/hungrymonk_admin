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

const TableRestaurantSection = ({ restaurantinfo }) => {
  const { restaurantname, restaurantid } = restaurantinfo;
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [update, setupdate] = useState(false)

  const handleClose = () => {
    setOpen(false);
    setSelectedFoodItem(null);
  };

  const handleOpen = (foodItem,update=false) => {
    if(update) setupdate(true);
    setSelectedFoodItem(foodItem);
    setOpen(true);
  };
  const [loader, setloader] = useState(true);
  useEffect(() => {
    // console.log(restaurantname, restaurantid);
    const fetchMenuByRestId = async () => {
      const restaurant_id = localStorage.getItem("restaurant_id");
      const { data } = await axios.post(`/api/fetchmenubyid`, {
        restaurant_id: restaurant_id,
      });
      if (data.success) {
        setMenus(data?.data?.food_items);
      }
      setloader(false);
      setFilteredMenus(data?.data?.food_items || []);
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
    <div className="w-full h-full lg:ml-2 ml-16 mt-8">
      <Image
        src={rest}
        width={1000}
        height={1000}
        alt="restaurant image"
        className="w-full h-48 object-cover object-right-bottom z-0 rounded-xl"
      />
      <div className="flex justify-between items-center relative p-4">
        <SearchRoundedIcon className="absolute left-6" />

        <input
          type="text"
          name="menu"
          id="menu"
          placeholder="Enter a dish"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 pl-10 rounded-md border-[1px] border-[#440129] bg-transparent outline-none focus:ring-[1px] focus:ring-[#440129] focus:border-[#440129]"
        />
        <button
          onClick={() => handleOpen(null)}
          className="ml-2 p-2 bg-[#440129] text-white rounded-md hover:bg-[#6f0143]"
        >
          <AddRoundedIcon /> Add Category
        </button>
      </div>
      <hr className="border border-[#440129]" />
      {menus.length == 0 && (
        <p className="text-center text-2xl mt-10">
          You have not added any menu items till now.
          <br />
          <br />
          Please add items and enjoy our table-to-kitchen service.
        </p>
      )}
      {filteredMenus?.length > 0 && (
        <section>
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
        <MenuItemForm update={update} restaurantid={restaurantid} restaurantname={restaurantname} foodItem={selectedFoodItem} handleclose={handleClose} />
      )}
    </div>
  );
};

export default TableRestaurantSection;
