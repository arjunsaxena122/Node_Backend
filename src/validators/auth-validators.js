import { z } from "zod";

// creating schema

export const zodSchema = z.object(
    {
        userName:z
        .string({required_error:"username is Required"})
        .min(1,{message:"username At least one character in the name"})
        .max(50,{message:"username can't be more than 50 characters"})
        .toLowerCase({message:"username must be in lower case"}),

        email:z
        .string({required_error:"Email is required"})
        .email({message:"Invalid Email address"})
        .toLowerCase({message:" Email must be in lower case"}),

        password:z
        .string({required_error:"Password must be required"})
        .min(8,{message:"Password at least 8 character to 16 character required"})
        .max(16)
    }
)