import {Outlet} from 'react-router'
import NavBar from '../components/NavBar'
import Footer from "@components/Footer.tsx";

export default function Layout() {
    return (
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}
