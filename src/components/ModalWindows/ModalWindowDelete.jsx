import React from 'react';
import Modal from 'react-modal';
import './modalWindowEdit.module.css'
import styles from "./modalWindowEdit.module.css";
import Button from "../Buttons/Button";

const ModalWindowDelete = ({isOpen, closeModal}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Подтверждение удаления"
            className={styles.customModal}
        >
            <Button value="x" onClick={closeModal} ></Button>
            <h1 className={styles.mainText}>Запись удалена</h1>

        </Modal>
    );
};

export default ModalWindowDelete;