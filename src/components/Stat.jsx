export function Stat({ icon: Icon, label, value }) {
  return (
    <div className="stat">
      <Icon size={22} />
      <div><strong>{value}</strong><span>{label}</span></div>
    </div>
  );
}

