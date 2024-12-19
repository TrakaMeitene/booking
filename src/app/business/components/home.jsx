'use client'
import React, { useState, useRef } from "react";
import gif from "../../assets/Untitled design (1).gif"
import "../App.css"
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home(){
    const [email, setemail] = useState("")
   // window.scrollTo(0, 0)
    const recaptcha = useRef(null);

    const Addtolist =(e)=> {
e.preventDefault()
if(recaptcha.current.getValue()){
        fetch("https://api.brevo.com/v3/contacts", {
            method: 'POST',
            headers: {
                "accept": 'application/json',
                'content-type': 'application/json',
                "api-key": process.env.NEXT_PUBLIC_APP_API_KEY
            },
            body: JSON.stringify({
                "email": email,
                "listIds": [7],
            })
        })
            .then(function (data) {
                console.log('Request success: ', data);
                document.getElementById("form").classList.add("none")
                document.getElementById('success').innerHTML = "Pierakstīšanās veiksmīga!"
                document.getElementById('success').classList.remove("none")
                document.getElementById("formsecond").classList.add("none")
                document.getElementById('successsecond').innerHTML = "Pierakstīšanās veiksmīga!"
                document.getElementById('successsecond').classList.remove("none")
            })
            .catch(function (error) {
                console.log('Request failure: ', error);
            });
        }
    }

    return (
        <section id="home">
        <h1>Pierakstu sistēma pakalpojumu sniedzējiem, frizieriem, saloniem u.c.</h1>
        <p>Esi redzams, esi sasniedzams un pieejams ikvienam. Būvē savu skaistuma, labsajūtas un citu biznesu kopā ar
            mums. Pierakstu sistēma ļaus attālināti pārvaldīt klientus un Tavu laiku. Vairs nekādu zvanu un plānotāju.
            Negaidi, pieraksties jaunumiem un esi pirmais, kas iegūs pieeju sistēmai.</p>
        <form id="form" onSubmit={Addtolist}>
            <input id="email" type="e-mail" name="email" placeholder="E-pasta adrese" required onChange={(e)=>setemail(e.target.value)}/>
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_APP_SITE_KEY} ref={recaptcha} style={{marginTop: "10px"}}/>

            <Button type="submit" value="Submit" disabled={!recaptcha.current} className={recaptcha.current ? "" : "disabled"}>Pierakstīties</Button>
        </form>
        <p id="success" className="green none"></p>

        <Image src={gif} width="300px"  alt="gif" unoptimized={true}/>
    </section>
    )
}