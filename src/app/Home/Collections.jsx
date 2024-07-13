"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
} from "@mui/material";
import Image from "next/image";
import rest from "../../assets/rest.jpg";
import axios from "axios";

function Collections({ restaurantinfo }) {
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [tipSearchQuery, setTipSearchQuery] = useState("");
  const [orderPage, setOrderPage] = useState(0);
  const [tipPage, setTipPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orders, setOrders] = useState([]);
  const [tips, setTips] = useState([]);
  const [totalRev, setTotalRev] = useState(0);
  const [totalTip, setTotalTip] = useState(0);
  const [orderSort, setOrderSort] = useState("daily");
  const [tipSort, setTipSort] = useState("daily");
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingTips, setLoadingTips] = useState(true);

  useEffect(() => {
    fetchAllOrders();
    fetchAllTips();
  }, [orderSort, tipSort]);

  const fetchAllOrders = async () => {
    setLoadingOrders(true);
    const { data } = await axios.post("/api/fetchallbills", {
      restaurant_id: restaurantinfo?.restaurantid,
      sort: orderSort,
    });
    if (data.success) {
      setTotalRev(data.total);
      setOrders(data.data);
    }
    setLoadingOrders(false);
  };

  const fetchAllTips = async () => {
    setLoadingTips(true);
    const { data } = await axios.post("/api/fetchalltip", {
      restaurant_id: restaurantinfo?.restaurantid,
      sort: tipSort,
    });
    if (data.success) {
      setTotalTip(data.total);
      setTips(data.data);
    }
    setLoadingTips(false);
  };

  const handleOrderChangePage = (event, newPage) => {
    setOrderPage(newPage);
  };

  const handleTipChangePage = (event, newPage) => {
    setTipPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setOrderPage(0);
    setTipPage(0);
  };

  const handleOrderSortChange = (event) => {
    setOrderSort(event.target.value);
  };

  const handleTipSortChange = (event) => {
    setTipSort(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.total_bill.toLowerCase().includes(orderSearchQuery.toLowerCase()) || order.order_id.toLowerCase().includes(orderSearchQuery.toLowerCase())
  );

  const filteredTips = tips.filter(
    (tip) =>
      tip.amount.toLowerCase().includes(tipSearchQuery.toLowerCase()) ||
      tip.waiter.toLowerCase().includes(tipSearchQuery.toLowerCase()) ||
      tip.review.toLowerCase().includes(tipSearchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="relative w-full h-64">
        <Image
          src={rest}
          layout="fill"
          objectFit="cover"
          alt="background image"
          className="w-full h-full object-cover rounded-b-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row justify-around items-center text-white p-4">
          <div className="flex flex-col items-center rounded-full bg-black/20 h-20 w-64 p-2">
            <Typography variant="h6" className="font-semibold">Today's Revenue</Typography>
            <Typography variant="h5">₹{totalRev}</Typography>
          </div>
          <div className="flex flex-col items-center rounded-full bg-black/20 h-20 w-64 p-2">
            <Typography variant="h6" className="font-semibold">Total Tip Amount</Typography>
            <Typography variant="h5">₹{totalTip}</Typography>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <Typography variant="h5" className="text-white bg-[#441029] p-2 rounded-t-md text-center">
          Past Orders
        </Typography>
        <Paper className="p-4 rounded-b-md">
          <div className="flex justify-between items-center mb-4">
            <TextField
              label="Search Orders"
              variant="outlined"
              value={orderSearchQuery}
              onChange={(e) => setOrderSearchQuery(e.target.value)}
              size="small"
            />
            <FormControl variant="outlined" size="small">
              <InputLabel>Sort</InputLabel>
              <Select value={orderSort} onChange={handleOrderSortChange} label="Sort">
                <MenuItem value="daily">Today</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="past7days">Past 7 Days</MenuItem>
                <MenuItem value="past30days">Past 30 Days</MenuItem>
              </Select>
            </FormControl>
          </div>
          {loadingOrders ? (
            <Box className="flex justify-center items-center py-4">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredOrders
                      .slice(
                        orderPage * rowsPerPage,
                        orderPage * rowsPerPage + rowsPerPage
                      )
                      .map((order) => (
                        <TableRow key={order._id}>
                          <TableCell component="th" scope="row">
                            {order.order_id}
                          </TableCell>
                          <TableCell align="right">₹ {order.total_bill}</TableCell>
                          <TableCell align="right">{new Date(order.createdAt).toDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={orderPage}
                onPageChange={handleOrderChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </div>

      <div className="mt-8 px-4">
        <Typography variant="h5" className="text-white bg-[#441029] p-2 rounded-t-md text-center">
          Tips
        </Typography>
        <Paper className="p-4 rounded-b-md">
          <div className="flex justify-between items-center mb-4">
            <TextField
              label="Search Tips"
              variant="outlined"
              value={tipSearchQuery}
              onChange={(e) => setTipSearchQuery(e.target.value)}
              size="small"
            />
            <FormControl variant="outlined" size="small">
              <InputLabel>Sort</InputLabel>
              <Select value={tipSort} onChange={handleTipSortChange} label="Sort">
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="past7days">Past 7 Days</MenuItem>
                <MenuItem value="past30days">Past 30 Days</MenuItem>
              </Select>
            </FormControl>
          </div>
          {loadingTips ? (
            <Box className="flex justify-center items-center py-4">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tip Amount</TableCell>
                      <TableCell align="">Waiter Name</TableCell>
                      <TableCell align="">Review</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTips
                      .slice(
                        tipPage * rowsPerPage,
                        tipPage * rowsPerPage + rowsPerPage
                      )
                      .map((tip, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            ₹ {parseFloat(tip.amount)/100}
                          </TableCell>
                          <TableCell align="">
                            {tip.employees.length > 0 ? (
                              tip.employees.map((item, i) => (
                                <span key={i}>{item};&nbsp;</span>
                              ))
                            ) : (
                              <span>For the team</span>
                            )}
                          </TableCell>
                          <TableCell align="">{tip.review || "NA"}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={filteredTips.length}
                rowsPerPage={rowsPerPage}
                page={tipPage}
                onPageChange={handleTipChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </div>
    </div>
  );
}

export default Collections;
