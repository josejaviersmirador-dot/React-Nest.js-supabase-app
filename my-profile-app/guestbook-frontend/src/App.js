import React from 'react';
import Guestbook from './Guestbook';

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f0f0f0' }}>
        <h1>Welcome to My Profile</h1>
      </header>
      <main>
        <Guestbook />
      </main>
    </div>
  );
}

export default App;