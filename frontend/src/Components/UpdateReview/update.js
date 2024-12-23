// UpdateReviewForm.js
import React from 'react';
import '../Review/review.css'

function UpdateReviewForm({ modalData, handleInputChange, saveChanges, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Review</h2>
        <label>
          Book Title:
          <input
            type="text"
            name="BookTitle"
            value={modalData.BookTitle}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="Author"
            value={modalData.Author}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="Rating"
            value={modalData.Rating}
            onChange={handleInputChange}
            min="1"
            max="5"
          />
        </label>
        <label>
          Review Text:
          <textarea
            name="ReviewText"
            value={modalData.ReviewText}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={saveChanges}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default UpdateReviewForm;
