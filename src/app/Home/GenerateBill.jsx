import React, { useState } from "react";
import {
  Modal,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import FinalBill from "./FinalBill";

const GenerateBillModal = ({
  open,
  onClose,
  selectedOrder,
  restaurantinfo,
}) => {
  console.log(restaurantinfo);
  const [discountOption, setDiscountOption] = useState("no");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [finalBill, setFinalBill] = useState(null);
  const [discountdescription, setdiscountdescription] = useState("");
  const [openfinalBill, setopenfinalBill] = useState(false);

  const handleopenfinalbill = () => {
    setopenfinalBill(true);
  };
  const handleclosefinalbill = () => {
    setopenfinalBill(false);
    onClose();
  };

  const handleDiscountOptionChange = (event) => {
    setDiscountOption(event.target.value);
    if (event.target.value === "no") {
      setDiscountPercentage(0);
      setdiscountdescription("");
    }
  };

  const handleDiscountPercentageChange = (event) => {
    setDiscountPercentage(event.target.value);
  };
  const handleDiscountDescriptionChange = (event) => {
    setdiscountdescription(event.target.value);
  };

  const calculateFinalBill = () => {
    let total = selectedOrder.total_bill;
    if (discountOption === "yes" && discountPercentage > 0) {
      const discount = (total * discountPercentage) / 100;
      total -= discount;
    }
    setFinalBill(parseFloat(total).toFixed(2));
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="relative pb-8 my-auto bg-white max-h-[80%] overflow-y-auto no-scrollbar lg:w-[30%] w-full mx-auto mt-20 p-5 rounded-lg">
          <IconButton
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <CloseIcon />
          </IconButton>
          {!openfinalBill && (
            <>
              {selectedOrder && (
                <>
                  <h2 className="text-lg text-center font-semibold py-1">
                    Generate Final Bill
                  </h2>
                  <hr className="mb-3 border-[0.1px] border-black" />
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-start items-center space-x-1">
                      <span className="font-semibold w-52">
                        Apply Discount:
                      </span>
                      <Select
                        value={discountOption}
                        onChange={handleDiscountOptionChange}
                        className="w-full"
                      >
                        <MenuItem value="no">No</MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                      </Select>
                    </div>
                    {discountOption === "yes" && (
                      <div>
                        <div className="flex justify-start items-center space-x-1 mb-2">
                          <span className="font-semibold w-52">
                            Discount %:
                          </span>
                          <TextField
                            type="number"
                            value={discountPercentage}
                            placeholder="10"
                            onChange={handleDiscountPercentageChange}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-start items-center space-x-1">
                          <span className="font-semibold w-52">
                            Discount Description:
                          </span>
                          <TextField
                            type="textarea"
                            value={discountdescription}
                            placeholder="Student offer"
                            onChange={handleDiscountDescriptionChange}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                    <Button
                      variant="contained"
                      className="bg-[#440129] rounded-xl hover:scale-95 hover:bg-[#4b3141]"
                      onClick={calculateFinalBill}
                    >
                      Apply
                    </Button>
                    {finalBill !== null && (
                      <>
                        <div className="mt-4">
                          <div className="flex items-center justify-center mb-2">
                            <KeyboardDoubleArrowDown />
                          </div>
                          {/* <hr className="border-[1px] border-dashed border-black my-4" /> */}
                          {/* <div className="flex justify-between">
                    <span className="font-semibold">Final Amount: </span>
                    <span>₹ {finalBill}</span>
                  </div> */}
                          {selectedOrder && (
                            <>
                              <h2 className="text-lg text-center font-semibold py-1">
                                Order Details
                              </h2>
                              <hr className="mb-4 mt-1 border-[0.1px] border-black" />
                              <div className="flex flex-col space-y-2">
                                <div className="flex justify-start space-x-2">
                                  <span className="font-semibold">
                                    Table Number:
                                  </span>
                                  <span>{selectedOrder.table_number}</span>
                                </div>
                                <div className="flex justify-start space-x-2 ">
                                  <span className="font-semibold text-sm">
                                    Order ID:
                                  </span>
                                  <span className="text-sm">
                                    {selectedOrder.order_id}
                                  </span>
                                </div>
                                {/* <div className="flex justify-between">
                  <span className="font-semibold">Customer ID:</span>
                  <span>{selectedOrder.customer_id}</span>
                </div> */}
                              </div>
                              {/* <hr className="border-[1px] border-dotted border-black my-4"/> */}
                              {/* <div className="flex mt-3 justify-start space-x-4">
                <span className="font-semibold">Status:</span>
                <span>
                  <Chip
                    className={`${
                      selectedOrder.order_status === "new"
                        ? "bg-red-600"
                        : selectedOrder.order_status === "waitingforbill"
                        ? "bg-green-600"
                        : selectedOrder.order_status === "updated"
                        ? "bg-blue-600"
                        : selectedOrder.order_status === "served"
                        ? "bg-yellow-600"
                        : "bg-gray-500"
                    } text-white py-0 px-2`}
                    label={
                      selectedOrder.order_status === "new"
                        ? "New Order"
                        : selectedOrder.order_status === "waitingforbill"
                        ? "Waiting for bill"
                        : selectedOrder.order_status === "updated"
                        ? "Updated Order"
                        : selectedOrder.order_status === "served"
                        ? "Served"
                        : "No status"
                    }
                  />
                </span>
              </div> */}
                              <hr className="border-[1px] border-dotted border-black my-4" />
                              <div className="flex flex-col">
                                <span className="font-semibold mb-1">
                                  Order Items:
                                </span>
                                {/* {selectedOrder.order_items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.food_name}</span>
                      <span>{item.quantity}</span>
                    </div>
                  ))} */}
                                {selectedOrder.order_items.map(
                                  (orderitems, j) => (
                                    <span key={j}>
                                      {orderitems.items.map((item, k) => (
                                        <div
                                          key={k}
                                          className="flex justify-between"
                                        >
                                          <span>
                                            {item.food.name}&nbsp;&nbsp;x{" "}
                                            {item.quantity}
                                          </span>
                                          <span>
                                            ₹
                                            {parseFloat(item.quantity) *
                                              parseFloat(item.food.price)}
                                          </span>
                                        </div>
                                      ))}
                                    </span>
                                  )
                                )}
                              </div>

                              <hr className="border-[1px] border-dashed border-black my-4" />
                              <div className="flex justify-between">
                                <span className="font-semibold">Amount:</span>
                                <span>₹ {selectedOrder.initial_bill}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  GST and Service Tax:
                                </span>
                                <span>₹ {selectedOrder.tax}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Total Amount:
                                </span>
                                <span>₹ {selectedOrder.total_bill}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">Discount:</span>
                                <span>{discountPercentage}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Net Payable Amount:
                                </span>
                                <span>₹ {finalBill}</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mb-6 flex items-center justify-center">
                          <Button
                            variant="contained"
                            className="bg-[#440129] px-16 rounded-xl hover:scale-95 hover:bg-[#4b3141]"
                            onClick={() => {
                              calculateFinalBill();
                              handleopenfinalbill();
                            }}
                          >
                            Generate Bill
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          {openfinalBill && (<>
            <h2 className="text-lg text-center font-semibold py-1">
                   Final Bill
                  </h2>
                  <hr className="mb-3 border-[0.1px] border-black mx-auto w-20" />
            <FinalBill
              restaurantinfo={restaurantinfo}
              onCloseBill={handleclosefinalbill}
              onClose={onClose}
              selectedOrder={selectedOrder}
              discountPercentage={discountPercentage}
              discountdescription={discountdescription}
            />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default GenerateBillModal;
