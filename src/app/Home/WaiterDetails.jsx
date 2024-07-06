"use client";
import Image from "next/image";
import React, { useState } from "react";
import rest from "../../assets/rest.jpg";
import logo from "../../assets/logo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Menucard from "./Components/Menucard";
import MenuItemForm from "./Components/EditMenuItemModal";
import RowTable from "../Table/Components/RowTable";

const WaiterDetails = () => {
  const [open, setopen] = useState(false);
  const handleclose = () => setopen(false);
  const handleopen = () => setopen(true);

  return (
    <div className="w-full h-full  relative">
      <div className="flex justify-between items-center relative p-4">
        <SearchRoundedIcon className="absolute left-6" />

        <input
          type="text"
          name="menu"
          id="menu"
          placeholder="Enter a dish"
          className="p-2 pl-10 rounded-md border-[1px] border-[#440129] bg-transparent outline-none focus:ring-[1px] focus:ring-[#440129] focus:border-[#440129]"
        />
        <button
          onClick={handleopen}
          className="ml-2 p-2 bg-[#440129] text-white rounded-md hover:bg-[#6f0143]"
        >
          <AddRoundedIcon /> Add Waiter
        </button>
      </div>
      <hr className="border border-[#440129] " />
      
      <section className="mt-5">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                      </th>                       
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Phone No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Profession
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Image
                      </th>
                    </tr>
                  </thead>
                  <RowTable />
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center absolute bottom-0 left-0 w-full">
        <span>powered by </span>
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
    </div>
  );
};

export default WaiterDetails;
