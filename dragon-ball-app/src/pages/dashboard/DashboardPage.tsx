import { useCharacters } from '@/hooks/useCharacters';
import { Navbar } from '@/components/Navbar';
import { Table } from '@/components/Table';
import { type Character } from '@/interfaces/character.interface';

export const DashboardPage = () => {
  const { characters, isLoading, error } = useCharacters();

  const handleEdit = (char: Character) => {
    console.log('Editando a:', char.name);
    // Aquí irá la lógica de edición simulada
  };

  const handleDetail = (id: number) => {
    console.log('Viendo detalle de ID:', id);
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '0 2rem' }}>
        <h1>Guerreros Z</h1>
        {isLoading ? (
          <p>Cargando datos...</p>
        ) : (
          <Table 
            data={characters} 
            onEdit={handleEdit} 
            onDetail={handleDetail} 
          />
        )}
      </div>
    </div>
  );
};
