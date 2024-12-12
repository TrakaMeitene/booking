"use client"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { CardComponentProps } from "onborda";
import { useOnborda } from "onborda"
import axios from "axios";
import Cookies from "js-cookie";

export const CustomCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}: CardComponentProps) => {
  const { startOnborda, closeOnborda } = useOnborda();

  const closeandupdate = () => {
    closeOnborda()
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/setonboardtime`, {}, {headers})
  }

  return (

    <div className={`border-6 bg-white p-2 w-[300px] ml-2 rounded-lg z-50 mt-[40px] ${step.side == "top" ? "ml-[260px] mb-2" : ""}`} >

      <div className="float-right cursor-pointer" ><X onClick={closeandupdate} /></div>
      <h1>{step.icon} {step.title}</h1>
      <p >{currentStep + 1} no {totalSteps}</p>
      <p className="mb-4">{step.content}</p>
      <div className="flex justify-between">
        {currentStep + 1 > 1 && <Button onClick={prevStep}>Iepriekšējais</Button>}
        {currentStep + 1 == totalSteps ? <Button onClick={closeandupdate}>Pabeigt</Button> : <Button onClick={nextStep}>Nākamais</Button>}
      </div>
      {arrow}
    </div>
  )
}