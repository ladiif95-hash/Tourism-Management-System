const API = import.meta.env.VITE_API_URL ?? "";

export async function apiJson(url, options) {
  const response = await fetch(`${API}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    const detail = await response.text();
    let message = detail;

    try {
      const parsed = JSON.parse(detail);
      if (parsed.errors) {
        message = Object.values(parsed.errors).flat().join(" ");
      } else if (parsed.title) {
        message = parsed.title;
      }
    } catch {
      message = detail;
    }

    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}
