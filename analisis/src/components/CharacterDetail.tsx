import { type Character } from '../interfaces/character.interface';

interface Props {
  character: Character;
}

export const CharacterDetail = ({ character }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
      <img 
        src={character.image} 
        alt={character.name} 
        style={{ width: '180px', height: '240px', objectFit: 'contain', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }} 
      />
      <div style={{ width: '100%' }}>
        <h2 style={{ color: '#e67e22', marginBottom: '5px' }}>{character.name}</h2>
        <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>
          "{character.description}"
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>Raza:</span> <span>{character.race}</span>
          <span style={{ fontWeight: 'bold' }}>Ki Máximo:</span> <span>{character.maxKi}</span>
          <span style={{ fontWeight: 'bold' }}>Género:</span> <span>{character.gender}</span>
          <span style={{ fontWeight: 'bold' }}>Afiliación:</span> <span>{character.affiliation}</span>
        </div>
      </div>
    </div>
  );
};
