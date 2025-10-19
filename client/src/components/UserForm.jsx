import React from "react";

function UserForm() {
  console.log("UserForm component called");
  const [username, setUsername] = React.useState("");

  async function submitScore() {
    const res = await fetch("http://localhost:3000/api/score", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Submit failed");
    }
    console.log(data);
    if (data.ok) {
      const guessTime = data.elapsedMs / 1000;
      alert(`Good job ${data.username}! Your score of ${guessTime} was posted`);
    }
    return data; // { ok, username, elapsedMs, scoreId }
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitScore();
  }

  //   async function timeToFind() {
  //     const res = await fetch("http://localhost:3000/api/session/end", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     return data.delta;
  //   }

  //   const timeToFindSeconds = timeToFind();

  return (
    <div className="username-form-container">
      {/* the code below results in an error and it seems to make the page re-render many times */}
      {/* <p>You found Waldo in {timeToFindSeconds} seconds!</p> */}
      {console.log("This is UserForm return")}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your name for the scoreboard</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button type="submit">Submit score!</button>
      </form>
    </div>
  );
}

export default UserForm;
