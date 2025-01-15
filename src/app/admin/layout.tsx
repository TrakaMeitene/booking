import Aside from "./partscomponents/aside";
import Footer from "./partscomponents/footer";


export default function Layout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

          <Aside />
          {children}
<Footer/>
    </>
  )
}