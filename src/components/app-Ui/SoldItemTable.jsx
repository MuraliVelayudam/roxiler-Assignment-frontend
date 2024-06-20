/* eslint-disable react/prop-types */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'
import { useEffect, useState } from 'react'

const URL = import.meta.env.VITE_URL

export default function SoldItem({ month, search }) {
    const [statistics, setStatistics] = useState([])

    // Fetching statistics from backend
    useEffect(() => {
        const getStatistics = async () => {
            try {
                const res = await fetch(
                    `${URL}/api/statistics?search=${search}&month=${month}`
                )

                if (!res.ok) {
                    throw new Error('Failed to get statistics')
                }

                const data = await res.json()
                setStatistics(data)
            } catch (error) {
                console.error(error)
            }
        }
        getStatistics()
    }, [month, search])

    return (
        <div className="flex flex-col items-center gap-4 py-10">
            <h1 className="text-3xl text-black uppercase">statistics</h1>
            <Table>
                <TableHeader>
                    <TableRow className="">
                        <TableHead className="uppercase tracking-wide">
                            Name
                        </TableHead>
                        <TableHead className="uppercase tracking-wide">
                            Sold
                        </TableHead>
                        <TableHead className="uppercase tracking-wide">
                            Not Sold
                        </TableHead>
                        <TableHead className="uppercase tracking-wide">
                            Total Items
                        </TableHead>
                        <TableHead className="uppercase tracking-wide">
                            Total Value of Products
                        </TableHead>
                        <TableHead className="uppercase tracking-wide">
                            Month
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-md font-semibold">
                        <TableCell>
                            {search ? search : 'All Products'}
                        </TableCell>
                        <TableCell
                            className={`${
                                statistics?.sold > 0
                                    ? 'text-green-500 font-semibold'
                                    : ''
                            }`}
                        >
                            {statistics?.sold}
                        </TableCell>
                        <TableCell
                            className={`${
                                statistics?.notSold > 0
                                    ? 'text-red-500 font-semibold'
                                    : ''
                            }`}
                        >
                            {statistics?.notSold}
                        </TableCell>
                        <TableCell>{statistics.totalItems}</TableCell>
                        <TableCell
                            className={`${
                                statistics?.sale_Statistics > 0
                                    ? 'font-semibold tracking-wider'
                                    : ''
                            }`}
                        >
                            {statistics?.sale_Statistics
                                ? formatCurrency(statistics?.sale_Statistics)
                                : 0}
                        </TableCell>
                        <TableCell>{month}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
