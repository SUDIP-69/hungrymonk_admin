import { Chip, Modal } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditOrderModal from "./EditOrder";

function ViewOrder({ open, onClose, selectedOrder ,restaurantinfo}) {
  const [selectedEditOrder, setselectedEditOrder] = React.useState(null);
  const [editorder, seteditorder] = React.useState(false);

  const handleOpenEditOrder = (order) => {
    //console.log(order);
    setselectedEditOrder(order);
    seteditorder(true);
  };

  const handleCloseEditOrder = () => {
    setselectedEditOrder(null);
    seteditorder(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative  bg-white max-h-[80%] overflow-y-auto w-[80%] md:w-[50%] lg:w-[32%] mx-auto mt-24 p-5 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 border-[1px] rounded-full border-[#440129] p-1 hover:bg-[#440129] hover:text-gray-200"
        >
          <CloseIcon fontSize="medium" />
        </button>
        {!editorder && (
          <div>
            {selectedOrder && (
              <>
                <h2 className="text-lg text-center font-semibold py-1">
                  Order Details
                </h2>
                <hr className="mb-4 mt-1 border-[0.1px] border-black" />
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-start space-x-2">
                    <span className="font-semibold">Table Number:</span>
                    <span>{selectedOrder.table_number}</span>
                  </div>
                  <div className="flex justify-start space-x-2 ">
                    <span className="font-semibold text-sm">Order ID:</span>
                    <span className="text-sm">{selectedOrder.order_id}</span>
                  </div>
                  {/* <div className="flex justify-between">
                  <span className="font-semibold">Customer ID:</span>
                  <span>{selectedOrder.customer_id}</span>
                </div> */}
                </div>
                {/* <hr className="border-[1px] border-dotted border-black my-4"/> */}
                <div className="flex mt-3 justify-start space-x-4">
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
                          : selectedOrder.order_status === "billgenerated"
                          ? "bg-gray-900"
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
                          : selectedOrder.order_status === "billgenerated"
                          ? "Bill Generated"
                          : "No status"
                      }
                    />
                  </span>
                </div>
                <hr className="border-[1px] border-dotted border-black my-4" />
                <div className="flex flex-col">
                  <span className="font-semibold mb-1">Order Items:</span>
                  {/* {selectedOrder.order_items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.food_name}</span>
                      <span>{item.quantity}</span>
                    </div>
                  ))} */}
                  {selectedOrder.order_items.map((orderitems, j) => (
                    <span key={j}>
                      {orderitems.items.map((item, k) => (
                        <div key={k} className="flex justify-between">
                          <span>
                            {item.food.name}&nbsp;&nbsp;x {item.quantity}
                          </span>
                          <span>
                            ₹
                            {parseFloat(item.quantity) *
                              parseFloat(item.food.price)}
                          </span>
                        </div>
                      ))}
                    </span>
                  ))}
                </div>

                <hr className="border-[1px] border-dashed border-black my-4" />
                <div className="flex justify-between">
                  <span className="font-semibold">Amount:</span>
                  <span>₹ {selectedOrder.initial_bill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">GST and Service Tax:</span>
                  <span>₹ {selectedOrder.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Amount:</span>
                  <span>₹ {selectedOrder.total_bill}</span>
                </div>
              </>
            )}
            <div className="mt-6 flex items-center justify-center">
              <div
                className="py-2 px-8 bg-[#441029] hover:bg-[#7a1e4b] hover:scale-95 cursor-pointer text-white rounded-lg"
                onClick={() => {
                  handleOpenEditOrder(selectedOrder);
                }}
              >
                Edit Order
              </div>
            </div>
          </div>
        )}
        {editorder && (
          <EditOrderModal
            onClose={handleCloseEditOrder}
            closeafterupdate={onClose}
            open={editorder}
            order={selectedEditOrder}
            restaurantinfo={restaurantinfo}
          />
        )}
      </div>
    </Modal>
  );
}

export default ViewOrder;
