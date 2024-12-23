import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importing axios for making API requests
import './review.css';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null); // Track the review being edited
  const [updatedText, setUpdatedText] = useState(''); // Track the updated review text
  const [filterRating, setFilterRating] = useState(0); // Track the rating filter
  const [sortOrder, setSortOrder] = useState('desc'); // Track the sort order (asc/desc)

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

  // Function to delete a review
  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`); // API endpoint to delete a review
      setReviews(reviews.filter((review) => review._id !== id)); // Remove the deleted review from state
    } catch (err) {
      console.error("Error deleting review:", err);
      setError('Failed to delete the review');
    }
  };

  // Function to update a review
  const updateReview = async (id) => {
    try {
      await axios.put(`http://localhost:5000/reviews/${id}`, { ReviewText: updatedText }); // API endpoint to update a review
      setReviews(
        reviews.map((review) =>
          review._id === id ? { ...review, ReviewText: updatedText } : review
        )
      );
      setEditingReview(null); // Exit edit mode
      setUpdatedText('');
    } catch (err) {
      console.error("Error updating review:", err);
      setError('Failed to update the review');
    }
  };

  // Function to filter reviews by rating
  const filteredReviews = reviews.filter((review) =>
    filterRating === 0 ? true : review.Rating === filterRating
  );

  // Function to sort reviews by date
  const sortedReviews = [...filteredReviews].sort((a, b) =>
    sortOrder === 'asc'
      ? new Date(a.Date) - new Date(b.Date)
      : new Date(b.Date) - new Date(a.Date)
  );

  return (
    <div className="review-container">
      <h1>All Reviews</h1>

      {/* Error Message */}
      {error && <p>{error}</p>}

      {/* Filtering and Sorting Options */}
      <div className="review-filters">
        <label>
          Filter by Rating:
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(String(e.target.value))}
          >
            <option value={0}>All</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </label>
        <label>
          Sort by Date:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </label>
      </div>

      {/* Reviews List */}
      {sortedReviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul className="review-list">
          {sortedReviews.map((review) => (
            <li key={review._id} className="review-item">
              <h3>{review.BookTitle}</h3>
              <p><strong>Author:</strong> {review.Author}</p>
              <p>
                <strong>Rating:</strong> {renderStars(review.Rating)}
              </p>
              {editingReview === review._id ? (
                <div>
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    placeholder="Update your review"
                  />
                  <button onClick={() => updateReview(review._id)}>Save</button>
                  <button onClick={() => setEditingReview(null)}>Cancel</button>
                </div>
              ) : (
                <p>{review.ReviewText}</p>
              )}
              <p><em>Reviewed on: {new Date(review.Date).toLocaleDateString()}</em></p>
              <div className="review-actions">
                <button onClick={() => {
                  setEditingReview(review._id);
                  setUpdatedText(review.ReviewText);
                }}>
                  Update
                </button>
                <button onClick={() => deleteReview(review._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Review;
