import React from 'react';
import Modal from 'react-modal';
import './modalWindowEdit.module.css'
import styles from "./modalWindowEdit.module.css";

const ModalWindowDelete = ({isOpen, closeModal}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Подтверждение удаления"
            className={styles.customModal}
        >
            <button className={styles.buttonModal} onClick={closeModal}>x</button>
            <h1 className={styles.mainText}>Запись удалена</h1>

        </Modal>
    );
};

export default ModalWindowDelete;