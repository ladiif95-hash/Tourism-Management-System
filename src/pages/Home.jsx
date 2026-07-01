import { ArrowRight, BedDouble, CalendarCheck, ClipboardList, MapPinned, PlusCircle, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Stat } from "../components/Stat.jsx";
import { Status } from "../components/Status.jsx";
import cityHeader from "../assets/somali-city-header.png";
import { useApiData } from "../hooks/useApiData.js";
import { formatCell } from "../utils/format.js";

export function Home() {
  const { data, loading, error } = useApiData();
  const totalVisitors = data.bookings.reduce((sum, booking) => sum + Number(booking.numberOfVisitors || 0), 0);
  const activeLocations = new Set(data.destinations.map((destination) => destination.location).filter(Boolean)).size;
  const latestBookings = [...data.bookings].slice(-4).reverse();
  const recentHotels = [...data.hotels].slice(-4).reverse();

  return (
    <section className="page dashboardPage">
      <div className="dashboardHeader">
        <div>
          <span className="eyebrow">Tourism Information System</span>
          <h1>Welcome back, {sessionStorage.getItem("tourismUser") || "user"}</h1>
          <p className="dashboardLead">Your tourism office dashboard is ready. Review bookings, add new destinations, and keep visitor records up to date.</p>
          <div className="heroActions">
            <Link className="button primary" to="/add"><PlusCircle size={18} /> Add Record</Link>
            <Link className="button" to="/report"><Search size={18} /> View Report</Link>
          </div>
        </div>
        <div className="dashboardPhoto" aria-hidden="true">
          <img src={cityHeader} alt="" />
        </div>
      </div>

      <Status loading={loading} error={error} />
      <div className="statsGrid dashboardStats">
        <Stat icon={MapPinned} label="Destinations" value={data.destinations.length} />
        <Stat icon={Users} label="Tourists" value={data.tourists.length} />
        <Stat icon={BedDouble} label="Hotels" value={data.hotels.length} />
        <Stat icon={CalendarCheck} label="Visitors Booked" value={totalVisitors} />
      </div>

      <div className="dashboardGrid">
        <section className="dashboardPanel bookingsPanel">
          <div className="panelHeader">
            <div>
              <h2>Recent Bookings</h2>
              <p>Latest visitor activity</p>
            </div>
            <Link to="/list" className="textLink">View all <ArrowRight size={16} /></Link>
          </div>
          <div className="activityList">
            {latestBookings.length === 0 ? (
              <p className="emptyState">No bookings yet</p>
            ) : (
              latestBookings.map((booking) => (
                <article className="activityItem" key={booking.bookingId}>
                  <span className="activityIcon"><CalendarCheck size={18} /></span>
                  <div>
                    <strong>Booking #{booking.bookingId}</strong>
                    <small>Tourist #{booking.touristId} to destination #{booking.destinationId}</small>
                  </div>
                  <span className="activityMeta">{formatCell(booking.bookingDate)}</span>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="dashboardPanel actionsPanel">
          <div className="panelHeader">
            <div>
              <h2>Quick Actions</h2>
              <p>Daily operations</p>
            </div>
          </div>
          <div className="quickActions">
            <Link to="/add" className="quickAction"><PlusCircle size={18} /> Add new record</Link>
            <Link to="/update" className="quickAction"><ClipboardList size={18} /> Update record</Link>
            <Link to="/report" className="quickAction"><Search size={18} /> Filter reports</Link>
          </div>
        </section>

        <section className="dashboardPanel summaryPanel">
          <div className="panelHeader">
            <div>
              <h2>Today Summary</h2>
              <p>Current coverage</p>
            </div>
          </div>
          <div className="summaryList">
            <div><span>Active Locations</span><strong>{activeLocations}</strong></div>
            <div><span>Total Bookings</span><strong>{data.bookings.length}</strong></div>
            <div><span>Average Visitors</span><strong>{data.bookings.length ? (totalVisitors / data.bookings.length).toFixed(1) : "0"}</strong></div>
          </div>
        </section>

        <section className="dashboardPanel hotelsPanel">
          <div className="panelHeader">
            <div>
              <h2>Recent Hotels</h2>
              <p>Newest hotel records</p>
            </div>
          </div>
          <div className="miniList">
            {recentHotels.length === 0 ? (
              <p className="emptyState">No hotels yet</p>
            ) : (
              recentHotels.map((hotel) => (
                <div key={hotel.hotelId}>
                  <strong>{hotel.hotelName}</strong>
                  <span>{hotel.location} - destination #{hotel.destinationId}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
