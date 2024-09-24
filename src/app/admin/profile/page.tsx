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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast";
interface FormValues {
    name: string
    email: string,
    phone: string,
    bio: string,
    adress: String,
    occupation: string,
    File: File
}

export default function Profile() {
    const [user, setUser] = useState<User>()
    const [userimg, setUserimg] = useState("")
    const [image, setImage] = useState<File>()
    const router = useRouter()
    const hiddenFileInput = useRef(null);
    const [occupations, setOccupations] = useState(["Frizieris", "Vizāžists", "Manikīrs", "Kosmetologs", "Skropst meistars", "Masieris", "Stilists", "Lāzerepilācija", "Tetovēšana/pīrsingi", "Fitness", "Masāža"])
    const [selectedOccupation, setSelectedOccuption] = useState("")
    const { register, handleSubmit, formState: { isDirty, dirtyFields } } = useForm<FormValues>();

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

        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post('http://localhost:8000/api/updateuser', formData, { headers })
            .then(response => console.log(response)) //te uztaisīt ka izmetas ziņojums
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    return (
        <main>
            <h1 className="text-3xl w-full border-b-2">Profils</h1>

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
                                {/* <Input
                                    id="occupation"
                                    type="text"
                                    placeholder="Nodarbošanās"
                                    required
                                    defaultValue={user?.occupation}

                                    {...register('occupation')}
                                /> */}
                                <Select value={selectedOccupation} onValueChange={(value) => {
                                    setSelectedOccuption(value)
                                }} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Izvēlies nodarbošanos" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
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