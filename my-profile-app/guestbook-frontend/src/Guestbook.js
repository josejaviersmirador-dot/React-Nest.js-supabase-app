import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://orange-eureka-97r9v5vp6vp7hx6x7-3001.app.github.dev/guestbook';

const Guestbook = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  const fetchEntries = async () => {
    try {
      const res = await axios.get(API_URL);
      setEntries(res.data);
    } catch (err) {
      console.error("Waiting for backend...", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    try {
      await axios.post(API_URL, form);
      setForm({ name: '', message: '' });
      fetchEntries();
    } catch (err) {
      alert("Error sending message. Check if backend is Public.");
    }
  };
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEntries();
  };

  useEffect(() => { fetchEntries(); }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Sign the Guestbook</h2>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input 
          placeholder="Your Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea 
          placeholder="Write a message..." 
          value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})} 
          style={{ padding: '10px', fontSize: '16px', minHeight: '80px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'black', color: 'white', cursor: 'pointer' }}>
          Post Message
        </button>
      </form>

      {/* Message List */}
      <div>
        {entries.map(entry => (
          <div key={entry.id} style={{ borderBottom: '1px solid #ddd', padding: '15px 0' }}>
            <strong>{entry.name}</strong>
            <p style={{ margin: '5px 0' }}>{entry.message}</p>
            <button onClick={() => handleDelete(entry.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guestbook;