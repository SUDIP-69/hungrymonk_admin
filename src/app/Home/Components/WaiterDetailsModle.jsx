import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WaiterDetailModal = ({ waiter, handleClose }) => {
  return (
    <Modal open={true} onClose={handleClose} aria-labelledby="waiter-details-modal" aria-describedby="waiter-details-description">
      <Box className="bg-white rounded-md shadow-md p-6 max-w-lg mx-auto my-20 relative">
        <Button onClick={handleClose} className="absolute top-2 right-2">
          <CloseIcon />
        </Button>
        <Typography variant="h5" component="h2" className="mb-4">
          Waiter Details
        </Typography>
        <div className="flex items-center mb-4">
          <img src={waiter.image} alt="profilepic" className="h-24 w-24 rounded-full border-2 border-[#4410298d] mr-4" />
          <div>
            <Typography variant="h6" component="h3" className="text-gray-800">
              {waiter.name}
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {waiter.profession}
            </Typography>
          </div>
        </div>
        <Typography variant="body1" className="mb-2">
          <strong>Email:</strong> {waiter.email}
        </Typography>
        <Typography variant="body1" className="mb-2">
          <strong>Phone Number:</strong> {waiter.phoneNo}
        </Typography>
        <Typography variant="body1">
          <strong>Age:</strong> {waiter.age}
        </Typography>
      </Box>
    </Modal>
  );
};

export default WaiterDetailModal;
