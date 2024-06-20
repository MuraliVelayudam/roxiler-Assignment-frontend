/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

import { xLabel } from '@/lib/utils'
import { useEffect, useState } from 'react'

const URL = import.meta.env.VITE_URL

export default function BarChart({ month }) {
    const [bar, setBar] = useState([])

    useEffect(() => {
        const getBarData = async () => {
            try {
                const res = await fetch(`${URL}/api/chart?month=${month}`)
                if (!res.ok) {
                    throw new Error('Failed to get bar data')
                }

                const data = await res.json()
                setBar(data.barChartData)
            } catch (error) {
                console.log(error)
            }
        }
        getBarData()
    }, [month])

    let barArray = []

    bar.map((each) => {
        barArray.push(each.count)
    })

    const data = {
        labels: xLabel,
        datasets: [
            {
                label: 'Month wise Bar Chart',
                data: barArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                ],
                borderWidth: 2,
            },
        ],
    }
    const options = {}
    return (
        <div className="w-[50%] flex flex-col items-center gap-16">
            <h1 className="text-3xl uppercase">Bar chart - {month}</h1>
            <Bar data={data} options={options} className="" />
        </div>
    )
}
