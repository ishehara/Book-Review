import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importing axios for making API requests
import './review.css';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reviews'); // API endpoint to get reviews
        setReviews(response.data.reviews); // Set reviews to the state
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error("Error fetching reviews:", err); // Log the error for better debugging
      }
    };

    fetchReviews();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const filledStars = '★'.repeat(rating); // Filled stars
    const emptyStars = '☆'.repeat(5 - rating); // Empty stars
    return (
      <span className="stars">
        {filledStars}
        {emptyStars}
      </span>
    );
  };

  return (
    <div className="review-container">
      <h1>All Reviews</h1>
      {error && <p>{error}</p>}
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review._id} className="review-item">
              <h3>{review.BookTitle}</h3>
              <p><strong>Author:</strong> {review.Author}</p>
              <p>
                <strong>Rating:</strong> {renderStars(review.Rating)}
              </p>
              <p>{review.ReviewText}</p>
              <p><em>Reviewed on: {new Date(review.Date).toLocaleDateString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Review;
