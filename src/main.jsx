import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router"; // Fixed import
//import App from "./App.jsx";
import HomePage from "./pages/home.page";
import HotelPage from "./pages/hotel.page";
import RootLayout from "./Layout/root-layout.layout";
import MainLayout from "./Layout/main.layout";
//import HotelsPage from "./pages/hotels.page";
import { store } from "./lib/store";
import { Provider } from "react-redux";
import CreateHotelPage from "./pages/create.hotel.page";
import SignInPage from "./pages/signin.page";
import SignUpPage from "./pages/signup.page";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedLayout from "./Layout/protect.layout";
import AccountPage from "./pages/account.page";
import AdminProtectedLayout from "./Layout/admin.protected.layout";
import PaymentPage from "./pages/payment.page";
import CompletePage from "./pages/complete.page"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUBLISHABLE_KEY){
  throw new Error("Add your Clerk Publishable Key to the .env local file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
        <Route element={<MainLayout />}>
         <Route path="/" element={<HomePage />} />
         <Route path="/hotels/:id" element={<HotelPage />} />
         <Route element={<ProtectedLayout />}>
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/booking/payment" element={<PaymentPage />} />
                  <Route path="/booking/complete" element={<CompletePage />} />
        <Route element={<AdminProtectedLayout />}>
                  <Route path="/hotels/create" element={<CreateHotelPage />} />
        </Route>
        </Route>
         </Route>
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
    </ClerkProvider>
  </StrictMode>
);
