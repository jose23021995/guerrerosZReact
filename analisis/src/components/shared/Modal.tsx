interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', zIndex: 1000, padding: '20px' // Padding para que no toque los bordes
    }}>
      <div style={{
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        width: '100%', 
        maxWidth: '500px', 
        position: 'relative',
        // --- ESTO ACTIVA EL SCROLL ---
        maxHeight: '90vh', // Máximo 90% del alto de la pantalla
        overflowY: 'auto',  // Activa scroll vertical solo si es necesario
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          {title}
        </h3>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}
        >
          ✕
        </button>
        <div style={{ marginTop: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
