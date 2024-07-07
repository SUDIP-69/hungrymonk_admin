// components/HelpPortal.js
"use client";
import React, { useState } from "react";
import {HelpSharp} from '@mui/icons-material'
import { Tooltip } from "@mui/material";

const HelpPortal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={handleToggle}
        className={`h-10 w-10 duration-300 fixed right-5 bottom-5 z-50 shadow-lg hover:scale-95 hover:bg-[#440129] hover:text-white bg-[#440129] text-white rounded-full cursor-pointer flex items-center justify-center`}
      >
        <Tooltip title='report issue'>
        <HelpSharp  /></Tooltip>
      </div>
      {isOpen && (
        <div className="fixed right-5 bottom-16 z-50 w-72 p-4 bg-[#fff9ea] border border-[#440129] rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-[#440129]">Help Portal</h2>
          <p className="text-sm text-[#440129] mt-2">
            How can we assist you? Please describe your issue or question.
          </p>
          <textarea
            rows="4"
            className="w-full mt-2 p-2 border rounded-md outline-none focus:ring-1 focus:ring-[#440129]"
            placeholder="Type your message here..."
          ></textarea>
          <button className="mt-2 p-2 bg-[#440129] text-sm text-white rounded-md hover:bg-[#6f0143]">
            Send Service Request
          </button>
        </div>
      )}
    </div>
  );
};

export default HelpPortal;
