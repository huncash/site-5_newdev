import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // eladoingatlan.szcenario.hu is the host root. No basePath, no assetPrefix.
  // Routes stay /, /erdeklodes/[valtozat], /api/erdeklodes.
  // Pin tracing to this app so a parent lockfile cannot leak into the build.
  outputFileTracingRoot: projectRoot,
  // VPS CPU lacks x86-64-v2; sharp prebuilds fail. Skip Next image optimizer.
  images: {
    unoptimized: true,
  },
  // Parent Szcenárió repo ESLint/prettier must not block this mini-app build.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
