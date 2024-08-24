import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import About from './pages/AboutUs/About.jsx'
import Home from './pages/Home/Home.jsx'
import './index.css'
import { Route } from 'react-router-dom'
import Auth from './pages/Auth/Auth.jsx'
import Listing from './pages/Listings/Listing.jsx'
import SlotBooking from './pages/SlotBooking/SlotBooking.jsx'
import Login from './components/login.jsx'
import Signup from './components/signup.jsx'
import GetLicence from './components/GetLicence.jsx'
import MyBooking from "./components/MyBooking";

import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import PriceList from './pages/PriceList/PricesList.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="auth" element={<Auth />} />
      <Route path="listing" element={<Listing />} />
      <Route path="/mybooking" element={<MyBooking />} />
      <Route path="slotbooking" element={<SlotBooking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/getLicence" element={<GetLicence />} />
      <Route path="/priceList" element={<PriceList/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router = {router} />
)
