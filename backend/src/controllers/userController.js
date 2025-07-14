import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import crypto from "crypto";
import { Meeting } from "../models/meetingModel.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid password",
      });
    }
    let token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();
    return res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    if (username == "" || password == "" || name == "") {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Name, username, and password are required",
      });
    }

    const existibngUser = await User.findOne({ username });
    if (existibngUser) {
      return res.status(httpStatus.FOUND).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      username,
      password: hashedPassword,
    });

    await user.save();
    return res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

const getUserHistory = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ token });
    const meeting = await Meeting.find({ userId: user.username });
    res.json(meeting);
  } catch (error) {
    res.json("something went Wrong");
  }
};

const addHistory = async (req, res) => {
  const { token, meeting_code } = req.body;
  try {
    const user = await User.findOne({ token });
    const newMeeting = new Meeting({
      userId: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();
    res.status(httpStatus.CREATED).json({ message: "Added to history" });
  } catch (error) {}
};

export { login, register, getUserHistory, addHistory };
