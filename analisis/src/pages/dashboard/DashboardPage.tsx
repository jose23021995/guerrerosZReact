import { useState } from 'react';
import { useCharacters } from '../../hooks/useCharacters';
import { Navbar } from '../../components/Navbar';
import { Table } from '../../components/Table';
import { Modal } from '../../components/shared/Modal';
import { CharacterForm } from '../../components/CharacterForm';
import { CharacterDetail } from '../../components/CharacterDetail'; // Importamos el nuevo componente
import { type Character } from '../../interfaces/character.interface';

export const DashboardPage = () => {
  const { characters, isLoading, error, updateCharacterLocal } = useCharacters();
  
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'detail'>('detail'); // Nuevo estado para alternar

  const handleOpenEdit = (char: Character) => {
    setSelectedChar(char);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleOpenDetail = (char: Character) => { // Recibimos el objeto completo para no hacer otra petición
    setSelectedChar(char);
    setModalType('detail');
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '0 2rem' }}>
        <h1>Guerreros Z</h1>
        {isLoading ? <p>Cargando...</p> : (
          <Table 
            data={characters} 
            onEdit={handleOpenEdit} 
            onDetail={(id) => {
              const char = characters.find(c => c.id === id);
              if (char) handleOpenDetail(char);
            }} 
          />
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalType === 'edit' ? "Editar Guerrero" : "Ficha de Personaje"}
      >
        {selectedChar && (
          modalType === 'edit' ? (
            <CharacterForm 
              character={selectedChar} 
              onUpdate={(updated) => { setSelectedChar(updated); updateCharacterLocal(updated); }} 
              onSave={() => setIsModalOpen(false)} 
            />
          ) : (
            <CharacterDetail character={selectedChar} />
          )
        )}
      </Modal>
    </div>
  );
};
