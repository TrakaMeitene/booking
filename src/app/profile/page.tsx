'use client'
import React, { useRef, useEffect, useState } from "react";
import Nav from "../components/nav";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { User } from "../admin/partscomponents/header"
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormValues } from "../admin/profile/page"
import Searchspecialist from "../components/search";
import Loading from "../admin/partscomponents/loading";
import { toast } from "sonner";
import Bookingstable from "./bookingstable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InvoiceTable from "./invoicetable";

export default function Prifileall() {
    const hiddenFileInput = useRef(null);
    const [user, setUser] = useState<User>()
    const [userimg, setUserimg] = useState("")
    const [image, setImage] = useState<File>()
    const router = useRouter()
    const [selectedOccupation, setSelectedOccuption] = useState("")
    const { register, handleSubmit, formState: { isDirty, dirtyFields } } = useForm<FormValues>();
    const [selectedcity, setSelectedcity] = useState("Rīga")
    const [cities] = useState(["Rīga", "Daugavpils", "Jelgava", "Jēkabpils", "Jūrmala", "Liepāja", "Rēzekne", "Valmiera", "Ventspils", "Aizkraukles rajons", "Alūksnes rajons", "Balvu rajons", "Bauskas rajons", "Cēsu rajons", "Daugavpils rajons", "Dobeles rajons", "Gulbenes rajons", "Jēkabpils rajons", "Jelgavas rajons", "Krāslavas rajons", "Kuldīgas rajons", "Liepājas rajons", "Limbažu rajons", "Ludzas rajons", "Madonas rajons", "Ogres rajons", "Preiļu rajons", "Rēzeknes rajons", "Rīgas rajons", "Saldus rajons", "Talsu rajons", "Tukuma rajons", "Valkas rajons", "Valmieras rajons", "Ventspils rajons", "Ārpus Latvijas"])

    useEffect(() => {
        let token = Cookies.get('token')
        getuser(token)

    }, [])

    const getuser = (token: any) => {

        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
            .then(response => {
                if (response.data.scope === 'all') {
                    setUser(response.data)
                    setUserimg(`${process.env.NEXT_PUBLIC_REQUEST_STORAGE}/${response.data.avatar}`)
                    setSelectedOccuption(response.data.occupation)
                } else { router.push('/') }
            })

            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    const handleClick = (event: any) => {
        hiddenFileInput?.current?.click();
    };

    const handleChange = (event: any) => {

        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i)
            const blob = new Blob([i], { type: 'image/png' })
            const img = URL.createObjectURL(blob);
            setUserimg(img)
        }
    };

    const updateuser = (data: FormValues) => {
        const formData = new FormData();

        Object.fromEntries(
            Object.keys(dirtyFields).map((key: string ) => [
                formData.append(key, data[key])
            ])
        );
        { image && formData.append('file', image) }
        formData.append('occupation', selectedOccupation)
        formData.append('city', selectedcity)

        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/updateuser`, formData, { headers })
            .then(response => {
                if (response.data.id) {
                    toast.success("Dati atjaunināti veiksmīgi")
                } else {
                    toast.error("Neizdevās atjaunināt datus. Mēģini vēlreiz!")

                }
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    if (!user) {
        return < Loading />
    }

    return (
        <>
            <Nav />
            <section id="homefirst" className="justify-center pb-12 ">
                <div className="w-full flex static justify-center">
                    <Searchspecialist />
                </div>
                <div className="flex flex-row w-[90%] place-content-evenly	flex-wrap">
                    <Card className="w-[385px] mt-2 p-4 ">
                        <CardHeader>

                            <CardTitle>Profila dati</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex w-full justify-center  align-center">
                                <Avatar className="h-[100px] w-[100px] cursor-pointer" onClick={handleClick}>
                                    <AvatarImage src={userimg} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <input type="file"
                                    ref={hiddenFileInput}
                                    onChange={handleChange}
                                    accept="image/*"
                                    style={{ display: 'none' }} />

                            </div>
                            <form onSubmit={handleSubmit(updateuser)}>

                                <div className="grid gap-4 mt-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Vārds Uzvārds *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Jānis Bērziņš"
                                            required
                                            defaultValue={user?.name}
                                            {...register('name')}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 mt-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Epasts *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.lv"
                                            required
                                            defaultValue={user?.email}

                                            {...register('email')}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 mt-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Telefona numurs *</Label>
                                        <Input
                                            id="pgone"
                                            type="text"
                                            placeholder="+371 xxxxxxx"
                                            required
                                            defaultValue={user?.phone}
                                            {...register('phone')}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 mt-2 select">
                                    <div className="grid gap-2">
                                        <Label htmlFor="city">Pilsēta, rajons *</Label>
                                        <Select value={selectedcity} onValueChange={(value) => {
                                            setSelectedcity(value)
                                        }} >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Izvēlies nodarbošanos" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>

                                                    {cities.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-4 mt-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="adress">Adrese *</Label>
                                        <Input
                                            id="adress"
                                            type="text"
                                            placeholder="Adrese"
                                            required
                                            defaultValue={user?.adress}

                                            {...register('adress')}
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="mt-2 w-full">Atjaunināt</Button>
                            </form>
                        </CardContent>
                    </Card>
                    <div>
                        <Tabs defaultValue="rezervācijas" >
                            <TabsList>
                                <TabsTrigger value="rezervācijas">Rezervācijas</TabsTrigger>
                                <TabsTrigger value="account">Rēķini</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account"> <InvoiceTable scope={user.scope}/></TabsContent>
                            <TabsContent value="rezervācijas"><Bookingstable user={user} /></TabsContent>
                        </Tabs>


                    </div>
                </div>
            </section>
        </>
    )
}