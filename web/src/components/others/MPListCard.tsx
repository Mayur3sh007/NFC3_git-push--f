import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { MPProfile } from "@/lib/types"

export default function MPListCard({ mp }: { mp: MPProfile }) {
    return (
        <Card className="w-64 bg-gray-50 border border-gray-200 shadow-md overflow-hidden">
            <div className="bg-gray-200 p-2 text-center">
                <span className="text-sm font-bold text-gray-700 bg-white px-2 py-1 rounded">{mp.mp_political_party}</span>
            </div>
            <CardContent className="p-4">
                <div className="flex flex-col items-start space-y-3">
                    <div className="w-full flex justify-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                                src={mp.image_url}
                                alt="Profile picture"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 128px"
                            />
                        </div>
                    </div>
                    <h2 className="text-lg font-bold text-center w-full text-gray-800 leading-tight min-h-[3.5rem]">
                        {mp.mp_name}
                    </h2>
                    <div className="space-y-0.5 w-full text-sm">
                        <p className="text-gray-600 font-medium">{mp.state}</p>
                        <p className="text-gray-500">{mp.mp_house}</p>
                        <p className="text-gray-500">{mp.mp_age} years old</p>
                        <p className="text-gray-500">{mp.mp_gender}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}