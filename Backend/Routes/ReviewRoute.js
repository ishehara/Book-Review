const express = require("express");
const router = express.Router();

// Import the Review model and controller
const ReviewModel = require("../Model/ReviewModel");
const ReviewController = require("../Controllers/ReviewController");

// Routes
router.get("/", ReviewController.getAllReviews); // Get all reviews
router.post("/", ReviewController.addReview); // Add a new review
router.put("/:id", ReviewController.updateReview); // Update an existing review
router.delete("/:id", ReviewController.deleteReview); // Delete a specific review

// Export the router
module.exports = router;
