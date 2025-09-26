import express from "express";        // Express framework for building APIs
import dotenv from "dotenv";  
import { initDB } from "./config/db.js";        // Load environment variables from .env file
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js"
// Load environment variables from .env
dotenv.config(); 

// Initialize Express app
const app = express();

if(process.env.NODE_ENV==="production") job.start();

// Middleware :
// Middleware is a function that runs between the request and response
// Here, it parses incoming JSON requests and makes the data available in req.body
app.use(rateLimiter);
app.use(express.json());

// Server Port :
const PORT = process.env.PORT || 5001; // Use PORT from .env or default to 5001

app.get("/api/health",(req, res)=>{
    res.status(200).json({status:"ok"});
    res.send("Its working");
});

app.use("/api/transactions", transactionsRoute);

// Start Server :
// Initialize the database, then start the server
initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    });
});
