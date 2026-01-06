function normalizeBasePath(basePath: string) {
  if (!basePath) return "";
  // Ensure leading slash and no trailing slash
  let b = basePath.startsWith("/") ? basePath : `/${basePath}`;
  if (b !== "/" && b.endsWith("/")) b = b.slice(0, -1);
  return b === "/" ? "" : b;
}

/**
 * Prefix an asset path with NEXT_PUBLIC_BASE_PATH for GitHub Pages.
 * - Keeps absolute URLs (http/https) unchanged
 * - Ensures returned path starts with "/" (or "/<basePath>/")
 */
export function asset(pathname: string) {
  if (!pathname) return pathname;
  if (/^https?:\/\//i.test(pathname)) return pathname;

  const base = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || "");
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return base ? `${base}${p}` : p;
}


