import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const refreshTokenFunction = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });
    return refreshToken;
  } catch (error) {
    console.log(error);
    res.json(new ApiError(404, "Unauthorized User"));
  }
};

export const registerData = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const userData = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (userData) {
    return res.json(
      new ApiResponse(200, " email and username already registered ")
    );
  }

  await User.create({
    userName,
    email,
    password,
  });

  return res.json(new ApiResponse(200, "Registered Successfully"));
});

export const loginData = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  if (!userData) {
    return res.json(new ApiError(400, "user does't exist "));
  }

  const isPasswordCorrect = await userData.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.json(new ApiResponse(400, "Invalid password"));
  }

  const generateToken = await userData.generateToken();
  const refreshToken = await refreshTokenFunction(userData._id);

  res
    .cookie("accessToken", generateToken, {
      httpOnly: true,
      secure: true,
      expire: "1h",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expire: "2h",
    });

  return res.json(new ApiResponse(200, "Login Successfully"));
});

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("logout error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const isMatchRefreshToken = asyncHandler( async (req, res) => {
  try {
    const MatchRefreshToken = req.cookies.refreshToken || req.body.refreshToken; // This is for mobile user

    if (!MatchRefreshToken) {
      throw new ApiError(404, "Unauthorized request");
    }

    const decodeRefreshToken = jwt.verify(
      MatchRefreshToken,
      process.env.REFRESH_TOKEN_JWT_SECRET_KEY
    );

    const user = await User.findById(decodeRefreshToken?._id);
    console.log(user);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (MatchRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const generateToken = await user.generateToken();
    const refreshToken = await refreshTokenFunction(user?._id);

    res
      .cookie("accessToken", generateToken, {
        httpOnly: true,
        secure: true,
        expire: "1h",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        expire: "2h",
      });

    return res.json(new ApiResponse(200, "Generate Refresh Token Successfully"));


  } 
  catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
  }
});
