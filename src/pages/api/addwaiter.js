import connDB from "../../../middleware/connDB";
import Waiter_credentials from "../../../model/Waiter_credentials";
import bcrypt from "bcrypt";

// Function to generate a random 8-character password
const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { formData, id } = req.body;
      const password = generatePassword();
      console.log(password);
      const passwordHashed = await bcrypt.hash(password, 10);

      const newWaiter = new Waiter_credentials({
        username: formData.name,
        phoneNo: formData.phoneno,
        email: formData.email,
        restaurant_id: id,
        age: formData.age,
        image: formData.image,
        gender: formData.gender,
        profession: formData.profession,
        password: passwordHashed,
      });

      const result = await newWaiter.save();
      if (result) {
        res.status(200).json({ success: true, data: result });
      } else {
        res.status(400).json({ success: false, error: "Could not save waiter" });
      }
    } else {
      res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Error occurred while adding waiter" });
  }
};

export default connDB(handler);
