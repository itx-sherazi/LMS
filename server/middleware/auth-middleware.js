

import jwt from "jsonwebtoken";
const authenticate = (req, res, next) => {
    try {
        console.log("🔹 Cookies:", req.cookies);
        console.log("🔹 Headers:", req.headers);
        console.log("🔹 Body:", req.body);

        let token = req.cookies?.accessToken; // ✅ Cookies Se Token Lo

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1]; // ✅ Authorization Header Se Token Lo
            }
        }

        if (!token) {
            console.log("🔸 Token Missing");
            return res.status(401).json({ success: false, message: "Unauthorized, token missing" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Payload:", payload);

        req.user = payload;
        next();
    } catch (error) {
        console.error("🔴 Middleware Error:", error.message);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};






export default authenticate;

