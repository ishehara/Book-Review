import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <h1>Welcome to BookMarks !</h1>
        <p>Discover, share, and explore amazing reviews from our community.</p>
        <Link to="/all-reviews">
          <button className="onboarding-button">Explore Reviews</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
