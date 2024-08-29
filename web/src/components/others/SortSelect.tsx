import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MPProfile } from '@/lib/types'

type SortOption = {
    value: keyof MPProfile;
    label: string;
}

const sortOptions: SortOption[] = [
    { value: 'mp_age', label: 'Age' },
    { value: 'attendance', label: 'Attendance' },
    { value: 'debates', label: 'Debates' },
    { value: 'private_member_bills', label: 'Bills' },
    { value: 'questions', label: 'Questions' },
]

interface SortSelectProps {
    onSortChange: (value: keyof MPProfile | null) => void;
    currentSort: keyof MPProfile | null;
}

const SortSelect: React.FC<SortSelectProps> = ({ onSortChange, currentSort }) => {
    return (
        <Select onValueChange={onSortChange} value={currentSort || undefined}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SortSelect