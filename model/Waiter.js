import mongoose from "mongoose";

const waiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    restaurant_id: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Waiter = mongoose.models.Waiter || mongoose.model("Waiter", waiterSchema);
export default Waiter;
