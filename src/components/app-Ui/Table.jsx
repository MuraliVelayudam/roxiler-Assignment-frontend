import { IoClose } from 'react-icons/io5'
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Input } from '../ui/input'
import DropDownMonths from './DropdownMonths'

import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Button } from '../ui/button'
import Loader from './Loader'
import SoldItem from './SoldItemTable'
import BarChart from './BarChart'
import PieChart from './PieChart'

const URL = import.meta.env.VITE_URL

export default function TransactionTable() {
    const [transaction, setTransaction] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [month, setMonth] = useState('january')
    const limit = 10

    // Debounce----------------------------
    const [search] = useDebounce(searchValue, 1000)

    // Set Input Search--------------------
    const onHandleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    // Clear Input Value-------------------
    const onHandleClearInput = () => {
        setSearchValue('')
        setPage(1)
    }

    // Next Page-------------------------
    const onHandleNextPage = () => {
        setPage((prev) => {
            return prev + 1
        })
    }

    // Prev Page-----------------------------
    const onHandlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }

    // Month--------------------------
    const onHandleMonth = (month) => {
        setMonth(month)
    }

    useEffect(() => {
        // Fetch Transactions from backend-------------------------
        const fetchTransaction = async () => {
            try {
                setLoading(true)
                const res = await fetch(
                    `${URL}/api/transaction?month=${month}&page=${page}&search=${search}&limit=${limit}`
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const data = await res.json()
                setTransaction(data.products)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        fetchTransaction()
    }, [search, page, month])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="flex flex-col space-y-1 mb-32 absolute w-full">
            <div className="flex  items-center border border-slate-100 px-10 py-2 shadow justify-between sticky top-0 z-50 w-full bg-white">
                <div className="w-1/2 flex items-center gap-1 border px-4 rounded-md">
                    <Input
                        onChange={onHandleSearch}
                        placeholder="Search title/description/price . . ."
                        type="text"
                        className="border-none text-md"
                        value={searchValue}
                    />
                    {search && (
                        <button onClick={onHandleClearInput}>
                            <IoClose
                                size={24}
                                className="hover:text-red-700  transition duration-500 hover:scale-125"
                            />
                        </button>
                    )}
                </div>
                {/* ---------------------- Dropdown Menu For Months -------------------- */}
                <div className="">
                    <DropDownMonths
                        onHandleMonth={onHandleMonth}
                        month={month}
                    />
                </div>
            </div>
            <Table className="border border-slate-100 shadow-md mb-10">
                <TableCaption>
                    {/* ---------------------- Pagination -------------------- */}
                    <h1>A list of your recent Transactions.</h1>
                    <div className="flex flex-col items-center space-y-4 py-4">
                        <div className="">
                            <p>
                                Page :{' '}
                                <span className="font-semibold text-slate-950">
                                    {page}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-10">
                            <div>
                                <Button
                                    className="flex items-center gap-2"
                                    onClick={onHandlePrevPage}
                                >
                                    Previous
                                    <FaArrowLeftLong />
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="flex items-center gap-2"
                                    onClick={onHandleNextPage}
                                >
                                    <FaArrowRightLong />
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div>
                            <p>
                                Page Per View :{' '}
                                <span className="font-semibold text-slate-950">
                                    10
                                </span>
                            </p>
                        </div>
                    </div>
                </TableCaption>
                <TableHeader className="">
                    <TableRow className="uppercase">
                        <TableHead className="text-center text-slate-950 tracking-wide">
                            Index
                        </TableHead>
                        <TableHead className="text-center text-slate-950 tracking-wide">
                            Id
                        </TableHead>
                        <TableHead className="w-[300px] text-center text-slate-950 tracking-wide">
                            Title
                        </TableHead>
                        <TableHead className="text-center text-slate-950 tracking-wide">
                            Description
                        </TableHead>
                        <TableHead className="text-center text-slate-950 tracking-wide">
                            Price
                        </TableHead>
                        <TableHead className="text-center text-slate-950 tracking-wide">
                            Category
                        </TableHead>
                        <TableHead className="text-center text-slate-950 tracking-wide">
                            Sold
                        </TableHead>
                        <TableHead className="text-center text-slate-950 tracking-wide">
                            Item Image
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transaction.map((each_transaction, index) => (
                        <TableRow key={each_transaction._id} className="">
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                                {each_transaction._id}
                            </TableCell>
                            <TableCell>{each_transaction.title}</TableCell>
                            <TableCell className="text-sm">
                                {each_transaction.description}
                            </TableCell>
                            <TableCell className="font-semibold">
                                {each_transaction.price}
                            </TableCell>
                            <TableCell className="font-semibold">
                                {each_transaction.category}
                            </TableCell>
                            <TableCell className="">
                                {each_transaction.sold ? (
                                    <span className="text-green-600 font-semibold">
                                        1
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold">
                                        0
                                    </span>
                                )}
                            </TableCell>
                            <TableCell className="">
                                <img
                                    src={each_transaction.image}
                                    alt={each_transaction.title}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Statistics Table------------------------------------------------- */}
            <div className="px-10 border border-slate-200">
                <SoldItem month={month} search={search} />
            </div>
            <div className="flex items-center justify-between border px-10 py-10 mt-24">
                <BarChart month={month} />
                <PieChart month={month} />
            </div>
        </div>
    )
}
