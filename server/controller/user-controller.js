import bcrypt from "bcrypt";
import User from "../model/user-schema.js";

const SALT_ROUNDS = 10;

export const userSignup = async (request, response) => {
    try {
        const { username, password, ...rest } = request.body;

        // Check if username already exists
        const exist = await User.findOne({ username });
        if (exist) {
            return response.status(401).json({
                success: false,
                message: "Username already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create new user with hashed password
        const newUser = new User({
            ...rest,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        console.log(`User ${username} signed up successfully`); // Optional logging

        return response.status(200).json({
            success: true,
            data: newUser,
        });
    } catch (error) {
        console.error("Error during signup:", error.message);
        return response.status(500).json({
            success: false,
            message: `Signup failed: ${error.message}`,
        });
    }
};

export const userLogin = async (request, response) => {
    try {
        const { username, password } = request.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        console.log(`User ${username} logged in successfully`); // Optional logging

        return response.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        return response.status(500).json({
            success: false,
            message: `Login failed: ${error.message}`,
        });
    }
};