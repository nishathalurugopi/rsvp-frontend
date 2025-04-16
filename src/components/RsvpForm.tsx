import { useState } from 'react';

interface Props {
  onSubmit: (id: string, name: string, status: string) => void;
}

export const RsvpForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Yes');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = name.toLowerCase().replace(/\s+/g, '-');
    onSubmit(id, name, status);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter player name"
        required
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '30px',
          border: 'none',
          backgroundColor: '#222',
          color: '#fff',
          flex: 1,
          minWidth: '200px'
        }}
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '30px',
          backgroundColor: '#222',
          color: '#fff',
          border: 'none'
        }}
      >
        <option value="Yes">Yes ✅</option>
        <option value="No">No ❌</option>
        <option value="Maybe">Maybe 🤔</option>
      </select>
      <button
        type="submit"
        style={{
          padding: '0.6rem 1.25rem',
          borderRadius: '30px',
          backgroundColor: '#00cc66',
          color: '#000',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Add / Update RSVP
      </button>
    </form>
  );
};