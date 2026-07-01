import { useState } from "react";
import { Search } from "lucide-react";
import { DataTable } from "../components/DataTable.jsx";
import { EntityTabs } from "../components/EntityTabs.jsx";
import { PageTitle } from "../components/PageTitle.jsx";
import { Status } from "../components/Status.jsx";
import { entities } from "../data/entities.jsx";
import { useApiData } from "../hooks/useApiData.js";
import { apiJson } from "../services/api.js";

export function ListPage() {
  const [active, setActive] = useState("destinations");
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [message, setMessage] = useState("");
  const { data, loading, error } = useApiData(refresh);
  const entity = entities[active];
  const items = data[active] || [];
  const filtered = items.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));

  async function remove(item) {
    if (!confirm(`Delete ${entity.label} record #${item[entity.id]}?`)) return;
    try {
      await apiJson(`${entity.endpoint}/${item[entity.id]}`, { method: "DELETE" });
      setMessage(`${entity.label} record #${item[entity.id]} deleted from SQL Server.`);
      setRefresh((value) => value + 1);
    } catch (error) {
      setMessage(error.message || "Delete failed. Check the API and SQL Server connection.");
    }
  }

  return (
    <section className="page">
      <EntityTabs active={active} setActive={setActive} />
      <div className="toolbar">
        <div className="searchBox"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${entity.label}`} /></div>
      </div>
      <Status loading={loading} error={error} />
      {message && <p className="feedback">{message}</p>}
      <DataTable entityKey={active} items={filtered} onDelete={remove} />
    </section>
  );
}
