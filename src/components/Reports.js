import React from 'react';
import base from '../base';
import moment from 'moment';
import {
    withRouter
  } from "react-router-dom";
  
import {  
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries } from 'react-vis';

class Reports extends React.Component{
    state = {
        categories:{},
        expenses:{}
    }

    componentDidMount(){
        base.bindToState(`${this.props.uid}/categories`, {
            context: this,
            state: 'categories'
          });
        base.bindToState(`${this.props.uid}/expenses`, {
            context: this,
            state: 'expenses'
        });
    }

    render(){
        const greenData = [{x: 'A', y: 10}, {x: 'B', y: 5}, {x: 'C', y: 15}];

        // const labelData = greenData.map((d, idx) => ({
        //     x: d.x,
        //     y: Math.max(greenData[idx].y, blueData[idx].y)
        // }));

        const BarSeries = VerticalBarSeries;
        const AuthButton = withRouter(
            ({ history }) =>
              (
                  <button>
                    Press me!
                  </button>
              )
        );

    return (
        <div>
            <AuthButton />
            <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <BarSeries data={greenData} />
                {/* <LabelSeries data={labelData} getLabel={d => d.x} /> */}
            </XYPlot>
        </div>
        );
    }
    
}

export default Reports;