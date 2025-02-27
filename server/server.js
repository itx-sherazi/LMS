/*-- express start --*/
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";    
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import dbconnect from "./config/dbconfig.js";
import authRoutes from "./Routes/UserRoutes.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 9000;




app.use(cookieParser()); // ✅ Cookie parser middleware
app.use(bodyParser.json());  // ✅ Body-parser ka middleware
app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials:true,
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:["Content-Type","Authorization","Origin","X-Requested-With","Accept"],
}))
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // ✅ URL Encoded Data Support
app.use((err, req, res, next) => {
    console.error("Something broke:", err.message);
    res.status(500).json({ success: false, message: "Something broke!" });
});


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.use("/auth",authRoutes);
  


/*-- start the server (start)  --*/
app.listen(port, ()=>{
    console.log(`express server is running on http://localhost:${port}/api/v1`);
});
/*-- start the server (end) --*/        


dbconnect();
/*-- DB Connection (end)  --*/