import express from "express";
import bookingRoute from "./Booking/Booking.js";


const rootRoute = express.Router();

rootRoute.use("/tour", bookingRoute);

export default rootRoute;