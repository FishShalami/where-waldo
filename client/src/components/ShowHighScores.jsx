import React from "react";

function ShowHighScores() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    async function getLeaderboard() {
      try {
        const res = await fetch("http://localhost:3000/api/leaderboard", {
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
  }, []);

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
