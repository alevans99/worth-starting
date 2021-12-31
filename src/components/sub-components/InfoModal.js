import '../../styles/InfoModal.css';


function InfoModal({showModal, setShowModal, modalData}) {
  return (
    <div className="InfoModal">
      <div className='modal-info-container'>
      <h2 className='modal-title'>{modalData.title}</h2>
      <h3 className='modal-rating'>Rating: {modalData.rating}</h3>
      <h3 className='modal-date'>Aired: {modalData.date}</h3>
      <h3 className='modal-summary'>{modalData.summary}</h3>
     <button className='modal-close' onClick={() => {setShowModal(false)}}>Close</button>
     </div>
    </div>
  );
}

export default InfoModal;