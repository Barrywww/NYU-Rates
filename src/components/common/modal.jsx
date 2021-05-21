import React from 'react';
import { Modal } from 'antd';

class GeneralModal extends React.Component{
    /**
     * General Modal Template
     * @constructor
     */
    constructor(props){
        super(props);
        this.state = {isModalVisible: false, modalTitle: "", modalBody:""};
    };

    /**
     * Show modal
     * @constructor
     * @param title - modal title
     * @param bodyText - modal bodyText
     */
    showModal = (title, bodyText) => {
        this.setState({modalTitle: title, modalBody: bodyText, isModalVisible: true});
    };

    /**
     * Function for click "ok"
     */
    handleOk = () => {
        this.setState({isModalVisible: false});
    };

    /**
     * Function for click "cancel"
     */
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