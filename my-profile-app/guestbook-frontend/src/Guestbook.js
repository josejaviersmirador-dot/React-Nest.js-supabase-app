import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://orange-eureka-97r9v5vp6vp7hx6x7-3001.app.github.dev/guestbook';

const Guestbook = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const fetchEntries = async () => {
    try {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) {
        setEntries(res.data);
      } 
      else if (res.data && Array.isArray(res.data.data)) {
        setEntries(res.data.data);
      } 
      else {
        console.log("Data format was unexpected:", res.data);
        setEntries([]); 
      }
    } catch (err) {
      console.error("Waiting for backend...", err);
      setEntries([]);
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
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEntries();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Sign the Guestbook</h2>
      
      {}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input 
          placeholder="Your Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <textarea 
          placeholder="Write a message..." 
          value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})} 
          style={{ padding: '10px', fontSize: '16px', minHeight: '80px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'black', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          Post Message
        </button>
      </form>

      {}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        {entries.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No messages yet. Be the first!</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} style={{ borderBottom: '1px solid #ddd', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <strong style={{ fontSize: '1.1em' }}>{entry.name}</strong>
                <p style={{ margin: '5px 0', color: '#333' }}>{entry.message}</p>
                <small style={{ color: '#888' }}>{new Date(entry.created_at).toLocaleDateString()}</small>
              </div>
              <button onClick={() => handleDelete(entry.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Guestbook;