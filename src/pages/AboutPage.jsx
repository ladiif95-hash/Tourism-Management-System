import { PageTitle } from "../components/PageTitle.jsx";

export function AboutPage() {
  return (
    <section className="page">
      <PageTitle title="About / Contact Page" subtitle="Somali Tours keeps destination, hotel, tourist, and booking records in one place." />
      <div className="panel about">
        <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80" alt="Coastal city skyline" />
        <div>
          <h2>Somali Tours Management</h2>
          <p>Use this system to organize tourist information, destination details, hotel records, and booking activity.</p>
          <p><strong>Contact:</strong> tourism.admin@example.com</p>
          <p><strong>Office:</strong> Mogadishu tourism operations desk.</p>
        </div>
      </div>
    </section>
  );
}
