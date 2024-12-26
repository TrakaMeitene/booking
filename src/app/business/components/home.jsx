import React from "react";
import gif from "../../assets/Untitled design (1).gif"
import "../App.css"
import Image from "next/image";

export default function Home(){

    return (
        <section id="home">
        <h1>Pierakstu sistēma pakalpojumu sniedzējiem, frizieriem, saloniem u.c.</h1>
        <p>Esi redzams, esi sasniedzams un pieejams ikvienam. Būvē savu skaistuma, labsajūtas un citu biznesu kopā ar
            mums. Pierakstu sistēma ļaus attālināti pārvaldīt klientus un Tavu laiku. Vairs nekādu zvanu un plānotāju.
           </p>
   
        <p id="success" className="green none"></p>

        <Image src={gif} width="300px"  alt="gif" unoptimized={true}/>
    </section>
    )
}