

import jwt from "jsonwebtoken";
const authenticate = (req, res, next) => {
    try {
       

        let token = req.cookies?.accessToken; 

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1]; 
            }
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized, token missing" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;
        next();
    } catch (error) {
        console.error(" Middleware Error:", error.message);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};






export default authenticate;

