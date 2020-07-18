"use strict";

import React from 'react';
import styled from "styled-components";
import {RecordSymbol} from "../record/RecordSymbol";
import RecordService from "../../services/RecordService";
import {Link} from "../Link";

const FlexRow = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default class RecentFiles extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recentRecords: [],
        }
    }

    componentDidMount() {
        RecordService.getRecentRecords().then(result => {
            this.setState({
                recentRecords: result.records
            }).catch(error => {
                console.log(error);
            });
        })
    }


    render() {
        if (this.state.recentRecords.length > 0) { //only show recent files if they exist
            return (
                <div>
                    Recently worked on:
                    <FlexRow>
                        {this.state.recentRecords.map((record) =>
                            <Link
                                key={record.recordId}
                                to={"/record/" + record.recordId}>
                                <RecordSymbol name={record.recordName}/>
                            </Link>
                        )}
                    </FlexRow>
                </div>
            );
        } else {
            return ""
        }
    }
}
