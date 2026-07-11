export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path = "/") {
  if (!path || /^https?:\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!basePath || normalizedPath.startsWith(`${basePath}/`)) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath}`;
}
