import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { Service } from "../services/page";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface SpecialTime {
  service: number;
  from: string;
  to: string;
  days: number[];
}

export default function SpecialAvailability() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<number>();
  const [timeFrom, setTimeFrom] = useState<string>("");
  const [timeTo, setTimeTo] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [specialTimes, setSpecialTimes] = useState<SpecialTime[]>([]);
  const [services, setservices] = useState<Service[] | any>()
const router = useRouter()

  const weekDays: string[] = ["P", "O", "T", "C", "Pk", "S", "Sv"];

  useEffect(() => {
    getservices()
    getspecialtimes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let token = Cookies.get('token')
  const headers = { 'Authorization': 'Bearer ' + token };

  const getspecialtimes =()=>{

    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getspecialtimes`, {}, {headers})
    .then(resp => setSpecialTimes(resp.data))
  } 
  
  const getservices = () => {
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getallservices`, {}, {headers})
            .then(response => setservices(response.data))
}

  const toggleDay = (day: string, index: number) => {
    console.log(day, index)
    setSelectedDays((prev) =>
      prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index]
    );
  };

  const addSpecialTime = () => {
    if (selectedService && timeFrom && timeTo && selectedDays.length > 0) {
      setSpecialTimes([...specialTimes, { service: selectedService, from: timeFrom, to: timeTo, days: selectedDays }]);
      setOpen(false);
      setSelectedDays([]);

      const data: SpecialTime = { service: selectedService, from: timeFrom, to: timeTo, days: selectedDays }

      axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/saveSpecialtimes`, {data}, {headers})
      .then(resp => setSpecialTimes(resp.data))
      .then(resp=> getspecialtimes())
    }


  };
 console.log(timeFrom, timeTo, specialTimes)
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Īpašie laiki pakalpojumiem</h2>
      <p className="text-sm text-gray-500">Iestatiet konkrētus laikus specifiskiem pakalpojumiem.</p>

      <Button className="mt-4" onClick={() => setOpen(true)}>+ Pievienot pakalpojumu</Button>

      <div className="mt-4 flex flex-col">
        {specialTimes.map((entry, index) => (
          <Card key={index} className="p-4 flex justify-between items-center w-fit mb-2">
            <CardContent className="flex flex-col">
              <span className="text-lg font-medium">{entry.service?.name}</span>
              <span className="text-gray-600">{entry.from} - {entry.to}</span>
              <span className="flex flex-row">
             {entry.days.map(day => ( <span key={day} className="text-gray-500 text-sm mr-2">{weekDays[day-1]}</span>))}
           </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Pievienot īpašu laiku</DialogTitle>
          <Select onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Izvēlieties pakalpojumu" />
            </SelectTrigger>
            <SelectContent>
              {services?.map((service: Service, index: number) => (
                <SelectItem key={index} value={service.id}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-4 mt-4">
            <input type="time" value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)} className="border rounded p-2" />
            <input type="time" value={timeTo} onChange={(e) => setTimeTo(e.target.value)} className="border rounded p-2" />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {weekDays.map((day, index) => (
              <div key={index}>
              <Checkbox  id={day} checked={selectedDays.includes(index +1)} onCheckedChange={() => toggleDay(day, index)}/>
              <label
              htmlFor={day}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
             {day}
            </label>
            </div>
            ))}
          </div>
          <Button className="mt-4" onClick={addSpecialTime}>Saglabāt</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}