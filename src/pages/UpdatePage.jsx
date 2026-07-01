import { useState } from "react";
import { Search } from "lucide-react";
import { CrudForm } from "../components/CrudForm.jsx";
import { EntityTabs } from "../components/EntityTabs.jsx";
import { PageTitle } from "../components/PageTitle.jsx";
import { entities } from "../data/entities.jsx";
import { apiJson } from "../services/api.js";

export function UpdatePage() {
  const [active, setActive] = useState("destinations");
  const [recordId, setRecordId] = useState("");
  const [loaded, setLoaded] = useState(null);
  const [message, setMessage] = useState("");
  const entity = entities[active];

  async function loadRecord(event) {
    event.preventDefault();
    setMessage("");
    try {
      const item = await apiJson(`${entity.endpoint}/${recordId}`);
      setLoaded(item);
    } catch {
      setLoaded(null);
      setMessage("Record not found.");
    }
  }

  return (
    <section className="page">
      <PageTitle title="Update Page" subtitle="Load a record by ID, edit it, and save changes with PUT." />
      <EntityTabs active={active} setActive={(key) => { setActive(key); setLoaded(null); setRecordId(""); }} />
      <form className="panel inlineForm" onSubmit={loadRecord}>
        <label>{entity.label} ID<input type="number" min="1" value={recordId} onChange={(event) => setRecordId(event.target.value)} required /></label>
        <button className="button primary" type="submit"><Search size={18} /> Load Record</button>
      </form>
      {message && <p className="feedback">{message}</p>}
      {loaded && <CrudForm key={`${active}-${recordId}`} entityKey={active} mode="update" initialValues={loaded} recordId={recordId} />}
    </section>
  );
}

