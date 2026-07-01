export function Status({ loading, error }) {
  if (loading) return <p className="status">Loading API data...</p>;
  if (error) return <p className="status error">{error}</p>;
  return null;
}

