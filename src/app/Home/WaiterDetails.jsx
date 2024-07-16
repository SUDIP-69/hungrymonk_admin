"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import rest from "../../assets/rest.jpg";
import logo from "../../assets/logo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import RowTable from "../Table/Components/RowTable";

import AddWaiterModalForm from "./Components/AddWaiterModal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const WaiterDetails = ({ restaurantinfo }) => {
  const [open, setopen] = useState(false);
  const handleclose = () => setopen(false);
  const handleopen = () => setopen(true);
  const [waitertable, setwaitertable] = useState([]);
  const [nowaiters, setnowaiters] = useState(false);
  const [failedtofetch, setfailedtofetch] = useState(false);

  const fetchwaiters = async () => {
    const res = await axios.post("/api/getwaiters", {
      restaurant_id: restaurantinfo.restaurantid,
    });
    //console.log(res.data);
    if (res.data.success) {
      if (res.data.data.length > 0) {
        setwaitertable(res.data.data);
      } else {
        setnowaiters(true);
      }
    } else {
      setfailedtofetch(true);
    }
  };
  useEffect(() => {
    fetchwaiters();
  }, [open == false]);

  const handleDelete = async (waiterId) => {
    const res = await axios.post("/api/removewaiter", { waiterId });
    //console.log(res.data);
    if (res.data.success) {
      toast.success("Waiter removed successfully");
      fetchwaiters();
    } else {
      toast.error("Failed to remove waiter");
    }
    window.location.reload();
  };

  return (
    <div className="w-full h-full  relative  lg:ml-0 ml-16 ">
      <Toaster />
      <div className="flex justify-between items-center relative p-4">
        <SearchRoundedIcon className="absolute left-6" />

        <input
          type="text"
          name="menu"
          id="menu"
          placeholder="Search for a waiter"
          className="p-2 pl-10 rounded-md border-[1px] border-[#440129] bg-transparent outline-none focus:ring-[1px] focus:ring-[#440129] focus:border-[#440129]"
        />
        <hr className="border border-[#440129] " />
        <section>
          <div className="p-4 ">
            <button
              onClick={handleopen}
              className="ml-2 p-2 bg-[#440129] text-white rounded-md hover:bg-[#6f0143]"
            >
              <AddRoundedIcon /> Add Waiter
            </button>
            {open && (
              <AddWaiterModalForm
                handleclose={handleclose}
                restaurantinfo={restaurantinfo}
              />
            )}
          </div>
        </section>
      </div>
      <hr className="border border-[#440129] " />
      {nowaiters && <div className="flex items-center justify-center mt-48 text-2xl text-center">You have not enrolled any waiter. <br/>Click on + Add Waiter to add new waiter or chef.</div>}
      {failedtofetch && <div className="flex items-center justify-center mt-48 text-2xl text-center">Failed to fetch waiter details. Try again later.</div>}
      {!nowaiters && (
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
                          Image
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
                      </tr>
                    </thead>
                    <RowTable
                      waiterdata={waitertable}
                      onDelete={handleDelete}
                    />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WaiterDetails;
