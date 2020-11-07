import React from 'react';

function Popup(props) {
  const closeOnEsc = React.useCallback((evt) => {
    if (evt.key === 'Escape') props.onClose();
  }, []);

  const closeOnClickByOverlay = React.useCallback((evt) => {
    if (evt.target.classList.contains('popup')) props.onClose();
  }, []);

  React.useEffect(() => {
    if (props.isOpen === true) {
      document.addEventListener('keydown', closeOnEsc);
      document.addEventListener('mousedown', closeOnClickByOverlay);
    } else {
      document.removeEventListener('keydown', closeOnEsc);
      document.removeEventListener('mousedown', closeOnClickByOverlay);
    }
  }, [props, closeOnEsc, closeOnClickByOverlay]);

  return (
    <div>
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className='popup__container'>
          <button type='button' className='popup__close' onClick={props.onClose}></button>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
