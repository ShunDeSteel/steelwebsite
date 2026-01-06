import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  /**
   * GitHub Pages requires a fully static site:
   * - set `STATIC_EXPORT=true` to output static files to `/out`
   *
   * Notes:
   * - We keep `images.unoptimized` enabled so the site works on static hosting
   * - `basePath`/`assetPrefix` supports hosting under `https://<user>.github.io/<repo>/`
   */
  output: isStaticExport ? "export" : undefined,
  images: {unoptimized: true},
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default withNextIntl(nextConfig);
