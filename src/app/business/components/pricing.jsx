import React, {useState, useRef} from "react";
import "../App.css"
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";

export default function Pricing(){
    const [email, setemail] = useState("")
    if (typeof window !== "undefined") {

    window.scrollTo(0, 0)
    }
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
    return(
        <section id="pricing">
        <h2>Cenrādis</h2>
        <p>Iepazīsties ar mūsu plānotajiem izcenojumiem</p>

        <div className="flex row justify">
            <div className="container">
                <h3>Bezmaksas</h3>
                <p>Izmēģināšanai pieejams vienmēr bez maksas</p>
                <ul>
                    <li><b>20 rezervācijas mēnesī</b></li>
                    <li>E-pasts klientam par rezervācijas veikšanu</li>
                    <li>E-pasts pakalpojuma sniedzējam par rezervāciju</li>
                </ul>
            </div>
            <div className="container">
                <h3>Standarta</h3>
                <p>Ikdienas darbam</p>
                <p className="price">5 Eur</p>
                <p className="under">mēnesī</p>
                <ul>
                    <li>Bezlimita rezervācijas</li>
                    <li>Rēķinu izsūtne pirms vizītes</li>
                    <li>Ienākumu/izdevumu uzskaite</li>
                    <li>Klientu pārvaldība</li>
                    <li>E-pasta izsūtnes un atgādinājumi</li>
                    <li>Iespēja atzīmēt atvaļinājumus neirobežotu laiku uz priekšu</li>

                </ul>
            </div>

        </div>
        <div style={{marginTop: 90}}>
            <h2>Gribi būt primais, kurš uzzina, kad sistēma tiek palaista ? Pieraksties jaunumiem </h2>
            <p>Apsolām, nebūs kaitinošu reklāmu. Tikai ziņa, ka Tev ir iespēja platformu izmantot pirmajam un iespējams
                ar labākiem mēneša maksas nosacījumiem!</p>
            <form id="formsecond" onSubmit={Addtolist} className="flex flex-col items-center justify-center">
                <input type="e-mail" placeholder="E-pasta adrese" id="second" required onChange={(e)=> setemail(e.target.value)}/>
                <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_APP_SITE_KEY} ref={recaptcha} style={{marginTop: "10px"}}/>

<Button type="submit" value="Submit" disabled={!recaptcha.current} className={recaptcha.current ? "" : "disabled"}>Pierakstīties</Button>
        </form>
        <p id="successsecond" className="green none"></p>

        </div>
    </section>
    )
}