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
import Alertcomp from "../partscomponents/alert";
interface FormValues {
    name: string
    email: string,
    phone: string,
    bio: string,
    adress: String,
    occupation: string,
    File: File,
    city: string
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
        axios.post('http://localhost:8000/api/user', {}, { headers })
            .then(response => {
                setUser(response.data)
                setUserimg(`http://localhost:8000/storage/${response.data.avatar}`)
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
        const formData = new FormData();

        Object.fromEntries(
            Object.keys(dirtyFields).map((key) => [
                formData.append(key, data[key])
            ])
        );
        { image && formData.append('file', image) }
        formData.append('occupation', selectedOccupation)
        formData.append('city', selectedcity)

        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post('http://localhost:8000/api/updateuser', formData, { headers })
            .then(response => {if(response.data.id) {
                setMessage({ message: "Dati atjaunināti veiksmīgi", type: "success" })
            }else{
                setMessage({ message: "Neizdevās atjaunināt datus. Mēģini vēlreiz!", type: "error" })
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
            {message && <Alertcomp success={message}/>}

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
                                <Label htmlFor="name">Vārds Uzvārds</Label>
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
                                <Label htmlFor="email">Epasts</Label>
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
                                <Label htmlFor="phone">Telefona numurs</Label>
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
                                <Label htmlFor="city">Pilsēta, rajons</Label>
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
                                <Label htmlFor="adress">Adrese</Label>
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
                                <Label htmlFor="occupation">Nozare,nodarbošanās</Label>

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
        </main>
    )
}