import ReactDOM from 'react-dom';
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const ModalPortal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className='fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.54)] z-[60]'
        onClick={onClose}
      />
      <div className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[80]'>{children}</div>
    </>,
    document.getElementById('global-modal') as HTMLElement,
  );
};
export default ModalPortal;
