import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: "String",
            unique: true,
        },
        email: {
            type: "String",
            unique: true,

        },
        password: {
            type: "String",
        },
        // token:{
        //     type: "String",
        // }
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();

})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
    return jwt.sign({
        _id: this._id,
        userName: this.userName,
        email: this.email,
        password: this.password
    },
        process.env.TOKEN_JWT_SECRET_KEY,
    {
            expiresIn: "1h",
    },
    )
}


export const User = mongoose.model("User", userSchema)