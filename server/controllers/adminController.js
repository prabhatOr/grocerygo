import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// GET all customers (Admin only)
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({ role: "customer" }).select("-password");
      res.status(200).json(users);
    } catch (error) {
      console.error("Get All Users Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

// GET single user by ID (Admin only)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Get User By ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD a new user (Admin only)
export const createUser = async (req, res) => {
  const { name, email, mobile, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: role || "customer",
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE user details (Admin only)
export const updateUser = async (req, res) => {
  const { name, email, mobile, role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle customer Status
export const toggleCustomerStatus = async (req, res) => {
    try {
        const customer = await User.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: "customer not found" });

        customer.status = !customer.status;
        await customer.save();

        res.status(200).json({ message: "customer status updated", status: customer.status });
    } catch (err) {
        console.error("Toggle Status Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE a user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
