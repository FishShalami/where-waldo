import React from "react";
const API = import.meta.env.VITE_API_URL;

function UserForm({ messageSuccess, setMessageSuccess }) {
  console.log("UserForm component called");
  const [username, setUsername] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(true);
  const [messageData, setMessageData] = React.useState({});

  async function submitScore() {
    const res = await fetch(`${API}/api/score`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    });
    const data = await res.json(); // { ok, username, elapsedMs, scoreId }
    if (!res.ok) {
      throw new Error(data.error || "Submit failed");
    }
    console.log(data);
    if (data.ok) {
      setMessageSuccess(true);
      console.log("data posted successfully");
      setMessageData(data);
    }
  }

  function successMessageHandler() {
    const guessTime = messageData.elapsedMs / 1000;
    return (
      <div className="username-form-container">
        <p>{`Good job ${messageData.username}! Your score of ${guessTime} seconds was posted`}</p>
        <button onClick={closeButtonHandler}>Close</button>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitScore();
  }

  function closeButtonHandler() {
    setShowMessage(false);
  }

  function showMessageLogicHandler() {
    if (!showMessage) {
      return null;
    }
    return messageSuccess ? successMessageHandler() : userFormElement;
  }

  const userFormElement = (
    <div className="username-form-container">
      <p>You found him! Nice work. Enter your name to get on the scoreboard</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
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

  return showMessageLogicHandler();
}

export default UserForm;
