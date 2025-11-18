export function getApiBase() {
  const url = import.meta.env.VITE_BACKEND_URL;
  return typeof url === 'string' && url.length ? url.replace(/\/$/, '') : null;
}
