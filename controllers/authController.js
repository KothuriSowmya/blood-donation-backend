const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --------------------------------------------------------
// ✅ REGISTER USER
// POST /api/auth/register
// --------------------------------------------------------
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;  // ✅ FIXED (you missed this earlier)

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// --------------------------------------------------------
// ✅ LOGIN USER
// POST /api/auth/login
// --------------------------------------------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// --------------------------------------------------------
// ✅ UPDATE USER PROFILE (optional)
// PUT /api/auth/update
// --------------------------------------------------------
exports.updateUserProfile = async (req, res) => {
  const { phone, location } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    if (phone) user.phone = phone;
    if (location) user.location = location;

    await user.save();

    res.json({
      msg: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
