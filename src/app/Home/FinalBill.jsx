"use client";
import {
  DownloadForOffline,
  Print,
  SimCardDownload,
} from "@mui/icons-material";
import { Chip, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function FinalBill({
  restaurantinfo,
  onCloseBill,
  selectedOrder,
  discountPercentage,
  discountdescription,
}) {
  //console.log(selectedOrder);
  const [customerphone_no, setcustomerphone_no] = useState("")
  const date = new Date(selectedOrder.createdAt);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  //console.log(restaurantinfo);
  const hasFetchedBill = useRef(false);
  const [orderbill, setorderbill] = useState();
  const [qrcode, setqrcode] = useState("");
  const fetchtipqr = async () => {
    const res = await axios.post("/api/getqrcodefortip", {
      url: `${process.env.NEXT_PUBLIC_QR_URL}/id=${restaurantinfo.restaurant_id}`,
    });
    //console.log(res.data);
    setqrcode(res.data.qrCodeDataURL);
  };

  const fetchgeneratedbill = async (
    order_id,
    cgst,
    sgst,
    discountamount,
    discountpercent,
    discountdescription,
    total_amount
  ) => {
    try {
      const res = await axios.post("/api/generatebill", {
        order_id,
        cgst,
        sgst,
        discountamount,
        discountpercent,
        discountdescription,
        total_amount,
      });
      console.log(res);
      setorderbill(res.data.data);
      toast.success("Mark the order as paid once the customer has paid.");
    } catch (e) {
      toast.error("Failed to generate bill");
    }
  };

  useEffect(() => {
    if (hasFetchedBill.current) return;
    fetchtipqr();
    let initial = selectedOrder.initial_bill;
    let discountamount = (
      parseFloat(discountPercentage) *
      parseFloat(initial) *
      0.01
    ).toFixed(2);
    let final = initial - discountamount;
    const cgst = (
      0.01 *
      (parseFloat(restaurantinfo.cgst) * parseFloat(final))
    ).toFixed(2);
    const sgst = (
      0.01 *
      (parseFloat(restaurantinfo.sgst) * parseFloat(final))
    ).toFixed(2);
    let total_amount = (
      parseFloat(final) +
      parseFloat(cgst) +
      parseFloat(sgst)
    ).toFixed(2);
    fetchgeneratedbill(
      selectedOrder.order_id,
      cgst,
      sgst,
      discountamount,
      discountPercentage,
      discountdescription,
      total_amount
    );
    hasFetchedBill.current = true;
  }, []);

  const sendbilltophone=()=>{
    toast.success("Bill sent to phone")
  }
  const handleDownload = async () => {
    // const invoice = document.getElementById('invoice');
    // const canvas = await html2canvas(invoice, {
    //   scale: 2, // Increase the scale for better resolution
    //   useCORS: true,
    //   windowWidth: invoice.scrollWidth,
    //   windowHeight: invoice.scrollHeight,
    // });

    // const imgData = canvas.toDataURL('image/png');
    // const pdf = new jsPDF('p', 'mm', 'a4');
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = pdf.internal.pageSize.getHeight();
    // const imgProps = pdf.getImageProperties(imgData);
    // const imgWidth = imgProps.width;
    // const imgHeight = imgProps.height;

    // const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    // const width = imgWidth * ratio;
    // const height = imgHeight * ratio;

    // pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    const invoice = document.getElementById("invoice");
    const canvas = await html2canvas(invoice, {
      scale: 2, // Increase the scale for better resolution
      useCORS: true,
      windowWidth: invoice.scrollWidth,
      windowHeight: invoice.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.7); // Reduce quality to 70%
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const width = imgWidth * ratio;
    const height = imgHeight * ratio;

    pdf.addImage(imgData, "JPEG", 0, 0, width, height);
    pdf.save(`invoice-${selectedOrder.order_id}.pdf`);
  };
  const handlePrint = () => {
    const invoice = document.getElementById("invoice").outerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write("<html><head><title>Invoice</title>");
    doc.write(
      "<style>@page { size: auto; margin: 10mm; } body { font-family: Arial, sans-serif; }</style>"
    );
    doc.write("</head><body>");
    doc.write(invoice);
    doc.write("</body></html>");
    doc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  if (!orderbill)
    return (
      <div className="flex items-center justify-center">
        <Toaster />
        <CircularProgress />
      </div>
    );

  return (
    <>
      {orderbill && (
        <div>
          <div
            id="invoice"
            className=" bg-white -mx-3 py-8 mt-8 p-4 shadow-md border-2 border-gray-300"
          >
            <Toaster />
            <Typography variant="h6" align="center" className="font-bold mb-4">
              {restaurantinfo.restaurantname.toUpperCase()}
            </Typography>
            <Typography variant="body1" align="center" className="mb-4">
              {restaurantinfo.restaurantaddress.toUpperCase()}
              <br />
              PHONE NO. : {restaurantinfo.restaurantphoneNo}
            </Typography>
            <div className="my-4 flex items-center justify-center text-center">
              <span className="w-1/4 h-[1px] border-[1px] border-dashed border-black"></span>
              <span>&nbsp;TAX INVOICE&nbsp;</span>
              <span className="w-1/4 h-[1px] border-[1px] border-dashed border-black"></span>
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body2">
                Bill No.: {orderbill?.bill_no}
              </Typography>
              <Typography variant="body2">
                Date: {day}/{month}/{year}
              </Typography>
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body2">
                Table No: {selectedOrder.table_number}
              </Typography>
              <Typography variant="body2">
                Time: {hours}:{minutes}:{seconds}
              </Typography>
            </div>
            <div className="border-t-2 mt-4 border-b-2 py-2 mb-4 border-dotted border-gray-400">
              <div className="flex justify-start mb-2 space-x-4 border-b-2 pb-1 border-dotted border-gray-400">
                <Typography variant="body2" className="w-[50%]">
                  Description
                </Typography>
                <Typography variant="body2" className="w-[15%] pl-[0.1rem]">
                  Qty.
                </Typography>
                <Typography variant="body2" className="w-[15%] pl-[0.2rem]">
                  Price
                </Typography>
                <Typography variant="body2" className="w-[15%] pl-[0.3rem]">
                  Value
                </Typography>
              </div>

              {/* Repeat for each item */}
              {selectedOrder.order_items.map((orderitems, j) => (
                <span key={j}>
                  {orderitems.items.map((item, k) => (
                    <div key={k} className="flex justify-start mt-1 space-x-4">
                      <Typography variant="body2" className="w-[50%]">
                        {item.food.name.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" className="w-[15%]">
                        {parseFloat(item.quantity).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" className="w-[15%]">
                        {parseFloat(item.food.price).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" className="w-[15%]">
                        {(
                          parseFloat(item.quantity) *
                          parseFloat(item.food.price)
                        ).toFixed(2)}
                      </Typography>
                    </div>
                  ))}
                </span>
              ))}
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body2" className="">
                SUBTOTAL:
              </Typography>
              <Typography variant="body2" className="">
                {orderbill.initial_bill}
              </Typography>
            </div>
            {parseFloat(orderbill.discountamount) > 0.0 && (
              <div className="flex justify-between mb-2">
                <Typography variant="body2">
                  Discount @ {orderbill.discountpercent}%
                </Typography>
                <Typography variant="body2">
                  {orderbill.discountamount}
                </Typography>
              </div>
            )}
            <div className="flex justify-between mb-0">
              <Typography variant="body2">
                CGST @ {restaurantinfo.cgst}%
              </Typography>
              <Typography variant="body2">{orderbill.cgstamount}</Typography>
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body2">
                SGST @ {restaurantinfo.sgst}%
              </Typography>
              <Typography variant="body2">{orderbill.sgstamount}</Typography>
            </div>

            <div className="flex border-t-2 border-b-2 py-2 border-gray-300 justify-between mb-2">
              <Typography variant="body1" className="font-bold text-xl">
                TOTAL
              </Typography>
              <Typography variant="body1" className="font-bold text-xl">
                ₹ {orderbill.total_bill}
              </Typography>
            </div>
            <Typography variant="body2" align="center" className="mt-4">
              GSTIN No.: {restaurantinfo.gstin}
            </Typography>
            <div className="flex mt-6 items-center  mx-auto justify-center">
              <Image
                src={qrcode}
                alt="qr code"
                width={100}
                height={100}
                className="w-32 h-32 border-2 p-0 border-black"
              />
            </div>
            <Typography variant="body2" align="center" className="mt-2">
              Like our service? Scan to treat our team.
            </Typography>
            <Typography variant="body2" align="center" className="mt-4">
              Thank you! Please visit us again.
              <br />
              Have a nice day!
            </Typography>
          </div>
          <div className="items-center rounded-xl border-2 border-gray-300 px-6 py-3 mt-6 space-y-2">
              <label
                htmlFor="phoneNumber"
                className="text-gray-700 font-semibold"
              >
                Send bill to customer:
              </label>
            <div className="flex items-center space-x-6 justify-center">
              <input
                type="text"
                id="phoneNumber"
                value={customerphone_no}
                onChange={(e)=>{setcustomerphone_no(e.target.value)}}
                placeholder="Enter phone number"
                className="border border-gray-300 rounded-lg w-48 px-4 py-2 focus:outline-none "
              />
            
           
              <button
              onClick={sendbilltophone}
              disabled={customerphone_no.length!=10} className="bg-[#441029] hover:bg-[#81214f] disabled:bg-gray-300 disabled:cursor-not-allowed hover:scale-95 text-white px-6 py-2 rounded-lg ">
                Send
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-6">
            <button
              onClick={handleDownload}
              className="text-lg px-4 bg-[#441029] hover:bg-[#81214f] hover:scale-95 text-center py-2 rounded-xl text-white"
            >
              <DownloadForOffline />
              &nbsp;Download{" "}
            </button>
            <button
              onClick={handlePrint}
              className="text-lg px-10 bg-[#441029] hover:bg-[#81214f] hover:scale-95 py-2 rounded-xl text-center text-white"
            >
              <Print />
              &nbsp;Print
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FinalBill;
