import { RsvpEntry } from '../types/RsvpTypes';

interface Props {
  entries: RsvpEntry[];
}

export const RsvpList: React.FC<Props> = ({ entries }) => (
  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
    {entries.map(entry => (
      <li key={entry.id} style={{
        padding: '0.75rem 1rem',
        marginBottom: '0.5rem',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 'bold' }}>{entry.name}</span>
        <span>{entry.status}</span>
      </li>
    ))}
  </ul>
);