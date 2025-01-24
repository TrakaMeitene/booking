import  Image  from "next/image"

export default function Footer(){
    return(
        <footer className="absolute bottom-0 w-full" >
            <div className={` md:ml-[100px] flex flex-row justify-between items  p-5 text-[90%] `}>
                      <a href="/privacy"> Privātuma politika </a>

            <p>© 2025 Pieraksts Pie. Visas tiesības aizsargātas. </p>
           
            <div className="flex flex-row">
                <a href="https://www.facebook.com/profile.php?id=61572238082848" target="_blank" className="mr-2"><Image src="/facebook.svg" alt="Facebook" width="20" height="20"/></a>
                <a href="https://www.tiktok.com/@pierakstspie" target="_blank"><Image src="/tiktok.svg" alt="Facebook" width="20" height="20"/></a>

            </div>
            </div>
        </footer>
    )
}