import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,);

const LineChart = ({ connector, color, feedName, label = '', duration = 10000, limit = 12 }) => {
    const [timeNow, setTimeNow] = useState(new Date());
    const [data, setData] = useState([]);

    const initChart = () => {
        fetch(`https://io.adafruit.com/api/v2/${connector.username}/feeds/${feedName}/data?limit=${limit}&X-AIO-Key=${connector.key}`)
            .then(res => res.json())
            .then(res => {
                setData(() => {
                    const newData = [];
                    for (let i = limit; i > 0; i--) {
                        let t = new Date(res[i - 1].created_at);
                        newData.push({
                            x: t.getMinutes() + ':' + (t.getSeconds() < 10 ? '0' : '') + t.getSeconds(),
                            y: res[i - 1].value
                        });
                    }
                    return newData;
                });
            });
    }

    useEffect(() => {
        if ((timeNow.getSeconds() * 1000) % duration == 0) {
            fetch(`https://io.adafruit.com/api/v2/${connector.username}/feeds/${feedName}/data?limit=${limit}&X-AIO-Key=${connector.key}`)
                .then(res => res.json())
                .then(res => {
                    setData(() => {
                        const newData = [];
                        for (let i = limit; i > 0; i--) {
                            let t = new Date(res[i - 1].created_at);
                            newData.push({
                                x: t.getMinutes() + ':' + (t.getSeconds() < 10 ? '0' : '') + t.getSeconds(),
                                y: res[i - 1].value
                            });
                        }
                        return newData;
                    });
                });
        }
    }, [timeNow])

    useState(() => {
        initChart();
        setInterval(() => {
            setTimeNow(new Date());
        }, 1000);
    }, [])

    const chartOtions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Biểu đồ ${label}`,
                position: "bottom",
            },
        },
        scales: {
            // y: {
            //     beginAtZero: true,
            //     min: 20,
            //     max: 60,
            //     ticks: {
            //         stepSize: 10
            //     }
            // }
        }
    };

    const chartData = {
        datasets: [
            {
                label: `${label}`,
                data: data,
                borderColor: `${color}`,
                backgroundColor: `${color}`,
                fill: false,
            },
        ],
    };

    return (
        <Line
            options={chartOtions}
            data={chartData}
            style={{ backgroundColor: '#fff', margin: 10, boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
        />
    );
}

const MapStateToProps = (state) => ({ connector: state.connector });
export default connect(MapStateToProps)(LineChart);