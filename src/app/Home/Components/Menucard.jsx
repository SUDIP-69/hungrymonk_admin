import React, { useState } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit"; // Import MUI icon
import foodimg from "../../../assets/roti.jpg";
import MenuItemForm from "./EditMenuItemModal";

const MenuCardsmall = ({ foodItem, open, handleopen, handleclose }) => {
  return (
    <div className="border-2 border-[#966729] p-2 rounded-lg shadow-md w-64">
      {open && <MenuItemForm handleclose={handleclose} />}
      <div className="relative h-32 w-full rounded-md overflow-hidden mb-4">
        <Image
          src={foodItem.image || foodimg}
          className="object-cover object-bottom"
          alt={foodItem.name??'alt tag'}
          objectFit="cover"
          width={1000}
          height={1000}
        />
      </div>
      <h3 className="text-sm font-semibold text-[#441029]">{foodItem.name}</h3>
      <p className="text-[0.65rem] text-zinc-400 mb-2">
        {foodItem.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-[#44109]">
          ₹{foodItem.price}
        </span>
        <button
          onClick={handleopen}
          id="editbutton"
          className="bg-[#966729] editbutton h-7 w-7 rounded-full text-white"
        >
          <EditIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

function Menucard({ open, handleopen, handleclose }) {
  const foodItems = [
    {
      _id: "6686ba9d9a42acd7f6f8a911",
      restaurant_id: "12345",
      restaurant_name: "Taste of China",
      food_items: [
        {
          _id: "6686ba9c9a42acd7f6f8a90d",
          name: "Spicy Chicken Wings",
          description: "1 plate contains 6 pcs.",
          price: "240",
          category: "Starters",
          subcategory: "nonveg",
          image: "https://example.com/images/spicy-chicken-wings.jpg",
          available_status: true,
          createdAt: "2024-07-04T15:07:08.136Z",
          updatedAt: "2024-07-04T15:07:08.136Z",
          __v: 0,
        },
        {
          _id: "6686bb539a42acd7f6f8a913",
          name: "Chicken Pizza",
          description: "Medium",
          quantity: "1",
          price: "200",
          category: "Bread",
          subcategory: "nonveg",
          image: "https://example.com/images/spicy-chicken-wings.jpg",
          available_status: true,
          createdAt: "2024-07-04T15:10:11.795Z",
          updatedAt: "2024-07-04T15:10:11.795Z",
          __v: 0,
        },
        {
          _id: "6686bb749a42acd7f6f8a917",
          name: "Veg Pizza",
          description: "Medium",
          quantity: "1",
          price: "180",
          category: "Bread",
          subcategory: "veg",
          image: "https://example.com/images/spicy-chicken-wings.jpg",
          available_status: true,
          createdAt: "2024-07-04T15:10:44.565Z",
          updatedAt: "2024-07-04T15:10:44.565Z",
          __v: 0,
        },
        {
          _id: "6686bb8e9a42acd7f6f8a91b",
          name: "Roti",
          description: "1 piece only",
          quantity: "1",
          price: "15",
          category: "Tandoor",
          subcategory: "veg",
          image: "https://example.com/images/spicy-chicken-wings.jpg",
          available_status: true,
          createdAt: "2024-07-04T15:11:10.369Z",
          updatedAt: "2024-07-04T15:11:10.369Z",
          __v: 0,
        },
      ],
      createdAt: "2024-07-04T15:07:09.412Z",
      updatedAt: "2024-07-04T15:11:10.465Z",
      __v: 3,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex mb-2 items-center justify-start space-x-2">
        <h1 className="text-[#440129] text-xl font-semibold">Menu</h1>
        <div
          onClick={handleopen}
          className="bg-[#440129] px-1.5 py-1 text-xs rounded-xl cursor-pointer text-[#fff9ea]"
        >
          Edit <EditIcon className="size-3" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {foodItems[0].food_items?.map((foodItem) => {
          return(
          <MenuCardsmall
            key={foodItem._id}
            foodItem={foodItem}
            open={open}
            handleopen={handleopen}
            handleclose={handleclose}
          />
        )})}
      </div>
    </div>
  );
}

export default Menucard;
