import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./authentication/component/Login";
import SignUp from "./authentication/component/Signup";
import TripPlanningPage from "./pages/TripPlanningPage";
import VerifyEmail from "./authentication/component/VerifyEmail";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";

// Layouts
import RootLayout from "./layouts/RootLayout";
import LostItemsLayout from "./services/findLostItems/LostItemsLayout";
import WeatherLayout from './services/weather/WeatherLayout';
import LodgingLayout from "./services/lodging/pages/list/List";
import HotelHome from "./services/hotels/pages/home/Home";
import Hotel from "./services/hotels/pages/hotel/Hotel";
import HotelBookingPage from './services/hotel-test/HotelBookingPage'
import HotelDetailsPage from './services/hotel-test/HotelDetailsPage'
import HotelList from './services/hotel-test/HotelList'
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/settings/Profile";
import About from "./pages/About"
import Contact from './pages/Contact'
import NotFound from "./pages/NotFound";
import Navigation from "./pages/Navigation";
import OpenChatLayout from "./services/open-chat/layouts/OpenChatLayout";
import VehicleRentLayout from "./services/vehicle-rent/layouts/VehicleRentLayout";
import VehicleRentalLanding from "./services/vehicle-rent/pages/VehicleRentalLanding";
import TravelGuidePage from "./services/travelGuiders/TravelGuidePage";
import TravelGuideList from "./services/travelGuiders/TravelGuideList";
import EventReminder from './services/eventReminder-test/EventReminder';


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <RootLayout />}>
        <Route index element= { <Home /> } />
        <Route path="/login" element={ <Login /> }/>
        <Route path="/register" element={ <SignUp /> }/>
        <Route path="/profile" element={ <Profile /> }/>
        <Route path="/about" element={ <About /> }/>
        <Route path="/contact" element={ <Contact /> }/>
        <Route path="/navigation" element={ <Navigation /> }/>
        <Route path="*" element={<NotFound />} />
        <Route path="/verify" element={<VerifyEmail />} />

        <Route path="/trip-planner" element={
            <PrivateRoute>
                <TripPlanningPage />
            </PrivateRoute>
        }/>

<Route path="/hotels" element={<HotelList/>}/>
<Route path="/hotels/:id" element={<Hotel/>}/>

        <Route path="/services" element={ <Services />}>
            <Route path="lost-items" element={ <LostItemsLayout /> } />
            <Route path="weather" element={ <WeatherLayout /> } />
            <Route path="open-chat" element={ <OpenChatLayout /> } />
            <Route path="vehicle-hire" element={ <VehicleRentalLanding /> } />
            <Route path='car-rental' element={<VehicleRentLayout />} />
            <Route path="lodging" element={ <LodgingLayout /> } />
            <Route path="lodging/:id" element={ <Hotel /> } />
            <Route path="travel-guiders" element={ <TravelGuideList /> } />
            <Route path="travel-guiders/:id" element={<TravelGuidePage />} />
            <Route path="special-events" element={<EventReminder />} />
            <Route path="hotel-booking" element={<HotelList />} />
            <Route path="hotels/:id" element={<HotelDetailsPage />} />
            <Route path="book-hotel/:id" element={<HotelBookingPage />} />
        </Route>

        <Route path="/dashboard" element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        } />
    </Route>
));

const App = () => {
    return(
        <RouterProvider router={router} />
    )
}

export default App;
