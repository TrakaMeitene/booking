import React, { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from 'moment';
import 'moment/locale/lv'
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { toast } from "sonner";

export default function Newinvoice({ close }) {
    const [date, setDate] = useState<any>(new Date())
    const [paydate, setPaydate] = useState()
    const [file, setFile] = useState()
    const [selectedservice, setSelectedservices] = useState()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const services = [
        'Pakalpojuma sniegšana',
        'Preču piegāde',
        'Autoratlīdzība (honorārs)',
        'Pamatlīdzekļa pārdošana',
        'Saņemta apdrošināšanas atlīdzība',
        'Saņemta dāvana',
        'Soda nauda (saņemts)',
        'Valūtas kursa svārstības',
        'Procenti no juridiskās personas',
        'Procenti (nodoklis nav ieturēts)',
        'Vienreizējā dotācija',
        'Ikmēneša dotācija',
        'Personīgie naudas ieguldījumi',
        'Aizdevuma saņemšana/ Aizdevuma atgriešana',
        'Kasē iemaksātā skaidrā nauda',
        'Bankā iemaksātā skaidrā nauda',
        'PVN priekšnodokļa atmaksa',
        'Dīkstāves pabalsts',
        'Izmaksu kompensācija'
    ]

    type Inputs = {
        date: Date,
        documentNr: string,
        partner: string,
        partnerRegNr: string,
        paydate: Date,
        summofbill: BigInteger
    }

    const changefile = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setFile(i)

        }
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const formData = new FormData();

        formData.append('paydate', moment(paydate).format('YYYY-MM-DD h:m:s'))
        formData.append('date', moment(date).format('YYYY-MM-DD h:m:s'))
        formData.append('documentNr', data.documentNr)
        formData.append('customer', data.partner)
        formData.append('partnerReg', data.partnerRegNr)
        formData.append('sumofbill', data.sumofbill * 100)
        { file && formData.append('file', file) }

        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post('http://localhost:8000/api/saveexternalinvoice', formData, { headers })
            .then(response => {
                if (response.statusText == "Created") {
                    toast.success("Dati saglabāti veiksmīgi!")
                    close()
                } else {
                    toast.error("Kaut kas nogāja greizi!")
                }
            })
    }

    console.log(file)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <div className="flex items-center mt-2 ">
                    <Label htmlFor="date" className="text-left mr-12">
                        Datums
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"

                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? moment(date).format('dddd, Do MMMM YYYY') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center mt-2 ">
                    <Label htmlFor="minutes" className="text-sm mr-4 ">
                        Dokumenta nr.
                    </Label>
                    <Input type="text" {...register("documentNr")} />
                </div>

                <div className="flex items-center mt-2">
                    <Label htmlFor="minutes" className="text-sm mr-4 ">Darījuma apraksts</Label>
                    <Select value={selectedservice} onValueChange={(value) => {
                        setSelectedservices(value)
                    }}  >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Izvēlies darījuma veidu" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {services.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center mt-2 ">
                    <Label htmlFor="minutes" className="text-sm mr-4 ">
                        Darījuma partneris
                    </Label>
                    <Input type="text"  {...register("partner")} />
                </div>

                <div className="flex items-center mt-2 ">
                    <Label htmlFor="minutes" className="text-sm mr-4 ">
                        Partnera reģ. nr.
                    </Label>
                    <Input type="text"  {...register("partnerRegNr")} />
                </div>

                <div className="flex items-center mt-2 ">
                    <Label htmlFor="minutes" className="text-sm mr-4 ">
                        Darījuma summa
                    </Label>
                    <Input type="number" step=".01" placeholder="0.00"
                        {...register("sumofbill")} />
                </div>

                <div className="flex items-center mt-2 ">
                    <Label htmlFor="date" className="text-left">
                        Apmaksāts datumā
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !paydate && "text-muted-foreground"

                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {paydate ? moment(paydate).format('dddd, Do MMMM YYYY') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={paydate}
                                onSelect={setPaydate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex flex-row align-middle	mt-4 items-center mr-2 mb-4">
                    <Label htmlFor="file" className="mr-12">Fails</Label>
                    <Input id="file" type="file" onChange={changefile} />
                </div>
            </div>
            <Button type="submit">saglabāt</Button>
        </form>

    )
}