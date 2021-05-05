import React, { useState } from 'react';
import { Modal, Button } from 'antd';

class GeneralModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {isModalVisible: false, modalTitle: "", modalBody:""};
    };

    showModal = (title, bodyText) => {
        this.setState({modalTitle: title, modalBody: bodyText, isModalVisible: true});
    };

    handleOk = () => {
        this.setState({isModalVisible: false});
    };

    handleCancel = () => {
        this.setState({isModalVisible: false});
    };

    render() {
        return (
            <>
                <Modal title={this.state.modalTitle} visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    {this.state.modalBody}
                </Modal>
            </>
        );
    }
};

export default GeneralModal;