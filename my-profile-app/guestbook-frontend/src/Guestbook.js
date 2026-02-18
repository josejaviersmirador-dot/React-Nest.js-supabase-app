import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/guestbook'; 

const Guestbook = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  const fetchEntries = async () => {
    try {
      const res = await axios.get(API_URL);
      setEntries(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    await axios.post(API_URL, form);
    setForm({ name: '', message: '' });
    fetchEntries();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEntries();
  };

  useEffect(() => { fetchEntries(); }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Sign the Guestbook</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Your Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          style={{ padding: '8px' }}
        />
        <textarea 
          placeholder="Leave a message..." 
          value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})} 
          style={{ padding: '8px', minHeight: '80px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Post Message
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <div>
        {entries.map(entry => (
          <div key={entry.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
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