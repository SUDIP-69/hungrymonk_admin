import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import rest from "../../assets/rest.jpg";
import { Chip, Tooltip, Modal, CircularProgress } from "@mui/material";
import { Add, FilterAlt, RemoveRedEye } from "@mui/icons-material";
import axios from "axios";

function StickyHeadTable() {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);

  const fetchOrders = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/fetchallordersbyid`, {
        restaurant_id: id,
      });
      setData(data.data);
      setFilteredData(data.data); // Initialize filteredData with all data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const id = localStorage.getItem("restaurant_id");
    fetchOrders(id);
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterData(event.target.value);
  };

  // Filter data based on search term
  const filterData = (term) => {
    if (!term) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (order) =>
          order.table_number.toLowerCase().includes(term.toLowerCase()) ||
          order.order_id.toLowerCase().includes(term.toLowerCase()) ||
          order.customer_id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setPage(0); // Reset to the first page when filtering
  };

  // Open modal and set selected order
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section className=" ">
      <Image
        src={rest}
        width={1000}
        height={1000}
        alt="restaurant image"
        className="w-full h-40 mb-4 object-cover object-top z-0 rounded-xl"
      />

      <div className="mx-auto max-w-screen border-2">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  className="w-full md:w-auto flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 focus:ring-1 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 border border-gray-300"
                  type="button"
                >
                  <Add />
                  Actions
                </button>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    id="filterDropdownButton"
                    data-dropdown-toggle="filterDropdown"
                    className="w-full md:w-auto flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 focus:ring-1 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 border border-gray-300"
                    type="button"
                  >
                    <FilterAlt />
                    Filter
                  </button>

                  <div
                    id="filterDropdown"
                    className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Category
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      <li className="flex items-center">
                        <input
                          id="apple"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor="apple"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Food
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="fitbit"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor="fitbit"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Beverage
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="dell"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor="dell"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Dessert
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Table Number</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Ordered At</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Order Items</TableCell>
                  <TableCell>Total Bill</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  (rowsPerPage > 0
                    ? filteredData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredData
                  ).map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                        onClick={() => handleViewOrderDetails(row)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>{row.table_number}</TableCell>
                        <TableCell>{row.order_id}</TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.order_status}
                            color={
                              row.order_status === "waitingforbill"
                                ? "success"
                                : row.order_status === "new" ||
                                  row.order_status === "updated"
                                ? "warning"
                                : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip
                            title="View Order Details"
                            arrow
                            placement="top"
                          >
                            <RemoveRedEye />
                          </Tooltip>
                        </TableCell>
                        <TableCell>{row.total_bill}</TableCell>
                        <TableCell>
                          <Chip
                            label="generate Bill"
                            className="bg-[#440129] text-[#fff9ea]"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>

      {/* Modal for viewing order details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="bg-white w-96 mx-auto mt-20 p-5 rounded-lg">
          {selectedOrder && (
            <>
              <h2 className="text-lg font-semibold mb-3">
                Order Details - {selectedOrder.order_id}
              </h2>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Table Number:</span>
                  <span>{selectedOrder.table_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Order ID:</span>
                  <span>{selectedOrder.order_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Customer ID:</span>
                  <span>{selectedOrder.customer_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span>
                    <Chip
                      label={selectedOrder.status}
                      color={
                        selectedOrder.status === "Completed"
                          ? "success"
                          : selectedOrder.status === "Pending"
                          ? "warning"
                          : "default"
                      }
                    />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Order Items:</span>
                  {selectedOrder.order_items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.food_name}</span>
                      <span>{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Bill:</span>
                  <span>{selectedOrder.total_bill}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </section>
  );
}

export default function PersonSearchSection() {
  return (
    <>
      <div className="p-4 relative min-h-[95vh]">
        <StickyHeadTable />
      </div>
    </>
  );
}
