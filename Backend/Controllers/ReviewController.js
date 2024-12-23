const Review = require("../Model/ReviewModel");

const getAllReviews = async (req, res, next) => {

    let Reviews;

    try {
        reviews = await Review.find() ; 
    }catch (err) {
        console.log(err);
    }

    if (!reviews){

        return res.status(404).json ({message:"Reviews not Found"})

    }
    return res.status(200).json({reviews});

};

//data insert 

const addReview = async (req, res) => {
    const { BookTitle, Author, Rating, ReviewText } = req.body;

    try {
        const review = new Review({
            BookTitle,
            Author,
            Rating,
            ReviewText,
        });

        await review.save(); // Save the review to the database

        res.status(201).json({ message: "Review added successfully!", review });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Failed to add review", error });
    }
};



// Update an existing review
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { BookTitle, Author, Rating, ReviewText } = req.body;

    try {
        const review = await Review.findByIdAndUpdate(
            id,
            { BookTitle, Author, Rating, ReviewText },
            { new: true } // Return the updated document
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review updated successfully!", review });
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ message: "Failed to update review", error });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Failed to delete review", error });
    }
};

module.exports = {
    getAllReviews,
    addReview,
    updateReview,
    deleteReview,
};