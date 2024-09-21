'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"
import Link from 'next/link'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="bg-dark-2 text-light-1 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-2xl font-bold">Logo</div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="hover:text-light-2">Home</Link>
                        <Link href="/mpfind" className="hover:text-light-2">MPs</Link>
                        <Link href="/confind" className="hover:text-light-2">Contituencies</Link>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-64 mr-2 bg-light-2 text-dark-1"
                        />
                        <Button size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={toggleMenu}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 flex flex-col space-y-2">
                        <Link href="/mpfind" className="hover:text-light-2">MPs</Link>
                        <Link href="/confind" className="hover:text-light-2">Contituencies</Link>
                        <Link href="/partyfind" className="hover:text-light-2">Parties</Link>
                        <Link href="#" className="hover:text-light-2">Anees</Link>
                        <div className="flex mt-2">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full mr-2 bg-light-1 text-dark-1"
                            />
                            <Button size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}