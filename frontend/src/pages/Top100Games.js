// src/components/Top100Games.js no longer needed, was used for a different API
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Top100Games = () => {
  const [games, setGames] = useState([]);  // State to store top 100 games
  const [loading, setLoading] = useState(true);  // State to manage loading state
  const [error, setError] = useState(null);  // State for error handling

  // Fetch top 100 games when the component mounts
  useEffect(() => {
    const fetchTop100Games = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/top100Games');
        setGames(response.data.top100Games);  // Set fetched games to state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (err) {
        setError('Failed to fetch top 100 games');
        setLoading(false);
      }
    };

    fetchTop100Games();
  }, []); // Empty array makes sure this runs only once after initial render

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if fetching fails
  }

  return (
    <div>
      <h1>Top 100 Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.game_id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Top100Games;
