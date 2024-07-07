"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import rest from "../../assets/rest.jpg";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Menucard from "./Components/Menucard";
import axios from "axios";
import Loadingpage from "./Components/Loadingpage";

const TableRestaurantSection = () => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const fetchMenuByRestId = async () => {
      const restaurant_id = localStorage.getItem("restaurant_id");
      const { data } = await axios.post(`/api/fetchmenubyid`, {
        restaurant_id: "12345",
      });
      setMenus(data.data.food_items || []);
      setFilteredMenus(data.data.food_items || []);
    };
    fetchMenuByRestId();
  }, []);

  useEffect(() => {
    setFilteredMenus(
      menus.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, menus]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (menus.length <= 0) {
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
          onClick={handleOpen}
          className="ml-2 p-2 bg-[#440129] text-white rounded-md hover:bg-[#6f0143]"
        >
          <AddRoundedIcon /> Add Category
        </button>
      </div>
      <hr className="border border-[#440129]" />
      {filteredMenus.length > 0 && (
        <section>
          <Menucard
            menus={{ food_items: filteredMenus }}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </section>
      )}
    </div>
  );
};

export default TableRestaurantSection;
