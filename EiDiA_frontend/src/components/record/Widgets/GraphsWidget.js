import React from 'react';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {GraphType} from "../../../assets/Constants";

/**
 * TODO:
 *
 */


export class GraphsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributeMapping: props.attributeMapping,
            graphType: props.graphType,
            attributeValues: props.attributeValues,

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                attributeMapping: this.props.attributeMapping,
                graphType: this.props.graphType,
                attributeValues: this.props.attributeValues
            })
        }
    }

    createLineChart(attributeMapping, data) {
        console.log(data)

        return (
            <LineChart
                data={data}
                margin={{
                    top: 10, right: 60, left: 0, bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                {this.props.dashboardEditingActive ? "" : <Tooltip/>}
                <Legend/>
                {attributeMapping.map((mapping, i) => <Line key={i} type="monotone" dataKey={mapping.displayName}
                                                            stroke={mapping.color}
                                                            activeDot={{r: 8}}/>)}


            </LineChart>

        )
    }

    createBarChart(attributeMapping, data) {
        console.log(data)
        return (
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                {this.props.dashboardEditingActive ? "" : <Tooltip/>}
                <Legend/>
                {attributeMapping.map((mapping, i) => <Bar key={i} dataKey={mapping.displayName}
                                                           fill={mapping.color}/>)}

            </BarChart>
        )
    }


    createGraph(attributeMapping) {
        let data = this.getData(attributeMapping);
        switch (this.state.graphType) {
            case GraphType.Line:
                return this.createLineChart(attributeMapping, data);
            case GraphType.Bar:
                return this.createBarChart(attributeMapping, data)
            default:
                this.createLineChart(attributeMapping, data)
        }
    }

    getData(attributeMapping) {

        let data = []


        let tmp = this.state.attributeValues


        attributeMapping.map(mapping => data.push(
            tmp.filter(attr => attr.attributeId === mapping.attributeId)
                .map(foundAttribute => {
                    foundAttribute[mapping.displayName] = foundAttribute.value;
                    return foundAttribute
                })
            )
        )

        //Taken from https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key
        //TODO: first check if exist to prevent crash
        const mergeByDate = (a1, a2) =>
            a1.map(
                itm => {
                    return {...itm, ...a2.find((item) => (item.date === itm.date))}
                }
            );
        console.log(data)
        /*data=data.reduce((acc,current)=>{
            return mergeByDate(acc,current)
        })*/
        console.log(data)
        /*
         *TODO: Do this for multiple attributes not only two
         * - check wether datapoints where left out
         * - make it stable: right now, if only one attribute mapping currently it crashes, if >2 the extra attributes are ignored
         */
        // data = mergeByDate(data[0], data[1]);

        return (data.flat())
    }

    render() {

        return (<ResponsiveContainer height="85%">{this.createGraph(this.state.attributeMapping)}</ResponsiveContainer>)
    }

}

