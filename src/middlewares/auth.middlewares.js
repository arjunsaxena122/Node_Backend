import jwt from "jsonwebtoken"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";


export const verifyToken = asyncHandler(async (req, res,next) => {

    const token =  req.cookies.accessToken || req.headers("Authorization").replace("Bearer ","");
    // const token = req.headers("Authorization").replace("Bearer ","")
    console.log(token)
    const decodeToken = jwt.verify(token,process.env.TOKEN_JWT_SECRET_KEY)
    console.log(decodeToken)

    if(!decodeToken){
        res.json(
            new ApiError(400,"Token Doesn't Verified")
        )
    }
    
    req.token = token
    req.user= decodeToken

    console.log(req.user,"req.user")
    console.log(req.token,"req.token")
    console.log(req.user._id)

    // res.json(
    //     new ApiResponse(200, "Token is verified")
    // )
    console.log("token is verified")

    next()
}
)