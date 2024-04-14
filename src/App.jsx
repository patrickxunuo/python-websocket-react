import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  // Use a state to keep the current text (initially empty)
  const [currentText, setCurrentText] = useState("");
  const wsRef = useRef(new WebSocket("ws://127.0.0.1:8888/"));

  useEffect(() => {
    wsRef.current.onopen = () => {
      console.log("Opened Connection!");
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Check if the received word is a space and handle it
      const wordToAdd = data.word === " " ? '\u00A0' : data.word; // Replace space with non-breaking space if necessary
      setCurrentText(prevText => prevText + wordToAdd + " ");
    };

    wsRef.current.onclose = () => {
      console.log("Closed Connection!");
    };
  }, []);

  return (
    <div className="App">
      <p>{currentText}</p>
    </div>
  );
};

export default App;
