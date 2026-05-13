import { type Character } from '../interfaces/character.interface';

interface Props {
  character: Character;
  onUpdate: (updated: Character) => void;
  onSave: () => void;
}

export const CharacterForm = ({ character, onUpdate, onSave }: Props) => {
  const kiRegex = /^[0-9.]+$/;
  const isNameInvalid = !character.name.trim();
  const isKiInvalid = !character.ki.trim() || !kiRegex.test(character.ki);
  const isFormInvalid = isNameInvalid || isKiInvalid;

  const handleChange = (field: keyof Character, value: string) => {
    onUpdate({ ...character, [field]: value });
  };

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); onSave(); }} 
      style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Nombre:</label>
        <input 
          type="text" 
          style={{ 
            padding: '10px', borderRadius: '4px', 
            border: isNameInvalid ? '2px solid red' : '1px solid #ccc',
            outline: 'none' 
          }}
          value={character.name} 
          onChange={(e) => handleChange('name', e.target.value)} 
        />
        {isNameInvalid && <span style={{ color: 'red', fontSize: '12px' }}>El nombre es obligatorio</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Ki:</label>
        <input 
          type="text" 
          style={{ 
            padding: '10px', borderRadius: '4px', 
            border: isKiInvalid ? '2px solid red' : '1px solid #ccc',
            outline: 'none' 
          }}
          value={character.ki} 
          onChange={(e) => handleChange('ki', e.target.value)} 
        />
        {isKiInvalid && <span style={{ color: 'red', fontSize: '12px' }}>El Ki solo puede contener números y puntos</span>}
      </div>

      <button 
        type="submit" 
        disabled={isFormInvalid}
        style={{ 
          marginTop: '10px', 
          backgroundColor: isFormInvalid ? '#ccc' : '#28a745', 
          color: 'white', padding: '12px', border: 'none', borderRadius: '4px',
          cursor: isFormInvalid ? 'not-allowed' : 'pointer', fontWeight: 'bold'
        }}
      >
        Confirmar Cambios
      </button>
    </form>
  );
};
