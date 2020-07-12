import React from 'react';
import {Button} from '@material-ui/core/Button';

const buttonStyle = {
    margin: "15px",
    background: "#457b9d",
}

export default class SaveTemplateSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={this.props.onAction1}
                >
                    Save Template 
                </Button>
            </div>
        )
    }
}