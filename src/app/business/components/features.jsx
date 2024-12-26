import "../App.css"
import { IoMdPeople } from "react-icons/io";
import { IoLayers } from "react-icons/io5";
import { MdOutlineStorage } from "react-icons/md";
import { FaHeadphonesAlt, FaBook } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa6";

export default function Features(){
   // window.scrollTo(0, 0)

    return(
        <section id="features">
        <h2>Dari to, kas Tev padodas vislabāk un uztici mums savu klientu pārvaldību</h2>
        <p>Digitalizē savu biznesu, esi sasneidzams. Visas šīs iespējas būt Tev pieejamas pirmajam. pieraksties
            jaunumiem un pirmais uzzini, kad sistēma tiks piedāvāta lietošanai.</p>
        <div className="featurelist">
            <div className="text-md">
            <IoMdPeople className="material-icons" size={30}/>

                <h6 className="font-bold">Klientu pārvaldība</h6>
                <p className="text-sm text-muted">Pārskati, sazinies un veido savu datubāzi</p>
            </div>

            <div className="text-md">
            <IoLayers className="material-icons" size={30}/>
                <h6 className="font-bold">Personīgais profils</h6>
                <p className="text-sm text-muted">Ļauj klientiem Tevi atrast, redzēt un iepazīt</p>
            </div>
            <div className="text-md ">
            <MdOutlineStorage className="material-icons" size={30}/>
                <h6 className="font-bold">Neierobežots datu apjoms</h6>
                <p className="text-sm text-muted">Uzglabā savus datus bez ierobežojuma</p>
            </div>
            <div className="text-md">
            <FaHeadphonesAlt className="material-icons" size={30}/>
                <h6 className="font-bold">Bezmaksas atbalsts</h6>
                <p className="text-sm text-muted">Sazinies un saņem personisku atbildi </p>
            </div>
            <div className="text-md">
                <FaBook className="material-icons" size={30}/>
                <h6 className="font-bold">Plānotājs vienmēr kabatā</h6>
                <p className="text-sm text-muted">Digitālā pieraksta sistēma Tev vienmēr pieejama ierīcē ar interneta
                    pieslēgumu</p>
            </div>
            <div className="text-md">
            <FaPeopleArrows className="material-icons" size={30}/>
                <h6 className="font-bold">Radīts Tavām vajadzībām</h6>
                <p className="text-sm text-muted">Sasniedz vairāk, esi piekļūstamāks</p>
            </div>
        </div>
    </section>
    )
}