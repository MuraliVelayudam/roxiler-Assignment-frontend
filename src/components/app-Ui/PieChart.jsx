/* eslint-disable react/prop-types */

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement
)

import { Doughnut } from 'react-chartjs-2'

import { useEffect, useState } from 'react'

const URL = import.meta.env.VITE_URL

export default function PieChart({ month }) {
    const [pie, setPie] = useState([])
    useEffect(() => {
        const getPieData = async () => {
            try {
                const res = await fetch(`${URL}/api/pie?month=${month}`)

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const data = await res.json()
                setPie(data.pie)
            } catch (error) {
                console.log(error)
            }
        }
        getPieData()
    }, [month])

    const data = {
        labels: pie.map((row) => row.category),
        datasets: [
            {
                label: 'Month wise Category Pie Chart',
                data: pie.map((row) => row.itemCount),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                ],
                hoverOffset: 4,
            },
        ],
    }

    return (
        <div className="w-[28%] flex flex-col items-center gap-16">
            <h1 className="text-3xl uppercase">Pie Chart - {month}</h1>
            <Doughnut data={data} />
        </div>
    )
}
