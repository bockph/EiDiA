import React from 'react';
import {Dialog, DialogTitle, Typography} from '@material-ui/core';
import SaveTemplateWindow from './subcomponents/SaveTemplateWindow';
import ExportDocumentWindow from './subcomponents/ExportDocumentWindow';
import Preview from "./subcomponents/Preview";
import {Column, pageNames, Row} from "../../support files/constants";


const styles = {
    column: {
        margin: "15px",
    },
    box: {
        width: '7cm',
        height: '10cm',
        align: 'center',
        padding: "20px",
    },
    button_left: {
        margin: "15px",
        align: "left",
        bottom: 0,
    },
    button_right: {
        margin: "15px",
        align: "right",
        bottom: 0,
        right: 0,
    }
}

export default class FloatingWindow extends React.Component {
    render() {
        let DialogContent;
        let dialogTitle;
        if (this.props.currentPage === pageNames.editTemplate) {
            dialogTitle = "Save Template";
            DialogContent = SaveTemplateWindow;
        } else {
            dialogTitle = "Export Document";
            DialogContent = ExportDocumentWindow;
        }
        return (
            <Dialog onClose={this.props.onClose}
                    fullWidth={true}
                    maxWidth={'lg'}
                    open={this.props.showDialog}>
                <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
                <Row style={{margin: "10px"}}>
                    <Column style={styles.column}>
                        <Typography variant="subtitle2">
                            Created Template (Preview)
                        </Typography>
                        <Preview editorState={this.props.editorState}/>
                    </Column>
                    <DialogContent
                        onClose={this.props.onClose}
                        save={this.props.save}
                        selectedDocs={this.props.selectedDocs}
                        download={this.props.download}
                        editorState={this.props.editorState}
                    />
                </Row>
            </Dialog>
        );
    }
}
