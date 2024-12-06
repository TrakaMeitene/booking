'use client'
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import "../../admin/admin.css"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button";
import { Service } from "../services/page";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { Message } from "../profile/page";
import {toast} from "sonner"

export default function Settings() {
    const [workingdays, setWorkingdays] = useState([{ day: 1, statuss: true, from: "08:00", to: "17:00", breakfrom: "12:00", breakto: "13:00" }, { day: 2, statuss: true, from: "08:00", to: "17:00", breakfrom: "12:00", breakto: "13:00" }, { day: 3, statuss: true, from: "08:00", to: "17:00", breakfrom: "12:00", breakto: "13:00" }, { day: 4, statuss: true, from: "08:00", to: "17:00", breakfrom: "12:00", breakto: "13:00" }, { day: 5, statuss: true, from: "08:00", to: "17:00", breakfrom: "12:00", breakto: "13:00" }, { day: 6, statuss: false, from: "08:00", to: "17:00", breakfrom: "12:00", breakto: "13:00" }, { day: 7, statuss: false, from: "08:00", to: "17:00", breakfrom: "12:00", breakto: "13:00" }])
    const router = useRouter()
    const [message, setMessage] = useState<Message>()
    const weekdays = ["P.", "O.", "T.", "C.", "Pk.", "S.", "Sv."]


    useEffect(() => {
        getdata()
    }, [])

    const saveweeksettings = () => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/addsettings`, workingdays, { headers })
            .then(response => { if (response.data.length > 0) { 
                setMessage({ message: "Dati saglabāti veiksmīgi!", type: "success" }) 
            toast.success("Dati saglabāti veiksmīgi!")
            } else { 
                    setMessage({ message: "Kļūda! Mēģini vēlreiz", type: "error" })
                toast.error("Kļūda! Mēģini vēlreiz") } }) 
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    const getdata = () => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.get(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getsettings`, { headers })
            .then(response => { if (response.data.length > 0) { setWorkingdays(response.data) } })
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    return (
        <>

            <div >

                <h1 className="text-3xl w-full border-b-2">Uzstādījumi</h1>
                <p>Uzstādiet darba laiku un pārtraukumus darba nedēļai!</p>
                <Button onClick={saveweeksettings} className="mr-2">Saglabāt</Button>

                <div className="flex row mt-2">
                    {workingdays.map((x, index) =>
                        <Card key={x.day} className="mr-4 ">
                            <CardHeader className=" flex items-center">
                                <CardTitle>{weekdays[x.day -1]}</CardTitle>
                                <Switch checked={x.statuss} onCheckedChange={(e) => setWorkingdays(workingdays => workingdays.with(index, { ...workingdays[index], statuss: e }))} />
                            </CardHeader>
                            <CardContent>
                                <div className="flex row m-2">
                                    <label htmlFor="from" className="mr-2">No:</label>
                                    <input type="time" id="from" name="from" defaultValue={x.from} onChange={(e) => setWorkingdays(workingdays => workingdays.with(index, { ...workingdays[index], from: e.target.value }))} disabled={!x.statuss} style={{ border: "1px solid hsl(220 13% 91%)", borderRadius: "10px", padding: 4 }} className="mb-2" />
                                </div>
                                <div>
                                    <label htmlFor="to" className="mr-2">Līdz:</label>
                                    <input type="time" id="to" name="to" defaultValue={x.to} disabled={!x.statuss} onChange={(e) => setWorkingdays(workingdays => workingdays.with(index, { ...workingdays[index], to: e.target.value }))} style={{ border: "1px solid hsl(220 13% 91%)", borderRadius: "10px", padding: 4 }} />
                                </div>
                                <h3 className="mt-4">Pārtraukums</h3>
                                <div className="flex row m-2">
                                    <label htmlFor="from" className="mr-2" >No:</label>
                                    <input type="time" id="from" name="from" defaultValue={x.breakfrom} disabled={!x.statuss} onChange={(e) => setWorkingdays(workingdays => workingdays.with(index, { ...workingdays[index], breakfrom: e.target.value }))} style={{ border: "1px solid hsl(220 13% 91%)", borderRadius: "10px", padding: 4 }} className="mb-2" />
                                </div>
                                <div>
                                    <label htmlFor="to" className="mr-2">Līdz:</label>
                                    <input type="time" id="to" name="to" defaultValue={x.breakto} disabled={!x.statuss} onChange={(e) => setWorkingdays(workingdays => workingdays.with(index, { ...workingdays[index], breakto: e.target.value }))} style={{ border: "1px solid hsl(220 13% 91%)", borderRadius: "10px", padding: 4 }} />
                                </div>

                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    )
}