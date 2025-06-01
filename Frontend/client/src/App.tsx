import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import AvatarWithSpeech from "./AvatarWithSpeech";

function App() {
  return (
    <div className="App">
      {/* render children Components */}
      {/* <Outlet /> */}

      <AvatarWithSpeech />
    </div>
  );
}

export default App;
