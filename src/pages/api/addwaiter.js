import connDB from "../../../middleware/connDB";
import Waiter from "../../../model/Waiter";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { formData, id } = req.body;
      const newWaiter = new Waiter({
        name: formData.name,
        phoneNo: formData.phoneno,
        email: formData.email,
        restaurant_id: id,
        age: formData.age,
        image: formData.image,
        gender: formData.gender,
        profession: formData.profession,
      });

      const result = await newWaiter.save();
      if (result) {
        // Return a success response
        res.status(200).json({ success: true, data: result });
      } else {
        res
          .status(400)
          .json({ success: false, error: "could not save waiter" });
      }
    } else {
      res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error occurred while adding waiter" });
  }
};

export default connDB(handler);
