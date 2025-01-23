'use client'
import React, { Suspense, useEffect, useState} from "react";
import Nav from "../components/nav"
import Searchspecialist from "../components/search";
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter, usePathname } from 'next/navigation'
import { User } from "../admin/calendar/page";
import Footer from "../admin/partscomponents/footer";


export default function Specialists() {
    const searchParams = useSearchParams()
    const router = useRouter()
    let city = searchParams.get('city')
    let occupation = searchParams.get('occupation')
    let date = searchParams.get('date')

    const [specialists, setSpecialists] = useState<User[]>([])

    useEffect(() => {

        getdata(city, occupation, date)
    }, [city, occupation, date])

    const getdata = (city: string | null, occupation: string | null, date: string | null) => {
        const data = { 'city': city, 'occupation': occupation, 'date': date }

        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getspecialists`, data)
            .then(response => setSpecialists(response.data))
    }

    const topersonalpage = (x: User) => {

        router.push(`specialist/${x.id}/${x.name.toLocaleLowerCase('tr').replace(/ /g, "-")}` );

    }



    return (
        <>
        
            <Nav />
            <Suspense fallback={<div>Loading...</div>}>

            <section id="homefirst" className="justify-center home">
                <Searchspecialist />
                <div className="flex flex-wrap flex-row justify-center items-center z-[2]">
                    {specialists.length > 0 ? specialists?.map((x: any) =>
                        <div className="flex border flex-row rounded-2xl bg-white p-5 cursor-pointer hover:scale-105 mr-4 mb-4" key={x.id} onClick={() => topersonalpage(x)}>
                            <Avatar className="h-[100px] w-[100px]" >
                                <AvatarImage src={`${process.env.NEXT_PUBLIC_REQUEST_STORAGE}/${x.avatar}`} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="p-5 text-left">
                                <h4 className="font-bold">{x.name}</h4>
                                <p className="text-sm">{x.bio != null && x.bio?.slice(0, 20) + "..."}</p>
                                <p className="text-stone-400 text-sm">{x.occupation}</p>
                                <div className="flex flex-row text-left">
                                    <p className="text-stone-400 text-sm">{x.city},</p>
                                    <p className="text-stone-400 text-sm">{x.adress}</p>
                                </div>
                            </div>
                        </div>
                    ) : <div className=" p-2 rounded-lg bg-white" style={{ border: "1px solid hsl(220 13% 91%)"}}><p>Diemžēl nekas netika atrasts!</p></div>}
                </div >

            </section>
            </Suspense>
            <Footer/>
        </>
    )
}