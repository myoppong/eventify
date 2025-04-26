// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout              from './components/Layout';
import Login               from './pages/login';
import Register            from './pages/register';
import Home                from './pages/home';
import EventsPage          from './pages/EventsPage';
import EventDetailPage     from './pages/EventDetailPage';
import PurchasePage        from './pages/PurchasePage';
import TicketSuccessPage   from './pages/TicketSuccessPage';
import MyTicketsPage       from './pages/MyTicketsPage';
import NotAuthorized       from './pages/notAuthorized';
import RequireAuth         from './components/requireAuth';
import OrganizerDashboard  from './pages/organizer/dashboard';
import EventDetail         from './pages/eventDetail';
import CreateEvent         from './pages/organizer/createEvent';
import AboutUs from './pages/AboutUs';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth (no Layout) */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path='/about' element={<AboutUs />}/> 

        {/* All other routes get the Layout */}
        <Route element={<Layout />}>
          {/* Public pages */}
          <Route index                  element={<Home />} />
          <Route path="events"         element={<EventsPage />} />
          <Route path="events/:id"     element={<EventDetailPage />} />
         


          <Route
  path="purchase"
  element={
    <RequireAuth requiredRole="attendee">
      <PurchasePage />
    </RequireAuth>
  }
/>
<Route
  path="my-tickets"
  element={
    <RequireAuth requiredRole="attendee">
      <MyTicketsPage />
    </RequireAuth>
  }
/>
          <Route path="ticket-success" element={<TicketSuccessPage />} />
          
          <Route path="not-authorized" element={<NotAuthorized />} />

          {/* Organizer (protected) */}
          <Route
            path="organizer/dashboard"
            element={<RequireAuth><OrganizerDashboard /></RequireAuth>}
          />
          <Route
            path="organizer/event/:id"
            element={<RequireAuth><EventDetail /></RequireAuth>}
          />
          <Route
            path="organizer/create"
            element={<RequireAuth><CreateEvent /></RequireAuth>}
          />
        </Route>
      </Routes>
    </Router>
  );
}
