import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Welcome to Home</h1>
      <Link to="/choice">
        <button>Get Started</button>
      </Link>
    </>
  );
}

export default Home;
