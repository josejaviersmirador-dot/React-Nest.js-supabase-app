import React from 'react';
import Guestbook from './Guestbook';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{textAlign: 'center', padding: '20px'}}>
        <h1>My Profile App</h1>
      </header>
      <main>
        <Guestbook />
      </main>
    </div>
  );
}

export default App;