import React from "react";
import phone from "../../assets/phone-mockup.png"
import "../App.css"
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";

export default function Item(){
    return(
        <section id="item1">
        <div className="text">
            <h3>Palielini savus ienākumus, iegūstot papildu klientus</h3>
            <p></p>
            <div className="text-md">
            <IoMdCheckmark className="material-icons" size={30}/>
            <h6 className="font-bold">Personīgais profils</h6>
                <p className="text-sm text-muted">Ļauj klientiem Tevi atrast, redzēt un iepazīt</p>
            </div>
            <div className="text-md">
            <IoMdCheckmark className="material-icons" size={30}/>
                <h6 className="font-bold">Plānotājs vienmēr kabatā</h6>
                <p className="text-sm text-muted">Digitālā pieraksta sistēma Tev vienmēr pieejama ierīcē ar interneta
                    pieslēgumu</p>
            </div>
            <div className="text-md">
            <IoMdCheckmark className="material-icons" size={30}/>
                <h6 className="font-bold">Radīts Tavām vajadzībām</h6>
                <p className="text-sm text-muted">Sasniedz vairāk, esi piekļūstamāks</p>
            </div>

        </div>
        <div className="center">
            <div className="circle"></div>
            <Image src={phone} alt="Image" className="phone" width={200}/>
        </div>
    </section>
    )
}