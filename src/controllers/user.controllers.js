import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"


export const registerData = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body
    const userData = await User.findOne({
        $or:[{email},{userName}]
    });

    if (userData) {
        return res.json(
            new ApiResponse(200, " email and username already registered ")
        )
    }

    await User.create({
        userName,
        email,
        password
    })

    return res.json(
        new ApiResponse(200, "Registered Successfully")
    )

})

export const loginData = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const userData = await User.findOne({ email })
    if (!userData) {
        return res.json(
            new ApiError(400, "user does't exist ")
        )
    }

    const isPasswordCorrect = await userData.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.json(
            new ApiResponse(400, "Invalid password")
        )
    }

    const generateToken = await userData.generateToken()
    console.log(generateToken)
    res.cookie("accessToken", generateToken, {
        httpOnly: true,
        secure: true,
        expire: '1h'
    })

    return res.json(
        new ApiResponse(200, "Login Successfully")
    )

})

export const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        console.log("logout error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
