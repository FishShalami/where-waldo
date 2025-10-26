import React from "react";
import LoadWaldoImage from "./components/LoadWaldoImage";
import Header from "./components/Header";
import ShowHighScores from "./components/ShowHighScores";

function App() {
  const [messageSuccess, setMessageSuccess] = React.useState(false);

  return (
    <>
      <Header />
      <LoadWaldoImage
        messageSuccess={messageSuccess}
        setMessageSuccess={setMessageSuccess}
      />
      <ShowHighScores messageSuccess={messageSuccess} />
    </>
  );
}

export default App;
