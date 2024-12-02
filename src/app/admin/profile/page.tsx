'use client'
import React, { useEffect, useState, useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { User } from "../partscomponents/header"
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'
export interface FormValues {
    name: string,
    personalnr: string,
    email: string,
    phone: string,
    bio: string,
    adress: String,
    occupation: string,
    File: File,
    city: string,
    bank: string,
    urlname: string
}
 export interface Message{
    message: string, 
    type:  string
 }

export default function Profile() {
    const [user, setUser] = useState<User>()
    const [userimg, setUserimg] = useState("")
    const [image, setImage] = useState<File>()
    const router = useRouter()
    const hiddenFileInput = useRef(null);
    const [occupations] = useState(["Frizieris", "Vizāžists", "Manikīrs", "Kosmetologs", "Skropst meistars", "Masieris", "Stilists", "Lāzerepilācija", "Tetovēšana/pīrsingi", "Fitness", "Masāža"])
    const [selectedOccupation, setSelectedOccuption] = useState("")
    const { register, handleSubmit, formState: { isDirty, dirtyFields } } = useForm<FormValues>();
    const [selectedcity, setSelectedcity] = useState("Rīga")
    const [cities] = useState(["Rīga", "Daugavpils", "Jelgava", "Jēkabpils", "Jūrmala", "Liepāja", "Rēzekne", "Valmiera", "Ventspils", "Aizkraukles rajons", "Alūksnes rajons", "Balvu rajons", "Bauskas rajons", "Cēsu rajons", "Daugavpils rajons", "Dobeles rajons", "Gulbenes rajons", "Jēkabpils rajons", "Jelgavas rajons", "Krāslavas rajons", "Kuldīgas rajons", "Liepājas rajons", "Limbažu rajons", "Ludzas rajons", "Madonas rajons", "Ogres rajons", "Preiļu rajons", "Rēzeknes rajons", "Rīgas rajons", "Saldus rajons", "Talsu rajons", "Tukuma rajons", "Valkas rajons", "Valmieras rajons", "Ventspils rajons", "Ārpus Latvijas"])
    const [message, setMessage] = useState<Message>()

    useEffect(() => {
        let token = Cookies.get('token')
        getuser(token)

    }, [])

    const getuser = (token: any) => {

        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
            .then(response => {
                setUser(response.data)
                setUserimg(`${process.env.NEXT_PUBLIC_REQUEST_STORAGE}/${response.data.avatar}`)
                setSelectedOccuption(response.data.occupation)
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
        console.log(dirtyFields)
        const formData = new FormData();
        data.urlname = data.name.toLocaleLowerCase('tr').replace(/ /g, "-")

        Object.fromEntries(
            Object.keys(dirtyFields).map((key: string) => [
                formData.append(key, data[key])
            ])
        );
        { image && formData.append('file', image) }
        formData.append('occupation', selectedOccupation)
        formData.append('city', selectedcity)
        {data.name.length !== 0 && formData.append('urlname', data.urlname)}
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/updateuser`, formData, { headers })
            .then(response => {if(response.data.id) {
                setMessage({ message: "Dati atjaunināti veiksmīgi", type: "success" })
                toast.success("Dati atjaunināti veiksmīgi")
            }else{
                setMessage({ message: "Neizdevās atjaunināt datus. Mēģini vēlreiz!", type: "error" })
                toast.error("Neizdevās atjaunināt datus. Mēģini vēlreiz!")
            }}) 
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    return (
        <main>
            <h1 className="text-3xl w-full border-b-2">Profils</h1>
<div className="flex flex-row">
            <Card className="w-[350px] mt-2">
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
                                <Label htmlFor="name">Reģistrācijas nr. *</Label>
                                <Input
                                    id="pk"
                                    type="text"
                                    placeholder="1xxxxxxxxxx"
                                    required
                                    defaultValue={user?.personalnr}
                                    {...register('personalnr')}
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
                        <div className="grid gap-4 mt-2">
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
                        <div className="grid gap-4 mt-2">
                            <div className="grid gap-2">
                                <Label htmlFor="bank">Konta nr. *</Label>
                                <Input
                                    id="bank"
                                    type="text"
                                    placeholder="Konta nr"
                                    required
                                    defaultValue={user?.bank}

                                    {...register('bank')}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 mt-2">
                            <div className="grid gap-2">
                                <Label htmlFor="occupation">Nozare,nodarbošanās *</Label>

                                <Select value={selectedOccupation} onValueChange={(value) => {
                                    setSelectedOccuption(value)
                                }} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Izvēlies nodarbošanos" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {occupations.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-4 mt-2">
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Apraksts</Label>
                                <Textarea placeholder="Apraksti savu darbu, kas būs galvenais informācijas avots klientiem."
                                    defaultValue={user?.bio}
                                    {...register('bio')} />
                            </div>
                        </div>
                        <Button type="submit" className="mt-2 w-full">Atjaunināt</Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="h-[150px] mt-2 ml-2 mb-2">
                <CardContent>
                    <CardHeader>
                        <CardTitle>Abonaments</CardTitle>
                    </CardHeader>
                    <p className="font-bold">Jums ir aktīvs - {user?.abonament} abonaments</p>
                    {user?.abonament === "bezmaksas" && <Button className="mt-2 ">Mainīt uz Biznesa plāns</Button>}
                    </CardContent>
            </Card>
            </div>
        </main>
    )
}