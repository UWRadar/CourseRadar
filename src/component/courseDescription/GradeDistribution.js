import React, { Component } from "react";
import Chart from "react-apexcharts";

class GradeDistribution extends Component {

    constructor(props) {
        super(props);

        this.data = [0.1, 0.1, 0.085, 0.06, 0.06, 0.055, 0.055, 0.05, 0.045, 0.03, 0.03, 0.03, 0.03, 0.03,
            0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.02, 0.01]
        this.dataCum = []

        let sum = 0
        for(let i = this.data.length - 1; i >= 0; i--) {
            sum += this.data[i] * 100
            sum = parseFloat(sum.toFixed(2))
            this.dataCum[i] = sum
        }

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: ["0.0-0.9", "1.0-1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8",
                        "2.9", "3.0", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "4.0"],
                    offsetX: 5
                },
                yaxis: {
                    labels: {
                        formatter: (value) => { return value * 100 + "%" },
                    }
                },
                fill: {
                    opacity: 1
                },
                plotOptions: {
                    bar: {
                        borderRadius: 5,
                        colors: {
                            ranges: [{
                                from: 0,
                                to: 1,
                                color: "#63469d"
                            }],
                        },
                        dataLabels: {
                            position: "top"
                        }
                    },
                },
                dataLabels: {
                    enabled: true,
                    offsetY: -10,
                    style: {
                        fontSize: '8px',
                        colors: ["black"]
                    },
                    formatter: function (value) {
                        return value * 100 + "%"
                    }
                },
                tooltip: {
                    x: {
                        show: false
                    },
                    y: {
                        formatter: (_value, { dataPointIndex, w }) => {
                            return this.dataCum[dataPointIndex] + "% students receive " +
                                w.globals.labels[dataPointIndex] +" and higher grades."
                        },
                        title: {
                            formatter: () => "",
                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },
            series: [
                {
                    data: this.data
                }
            ]
        };
    }

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="600"
            />
        );
    }
}

export default GradeDistribution;