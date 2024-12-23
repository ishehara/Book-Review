import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Nav from './Components/Nav/nav';
import Home from './Components/Home/home';
import AddReview from './Components/AddReview/addReview';
import AllReviews from './Components/Review/review';
import UpdateReview from './Components/UpdateReview/update'

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/all-reviews" element={<AllReviews />} />
        <Route path="/update" element={<UpdateReview />} />
      </Routes>
    </>
  );
}

export default App;
