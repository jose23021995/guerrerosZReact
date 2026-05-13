import { useState } from 'react';
import { useCharacters } from '../../hooks/useCharacters';
import { Navbar } from '../../components/Navbar';
import { Table } from '../../components/Table';
import { Modal } from '../../components/shared/Modal';
import { type Character } from '../../interfaces/character.interface';

export const DashboardPage = () => {
  const { characters, isLoading, error, updateCharacterLocal } = useCharacters();
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 1. Definimos la regla: Solo números (pueden ser muchos dígitos)
  const kiRegex = /^[0-9.]+$/;

  // 2. Variable de validación actualizada
  const isNameInvalid = !selectedChar?.name.trim();
  const isKiInvalid = !selectedChar?.ki.trim() || !kiRegex.test(selectedChar.ki);

  const isFormInvalid = isNameInvalid || isKiInvalid;

  const handleEdit = (char: Character) => {
    setSelectedChar(char);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // VALIDACIÓN AL ENVIAR
    if (!selectedChar?.name.trim() || !selectedChar?.ki.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    alert(`Cambios guardados localmente para: ${selectedChar?.name}`);
    setIsModalOpen(false);
  };

  // Variable auxiliar para deshabilitar el botón de forma limpia
  const isInvalid = !selectedChar?.name.trim() || !selectedChar?.ki.trim();

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '0 2rem' }}>
        <h1>Guerreros Z</h1>
        {isLoading ? (
          <p>Cargando guerreros...</p>
        ) : (
          <Table 
            data={characters} 
            onEdit={handleEdit} 
            onDetail={(id) => alert('ID del personaje: ' + id)} 
          />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Editar Guerrero Z">
        {selectedChar && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <img 
              src={selectedChar.image} 
              alt={selectedChar.name} 
              style={{ width: '120px', height: '160px', objectFit: 'contain' }} 
            />

            // Pon esto dentro del Modal, arriba del botón:

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
              
              {/* CAMPO NOMBRE */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Nombre:</label>
                <input 
                  type="text" 
                  style={{ 
                    padding: '10px', 
                    borderRadius: '4px', 
                    // BORDE DINÁMICO: Rojo si está vacío
                    border: !selectedChar?.name.trim() ? '2px solid red' : '1px solid #ccc',
                    outline: 'none'
                  }}
                  value={selectedChar?.name} 
                  onChange={(e) => {
                    const updated = { ...selectedChar!, name: e.target.value };
                    setSelectedChar(updated);
                    updateCharacterLocal(updated);
                  }} 
                />
                {!selectedChar?.name.trim() && (
                  <span style={{ color: 'red', fontSize: '12px' }}>El nombre es obligatorio</span>
                )}
              </div>

              {/* CAMPO KI */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Ki:</label>
                <input 
                  type="text" 
                  style={{ 
                    padding: '10px', 
                    borderRadius: '4px', 
                    border: isKiInvalid ? '2px solid red' : '1px solid #ccc',
                    outline: 'none'
                  }}
                  value={selectedChar?.ki} 
                  onChange={(e) => {
                    const updated = { ...selectedChar!, ki: e.target.value };
                    setSelectedChar(updated);
                    updateCharacterLocal(updated);
                  }} 
                />
                {isKiInvalid && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    El Ki solo puede contener números y puntos
                  </span>
                )}
              </div>


              {/* Tu botón Confirmar Cambios actual... */}
            </form>

          </div>
        )}
      </Modal>
    </div>
  );
};
