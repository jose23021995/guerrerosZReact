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
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '400px', position: 'relative'
      }}>
        <h3>{title}</h3>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</button>
        {children}
      </div>
    </div>
  );
};
