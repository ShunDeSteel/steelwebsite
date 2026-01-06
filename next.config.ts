import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /**
   * GitHub Pages requires a fully static site.
   * - `output: "export"` outputs static files to `/out`
   * - `images.unoptimized` is required because Next/Image optimization needs a server
   * - `basePath`/`assetPrefix` supports hosting under `https://<user>.github.io/<repo>/`
   */
  output: "export",
  images: {unoptimized: true},
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default withNextIntl(nextConfig);
