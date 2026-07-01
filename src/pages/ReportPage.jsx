import { useState } from "react";
import { CalendarCheck, MapPinned, RotateCcw, Search, Waves } from "lucide-react";
import { DataTable } from "../components/DataTable.jsx";
import { PageTitle } from "../components/PageTitle.jsx";
import { Stat } from "../components/Stat.jsx";
import { Status } from "../components/Status.jsx";
import { useApiData } from "../hooks/useApiData.js";

export function ReportPage() {
  const { data, loading, error } = useApiData();
  const [location, setLocation] = useState("");
  const [minVisitors, setMinVisitors] = useState("");

  const destinations = data.destinations.filter((item) =>
    item.location?.toLowerCase().includes(location.toLowerCase())
  );
  const bookings = data.bookings.filter((item) =>
    minVisitors === "" ? true : Number(item.numberOfVisitors) >= Number(minVisitors)
  );
  const revenue = destinations.reduce((sum, item) => sum + Number(item.entryFee || 0), 0);
  const hasFilters = location !== "" || minVisitors !== "";

  function clearFilters() {
    setLocation("");
    setMinVisitors("");
  }

  return (
    <section className="page reportPage">
      <PageTitle title="Report Page" subtitle="Filter tourism records and review summary information." />
      <Status loading={loading} error={error} />

      <div className="reportFilters">
        <label>
          Destination Location
          <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Mogadishu" />
        </label>
        <label>
          Minimum Visitors
          <input type="number" min="1" value={minVisitors} onChange={(event) => setMinVisitors(event.target.value)} placeholder="2" />
        </label>
        <button className="button" type="button" onClick={clearFilters} disabled={!hasFilters}>
          <RotateCcw size={18} /> Clear
        </button>
      </div>

      <div className="statsGrid compact reportStats">
        <Stat icon={MapPinned} label="Matched Places" value={destinations.length} />
        <Stat icon={CalendarCheck} label="Matched Bookings" value={bookings.length} />
        <Stat icon={Waves} label="Entry Fee Total" value={`$${revenue.toFixed(2)}`} />
      </div>

      <div className="reportTables">
        <section className="reportTablePanel">
          <div className="panelHeader">
            <div>
              <h2>Destination Results</h2>
              <p>{destinations.length} records matched by location</p>
            </div>
            <Search size={20} />
          </div>
          <DataTable entityKey="destinations" items={destinations} />
        </section>

        <section className="reportTablePanel">
          <div className="panelHeader">
            <div>
              <h2>Booking Results</h2>
              <p>{bookings.length} records matched by visitors</p>
            </div>
            <CalendarCheck size={20} />
          </div>
          <DataTable entityKey="bookings" items={bookings} />
        </section>
      </div>
    </section>
  );
}
