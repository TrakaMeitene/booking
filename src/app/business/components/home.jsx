'use client'
import React, { useState } from "react";
import tablet from "../../assets/tablet-mockup.png"
import "../App.css"
import { Syne } from 'next/font/google';
import Image from "next/image";

const syne = Syne({ subsets: ['latin'] , display: 'swap',   weight: ['700'],
});

export default function Home(){
    const [email, setemail] = useState("")
  //  window.scrollTo(0, 0)

    const Addtolist =(e)=> {
e.preventDefault()
        fetch("https://api.brevo.com/v3/contacts", {
            method: 'POST',
            headers: {
                "accept": 'application/json',
                'content-type': 'application/json',
                "api-key": process.env.REACT_APP_API_KEY
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
    return(
        <section id="home">
        <h1 className={syne.className}>Pierakstu sistēma pakalpojumu sniedzējiem, frizieriem, saloniem u.c.</h1>
        <p>Esi redzams, esi sasniedzams un pieejams ikvienam. Būvē savu skaistuma, labsajūtas un citu biznesu kopā ar
            mums. Pierakstu sistēma ļaus attālināti pārvaldīt klientus un Tavu laiku. Vairs nekādu zvanu un plānotāju.
            Negaidi, pieraksties jaunumiem un esi pirmais, kas iegūs pieeju sistēmai.</p>
        <form id="form" onSubmit={Addtolist}>
            <input id="email" type="e-mail" name="email" placeholder="E-pasta adrese" required onChange={(e)=>setemail(e.target.value)}/>
            <button type="submit" value="Submit" className="button-black">Pierakstīties</button>
        </form>
        <p id="success" className="green none"></p>

        <Image src={tablet} width={999} height={800} alt="tablet" />
    </section>
    )
}