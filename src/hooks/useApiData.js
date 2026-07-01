import { useEffect, useState } from "react";
import { entities } from "../data/entities.jsx";
import { apiJson } from "../services/api.js";

const initialData = { destinations: [], tourists: [], hotels: [], bookings: [] };

export function useApiData(refreshKey = 0) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all(
      Object.entries(entities).map(([key, entity]) =>
        apiJson(entity.endpoint).then((items) => [key, items])
      )
    )
      .then((pairs) => {
        if (active) {
          setData(Object.fromEntries(pairs));
          setError("");
        }
      })
      .catch(() => active && setError("API connection failed. Please make sure ASP.NET Core is running and SQL Server is ready."))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [refreshKey]);

  return { data, loading, error };
}

