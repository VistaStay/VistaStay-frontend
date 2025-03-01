import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router"; // Fixed import
//import App from "./App.jsx";
import HomePage from "./pages/home.page";
import SignIn from "./pages/signin.page";
import SignUp from "./pages/signup.page";
import HotelPage from "./pages/hotel.page";
import RootLayout from "./Layout/root-layout.layout";
import MainLayout from "./Layout/main.layout";
import HotelsPage from "./pages/hotels.page";
import { store } from "./lib/store";
import { Provider } from "react-redux";
import CreateHotelPage from "./pages/create.hotel.page";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
        <Route element={<MainLayout />}>
         <Route path="/" element={<HomePage />} />
         <Route path="/hotels" element={<HotelsPage/>}/>
         <Route path="/hotels/:id" element={<HotelPage />} />
         <Route path="/hotels/create" element={<CreateHotelPage/>}/>
         </Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>
);
