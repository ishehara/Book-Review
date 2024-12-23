const express = require ("express");
const router = express.Router();

// insert Model

const ReviewModel= require ("../Model/ReviewModel");

// insert controller

const ReviewController = require ("../Controllers/ReviewController");


// Routes
router.get("/", ReviewController.getAllReviews); // Get all reviews
router.post("/", ReviewController.addReview); // Add a new review
router.put("/:id", ReviewController.updateReview); // Update an existing review
router.delete("/:id", ReviewController.deleteReview); // Delete a specific review

// export

module.exports = router;