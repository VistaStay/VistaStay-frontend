import { Outlet } from "react-router"
import { Toaster } from "sonner"

function RootLayout(){
    return(
        <>
        <Outlet/>
        <Toaster/>
        </>
    )
}
export default RootLayout