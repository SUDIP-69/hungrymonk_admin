"use client";
import Image from "next/image";
import React, { useState } from "react";
import rest from "../../assets/rest.jpg";
import logo from "../../assets/logo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Menucard from "./Components/Waitercard";
import MenuItemForm from "./Components/EditMenuItemModal";
import RowTable from "../Table/Components/RowTable";

const WaiterDetails = () => {
  const [open, setopen] = useState(false);
  const handleclose = () => setopen(false);
  const handleopen = () => setopen(true);

  return (
    <div className="w-full h-full  relative  lg:ml-0 ml-16 ">
      <div className="flex justify-between items-center relative p-4">
        <SearchRoundedIcon className="absolute left-6" />

        <input
          type="text"
          name="menu"
          id="menu"
          placeholder="Enter a dish"
          className="p-2 pl-10 rounded-md border-[1px] border-[#440129] bg-transparent outline-none focus:ring-[1px] focus:ring-[#440129] focus:border-[#440129]"
        />
        <hr className="border border-[#440129] " />
        <section>
          <Menucard
            open={open}
            handleopen={handleopen}
            handleclose={handleclose}
          />
        </section>
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
                      ></th>
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

      
    </div>
  );
};

export default WaiterDetails;
