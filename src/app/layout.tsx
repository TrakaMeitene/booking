import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Footer from "./admin/partscomponents/footer";
import { OnbordaProvider, Onborda } from 'onborda';
import { CustomCard } from "../app/admin/customonboard";
import Script from "next/script";


const steps: any = [
  {
    tour: "firsttour",
    steps: [
      {
        icon: "👋",
        title: "Sveicināti 'Pieraksts Pie' biznesa sistēmā!",
        content: "Kalendāra sadaļā atradīsiet klientu rezervācijas un varēsiet pievienot jaunas!",
        selector: "#welcome-message",
        side: "right",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
        nextRoute: '/admin/clients'
      },
      {
        icon: "👋",
        title: "Lai sāktu darbu!",
        content: "Sadaļā 'Pakalpojumi' redzēsiet sarakstu ar Jūsu piedāvātajiem pakalpojumiem!",
        selector: "#step2",
        side: "right",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
        nextRoute: "/admin/services",
        prevRoute: "/admin/clients"

      },
      {
        title: "Izveido pakalpojumu!",
        content: "Izveido jaunu pakalpojmu, lai klienti varētu pierakstīties!",
        selector: "#step3",
        side: "right",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
          nextRoute: "/admin/settings",
        prevRoute: "/admin/calendar"
      },
      {
 
        title: "Uzstādījumi!",
        content: "Saglabā darba laiku, pārtraukumu un brīvās dienas!",
        selector: "#step4",
        side: "top",
        showControls: true,
        pointerPadding: 15,
        pointerRadius: 10,
  nextRoute: "/admin/profile",
        prevRoute: "/admin/services"
      },
      {

        title: "Profils!",
        content: "Saglabā datus, lai rēķinu informācija būtu korekta, ja esi maksas klients. Kā arī vārdu, aprakstu un saziņas datus redzēs Tavs klients!",
        selector: "#step5",
        side: "bottom",
        showControls: true,
        pointerPadding: 15,
        pointerRadius: 10,
        prevRoute: "/admin/settings"

      },
    ]
  }
]

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pieraksts Pie",
  description: "Rezervāciju sistēma pakalpojumu sniedzējiem Latvijā.",
  openGraph: {
    title: "Pieraksts Pie",
    description: "Rezervāciju sistēma pakalpojumu sniedzējiem Latvijā.",
    images: "./favicon.ico",
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en">

      <body className={inter.className}>
      <Script defer src="https://cloud.umami.is/script.js" data-website-id="e84db11e-f6c1-42fa-b6ea-c1570bbd19a8"/>
        <OnbordaProvider>
          <Onborda steps={steps}
            showOnborda={true}
            shadowRgb="18,18,19"
            shadowOpacity="0.5"
             cardComponent={CustomCard}
            cardTransition={{ duration: 2, type: "spring" }}>
            {children}
            <Toaster richColors />
            {/* <Footer /> */}
          </Onborda>
        </OnbordaProvider>
      </body>
    </html>
  );
}

