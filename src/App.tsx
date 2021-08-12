import React from 'react';
import './App.css';
import Board from "./components/views/Board";

function App() {
    return (
      <div className="App">
          <header className="App-header">
              <h1>To Do List</h1>
          </header>
          <Board />
      </div>
    );
}

export default App;
