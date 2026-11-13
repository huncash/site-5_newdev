// PM2 — eladoingatlan.szcenario.hu → 127.0.0.1:5000
// Port: PORT env only. Do not pass --port (package.json start is "next start").
// Production cwd: /var/www/eladoingatlan

const CWD = process.env.ELADOINGATLAN_DIR || "/var/www/eladoingatlan";

module.exports = {
  apps: [
    {
      name: "eladoingatlan",
      cwd: CWD,
      script: "node_modules/next/dist/bin/next",
      args: "start --hostname 127.0.0.1",
      instances: 1,
      exec_mode: "fork",
      interpreter: "node",
      max_memory_restart: "384M",
      min_uptime: 5000,
      listen_timeout: 10000,
      kill_timeout: 8000,
      merge_logs: true,
      env: {
        NODE_ENV: "production",
        PORT: "5000",
        HOSTNAME: "127.0.0.1",
      },
      out_file: "/var/log/eladoingatlan/out.log",
      error_file: "/var/log/eladoingatlan/err.log",
      time: true,
    },
  ],
};
