import { useState } from "react";
import { CrudForm } from "../components/CrudForm.jsx";
import { EntityTabs } from "../components/EntityTabs.jsx";
import { PageTitle } from "../components/PageTitle.jsx";

export function AddPage() {
  const [active, setActive] = useState("destinations");

  return (
    <section className="page">
      <PageTitle title="Add Page" subtitle="Insert new records using validated React forms and POST API calls." />
      <EntityTabs active={active} setActive={setActive} />
      <CrudForm key={active} entityKey={active} mode="add" />
    </section>
  );
}

