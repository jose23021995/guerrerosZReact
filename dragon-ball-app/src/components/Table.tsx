import { Character } from '@/interfaces/character.interface';

interface Props {
  data: Character[];
  onEdit: (char: Character) => void;
  onDetail: (id: number) => void;
}

export const Table = ({ data, onEdit, onDetail }: Props) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
          <th style={{ padding: '12px' }}>Nombre</th>
          <th style={{ padding: '12px' }}>Raza</th>
          <th style={{ padding: '12px' }}>Ki</th>
          <th style={{ padding: '12px' }}>Afiliación</th>
          <th style={{ padding: '12px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((char) => (
          <tr key={char.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>{char.name}</td>
            <td style={{ padding: '12px' }}>{char.race}</td>
            <td style={{ padding: '12px' }}>{char.ki}</td>
            <td style={{ padding: '12px' }}>{char.affiliation}</td>
            <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
              <button onClick={() => onDetail(char.id)}>Ver</button>
              <button onClick={() => onEdit(char)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
