const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




//registering user
exports.createUser = async (req, res) => {
  try {
    const { Name, email, age , password} = req.body;

    const user = new User({ Name, email, age, password });
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!bcrypt) {
            return res.status(500).json({ message: "bcrypt module is missing" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//get Profile 
exports.getUserProfile = async (req, res) => {
    try {
        //looged-in user
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

