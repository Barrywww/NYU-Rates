import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const GeneralModal = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(true);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal title={props.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>{props.bodyText}</p>
            </Modal>
        </>
    );
};

export default GeneralModal;