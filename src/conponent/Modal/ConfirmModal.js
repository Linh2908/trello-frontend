import React from "react";
import { Button, Modal } from "react-bootstrap";
import { MODAL_COMFIRM_CLOSE, MODAL_COMFIRM_DELETE } from "../../utils/contantsModal";
import './ConfirmModal.scss';

function ConfirmMofal(props) {
  const { show, title, content, onActionModal } = props;

  const handleActionModal = (type) => {
    onActionModal && onActionModal(type);
  }
  return (
    <Modal show={show} onHide={() => handleActionModal(MODAL_COMFIRM_CLOSE)} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleActionModal(MODAL_COMFIRM_CLOSE)} className='btn-confirm'>Cancel</Button>
        <Button variant='success' onClick={() => handleActionModal(MODAL_COMFIRM_DELETE)} className='btn-confirm'>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmMofal;
