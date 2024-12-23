import React, { useState } from 'react';
import axios from 'axios';
import './addReview.css';
import Nav from '../Nav/nav';

function AddReview() {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = {
        BookTitle: bookTitle,
        Author: author,
        Rating: rating,
        ReviewText: reviewText,
        Date: new Date().toISOString(),
      };
      await axios.post('http://localhost:5000/reviews', newReview);
      setSuccessMessage('Review added successfully!');
      setErrorMessage('');
      // Clear form fields
      setBookTitle('');
      setAuthor('');
      setRating(0);
      setReviewText('');
    } catch (err) {
      console.error('Error adding review:', err);
      setErrorMessage('Failed to add review. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <Nav />
      <div className="add-review-container">
        <h1>Add a Review</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="add-review-form">
          <label>
            Book Title:
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
          <label>
            Rating:
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </label>
          <label>
            Review:
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              required
            />
          </label>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default AddReview;
