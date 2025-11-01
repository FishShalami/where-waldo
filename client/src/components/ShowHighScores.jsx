import React from "react";
const API = import.meta.env.VITE_API_URL;

function ShowHighScores({ messageSuccess }) {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    async function getLeaderboard() {
      try {
        const res = await fetch(`${API}/api/leaderboard`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setScores(data); // should return an array of obj 'username, bestMs'
      } catch (err) {
        console.error(err);
      }
    }
    getLeaderboard();
  }, [messageSuccess]);

  return (
    <div className="high-scores-container">
      <h2>-- High Scores--</h2>
      <div className="scores-table">
        <ul>
          {scores.map((score) => (
            <li key={`${score.username}-${score.bestMs}`}>
              User: {score.username}----Time: {score.bestMs / 1000} seconds
            </li>
          ))}
        </ul>
        {scores.length === 0 && <p>No scores yet</p>}
      </div>
    </div>
  );
}

export default ShowHighScores;
