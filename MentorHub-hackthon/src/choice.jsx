import React from 'react';
import { Link } from 'react-router-dom';

function Choice() {
  return (
    <>
      <h1>Choose Your Role</h1>
      <Link to="/menties/login">
        <button>Mentees</button>
      </Link>
      <Link to="/mentors/login">
        <button>Mentors</button>
      </Link>
    </>
  );
}

export default Choice;
