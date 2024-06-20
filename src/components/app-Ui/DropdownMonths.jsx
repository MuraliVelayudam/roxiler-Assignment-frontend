/* eslint-disable react/prop-types */
import { FaChevronDown } from 'react-icons/fa6'
import monthArray from '@/lib/constants'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function DropDownMonths({ onHandleMonth, month }) {
    return (
        <DropdownMenu className="">
            <DropdownMenuTrigger className="flex items-center gap-4 text-md  tracking-wider border border-slate-100 px-4 py-2 shadow rounded-md outline-none">
                <span className="font-semibold uppercase text-sm">{month}</span>
                <FaChevronDown className="animate-pulse" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Months</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {monthArray.map((each_month) => (
                    <DropdownMenuItem
                        key={each_month.month_Name}
                        onClick={() => {
                            onHandleMonth(each_month.month_Name)
                        }}
                    >
                        {each_month.month_Name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
