import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { MPProfile } from "@/lib/types"
import Link from "next/link"
import { Building2, User } from "lucide-react"

export default function MPListCard({ mp }: { mp: MPProfile }) {
    return (
        <Link href={`/mpfind/${mp.id}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                <div className="relative pt-[90%] bg-gray-100">
                    <Image
                        src={mp.image_url}
                        alt={`${mp.mp_name}'s profile picture`}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <Badge className="absolute top-2 right-2 text-xs" variant="secondary">
                        {mp.mp_political_party}
                    </Badge>
                </div>
                <CardContent className="p-3 flex-grow flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold mb-2 line-clamp-2">{mp.mp_name}</h2>
                        <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center">
                                <Building2 className="w-3 h-3 mr-1 flex-shrink-0" />
                                <span className="line-clamp-1">{mp.state}, {mp.mp_house}</span>
                            </div>
                            <div className="flex items-center">
                                <User className="w-3 h-3 mr-1 flex-shrink-0" />
                                <span>{mp.mp_gender}, {mp.mp_age} years old</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}