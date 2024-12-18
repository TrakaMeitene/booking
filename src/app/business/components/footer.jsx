import React from "react";
import "../App.css"
import logo from "../../assets/logo1.png"
import Image from "next/image";

export default function Footer(){
    return(
        <footer>
        <div className="flex row justify-sides align" style={{borderBottom: "1px solid gray", padding: 10}}>
            <Image src={logo} alt="logo" width={90} />
            <a href="/privacy" target="_blank">Privātuma politika</a>
        </div>
        <div className="flex row justify-sides">
            <p id="demo">© 2024 Pieraksts Pie. Visas tiesības aizsargātas. </p>

        </div>
    </footer>
    )
}
