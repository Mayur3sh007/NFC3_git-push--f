import MPList from '@/components/others/MPList'
import SearchMP from '@/components/others/SearchMP'
import { MPFilterProvider } from '@/context/MPFilterProvider'

export default function Page() {
    return (
        <MPFilterProvider>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <SearchMP />
                    </div>
                    <div className="md:col-span-3">
                        <MPList />
                    </div>
                </div>
            </div>
        </MPFilterProvider>
    )
}