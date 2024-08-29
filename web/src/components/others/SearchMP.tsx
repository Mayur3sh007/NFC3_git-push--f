'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useMPFilter } from '@/context/MPFilterProvider'

const SearchMP = () => {
    const { filters, setFilters } = useMPFilter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
    };

    const handleSelectChange = (value: string, field: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setFilters({
            searchTerm: '',
            state: '',
            party: '',
            education: '',
            gender: '',
        });
    };

    return (
        <div className='w-[40%]'>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                <div className="bg-dark-2 text-white p-4 text-xl font-bold">
                    Search Your MP
                </div>
                <form className="p-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type="text"
                        placeholder="MP Name / Constituency"
                        value={filters.searchTerm}
                        onChange={handleInputChange}
                    />
                    <Select value={filters.state} onValueChange={(value: any) => handleSelectChange(value, 'state')}>
                        <SelectTrigger>
                            <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filters.party} onValueChange={(value: any) => handleSelectChange(value, 'party')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Party" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bjp">BJP</SelectItem>
                            <SelectItem value="congress">Congress</SelectItem>
                            <SelectItem value="aap">AAP</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filters.education} onValueChange={(value: any) => handleSelectChange(value, 'education')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Educational Qualification" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="postgraduate">Post Graduate</SelectItem>
                            <SelectItem value="doctorate">Doctorate</SelectItem>
                        </SelectContent>
                    </Select>
                    <div>
                        <Label className="text-base font-semibold">Gender</Label>
                        <RadioGroup
                            value={filters.gender}
                            onValueChange={(value) => handleSelectChange(value, 'gender')}
                            className="flex space-x-4 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="outline" className="w-24" onClick={handleReset}>Reset</Button>
                        <Button className="w-24" type="submit">Search</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchMP