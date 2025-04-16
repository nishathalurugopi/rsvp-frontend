import { useEffect, useState } from 'react';
import { RsvpForm } from './components/RsvpForm';
import { RsvpList } from './components/RsvpList';
import { RsvpEntry } from './types/RsvpTypes';

interface Counts {
  total: number;
  confirmed: number;
  declined: number;
  maybe: number;
}

function App() {
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [confirmedOnly, setConfirmedOnly] = useState<RsvpEntry[]>([]);
  const [counts, setCounts] = useState<Counts>({ total: 0, confirmed: 0, declined: 0, maybe: 0 });

  const fetchRsvps = async () => {
    const res = await fetch('http://localhost:5000/api/rsvps');
    const data = await res.json();
    setEntries(data);
  };

  const fetchConfirmed = async () => {
    const res = await fetch('http://localhost:5000/api/rsvps/confirmed');
    const data = await res.json();
    setConfirmedOnly(data);
  };

  const fetchCounts = async () => {
    const res = await fetch('http://localhost:5000/api/rsvps/counts');
    const data = await res.json();
    setCounts(data);
  };

  const refreshData = () => {
    fetchRsvps();
    fetchConfirmed();
    fetchCounts();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSubmit = async (id: string, name: string, status: string) => {
    await fetch('http://localhost:5000/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, status })
    });
    refreshData();
  };

  return (
    <div style={{ padding: '2rem', background: '#1e1e1e', minHeight: '100vh', color: '#f0f0f0', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>RSVP Manager</h1>
      
      <RsvpForm onSubmit={handleSubmit} />

      <div style={{
        background: '#1f1f1f',
        padding: '1rem 1.5rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>📊 Summary</h2>
        <p>📋 <strong>Total:</strong> {counts.total}</p>
        <p style={{ color: '#00e676' }}>✅ Confirmed: {counts.confirmed}</p>
        <p style={{ color: '#ff5252' }}>❌ Declined: {counts.declined}</p>
        <p style={{ color: '#ffd54f' }}>🤔 Maybe: {counts.maybe}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#4caf50' }}>Confirmed Attendees ✅</h3>
        <RsvpList entries={confirmedOnly} />
      </div>

      <div>
        <h3 style={{ marginTop: '2rem' }}>All RSVPs</h3>
        {entries.length === 0 ? (
          <p>No RSVPs yet.</p>
        ) : (
          <RsvpList entries={entries} />
        )}
      </div>

    </div>
  );
}

export default App;