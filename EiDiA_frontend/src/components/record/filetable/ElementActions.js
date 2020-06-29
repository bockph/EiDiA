import React from 'react';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {FaCloudDownloadAlt} from 'react-icons/fa'
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";


const IconButton = styled.button`
    width: 2.5em;  
    height: auto;
    margin: 0 0.5em;
    border: none;
    background: transparent;
    cursor: pointer; 
`;

/**
 * TODO:
 * - Button Link Coloring
 * - Remove Button border color when clicked and add Icon Color
 *- or remove whole button and make icon clickable
 */
const IconSize = '1.5em';

export class ElementActions extends React.Component {
    constructor(props) {
        super(props);
    }

    actionSelection(actions) {
        let toReturn = ["", "", ""];
        if (actions.includes('EDIT')) {
            //TODO: different icon here maybe?
            toReturn[0] = <AiFillEdit size={IconSize}/>;
        }
        if (actions.includes('DOWNLOAD')) {
            toReturn[2] = (<FaCloudDownloadAlt size={IconSize}/>);
        }
        if (actions.includes('DELETE')) {
            toReturn[1] = (<AiFillDelete size={IconSize}/>);
        }

        return toReturn;
    }

    render() {
        return (
            <Grid container spacing={1}>
                {this.actionSelection(this.props.actions).map((button, index) =>
                    <Grid key={index} item xs={12} sm={4}>
                        <IconButton
                        >
                            {button}
                        </IconButton>
                    </Grid>
                )}
            </Grid>

        );
    }
}