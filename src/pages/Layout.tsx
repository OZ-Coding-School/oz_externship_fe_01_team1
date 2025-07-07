import {Outlet} from 'react-router'
import NavBar from '../components/NavBar'
import Footer from "@components/Footer.tsx";
import LowercaseRedirect from "@components/common/LowercaseRedirect.tsx";

export default function Layout() {
    return (
        <>
            <LowercaseRedirect />
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}
