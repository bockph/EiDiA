import React from 'react';
import {RichUtils, Editor, EditorState, ContentState} from 'draft-js';
import {llorem} from '../../../support files/constants';
import { Dropdown, Modal } from 'semantic-ui-react';
import 'draft-js/dist/Draft.css'


const styles = {
    editor: {
        width: '14cm',
        height: '20cm',
        align: 'center',
        margin: 10,
        backgroundColor: "white",
        boxShadow: "0px 0px 6px 1px rgba(0,0,0,0.5)",
        padding: "20px",
    }
};

const fontSizes = [
    { text: '4', value: 4 },
    { text: '8', value: 8 },
    { text: '10', value: 10 },
    { text: '12', value: 12 },
    { text: '14', value: 14 },
    { text: '16', value: 16 },
    { text: '20', value: 20 },
    { text: '24', value: 24 },
    { text: '30', value: 30 },
    { text: '36', value: 36 },
    { text: '42', value: 42 },
    { text: '50', value: 50 },
    { text: '64', value: 64 },
    { text: '72', value: 72 },
    { text: '90', value: 90 },
  ];

export default class DocEditor extends React.Component {
    constructor(props) {
        super(props);
        this.setEditor = (editor) => {
            this.editor = editor;
        };
        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
        };
    }

    componentDidMount() {
        this.focusEditor();
    }

    render() {
        const editorState = this.props.editorState
        const onChange = this.props.onChange
        return (
            <div style={styles.editor} onClick={this.focusEditor}>
                <Editor
                    readOnly={this.props.readOnly}
                    textAlignment={this.props.textAlignment}
                    ref={this.setEditor}
                    editorState={editorState}
                    onChange={onChange}
                />
            </div>
        );
    }
}