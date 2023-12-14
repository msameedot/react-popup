import React, {useRef, useEffect} from "react";
import "./Popup.scss"
  

interface PopupProps {
    header: string;
    onClose: () => void;
    content: string[];
  }

const Popup: React.FC<PopupProps> = ({ header, onClose, content }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
          }
        };
    document.addEventListener('mousedown', handleClickOutside);
        
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    return(
        <div className="popup-overlay">
      <div  ref={modalRef} className="popup">
        <div className="popup-header">
          <h1>{header}</h1>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-content">
          <ul>
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    )
}

export default Popup;