import Navigation from "@/components/Navigation"
import { Outlet } from "react-router"

function RootLayout(){
    return(
        <>
        <Navigation name="sharada"/>
        <Outlet/>
        </>
    )
}
export default RootLayout