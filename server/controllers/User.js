import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { username, useremail, password, role } = req.body;

        // Validate required fields
        if (!username?.trim() || !useremail?.trim() || !password?.trim()) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate username
        if (typeof username !== 'string' || username.trim() === '') {
            return res.status(400).json({ message: 'Username cannot be empty' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(useremail)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user already exists (no null check needed)
        const existingUser = await User.findOne({
            $or: [{ useremail }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username: username.trim(),
            useremail: useremail.trim(),
            password: hashedPassword,
            role: role || 'user' // Default to 'user' if role is not provided
        });

        // Save the user to the database
        await newUser.save();

        // Return success response
        return res.status(201).json({ success:true, message: 'User registered successfully' });

    } catch (error) {
        console.error('❌ Error:', error); // Log the full error for debugging

        // Handle duplicate key error with specific message
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0]; // Extracts which field caused the error
            return res.status(400).json({ message: `${field} already exists` });
        }

        // Handle other errors
        res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req, res) => {
    const { useremail, password } = req.body;
    
    try {
        const checkUser = await User.findOne({ useremail });

        if (!checkUser) {
            console.log("User not found in database.");
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
        console.log("Password Match:", isPasswordMatch); 

        if (!isPasswordMatch) {
            console.log("Incorrect Password");
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        const accessToken = jwt.sign({
            _id: checkUser._id,
            role: checkUser.role,
            username: checkUser.username,
            useremail: checkUser.useremail
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
       
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,  // ✅ localhost pe false rakho
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        


        return res.json({
            success: true, 
            message: "User logged in successfully",
            data: {  
                user: {
                    _id: checkUser._id,
                    username: checkUser.username,
                    useremail: checkUser.useremail,
                    role: checkUser.role
                }
            }
        });
        
        

    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: false,   
            sameSite: 'Lax'
        });
    
        console.log("Logout API hit - Cookie removed");
        res.json({ success: true, message: "Logged out successfully" })
        
    } catch (error) {

        console.error("Error in Logout:", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}

export const checkAuth = async (req, res) => {
    try {
            res.json({ success: true, user: req.user });
        
    } catch (error) {
        console.error("Error in Check Auth:", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}