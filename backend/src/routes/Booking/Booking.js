import express from "express";
import { getAllBooking, sendBooking, deleteBooking, updateBooking, findBookingByName, findBookingByID } from "../../controller/Booking/bookingController.js";

const bookingRoute = express.Router();

bookingRoute.get("/getAll", getAllBooking);
bookingRoute.post("/bookingNow", sendBooking);
bookingRoute.delete("/delBooking/:idNum", deleteBooking);
bookingRoute.put("/updateBooking/:idNum", updateBooking);
bookingRoute.get("/findByName", findBookingByName);
bookingRoute.get("/findID/:idNum", findBookingByID);

export default bookingRoute;