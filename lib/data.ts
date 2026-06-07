export const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "quick-start", label: "Quick Start" },
  { id: "installation", label: "Install" },
];

export const HERO_LINES = [
  "$ netshape run --profile 3g -- your-app",
  "  ✓  NetShape is active · 3g",
  "  Dashboard  http://127.0.0.1:8091/dashboard",
];

export const INSTALL_COMMAND = "pip install netshape";

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: "Antenna",
    title: "12 Built-in Profiles",
    description:
      "From 2G (50 Kbps, 500ms latency) to fiber (1 Gbps, 5ms). Mobile, broadband, satellite, offline — every real-world condition covered.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Live Adjustment",
    description:
      "Change bandwidth, latency, loss, and jitter on a running proxy session. No restart needed — changes apply instantly.",
  },
  {
    icon: "Monitor",
    title: "Web Dashboard",
    description:
      "Real-time throughput and latency charts, sliders for every parameter, live log viewer, and scenario runner — all from your browser at localhost:8091.",
  },
  {
    icon: "Regex",
    title: "Per-Endpoint Rules",
    description:
      "Throttle specific domains differently. Regex-based pattern matching — throttle your payment API at 1 Mbps while the rest runs at full speed.",
  },
  {
    icon: "Play",
    title: "Scenario Scripting",
    description:
      "Simulate dynamic network transitions over time with YAML scenarios. Subway commute, flight mode, coffee shop Wi-Fi — built-in or custom.",
  },
  {
    icon: "BarChart3",
    title: "Metrics Export",
    description:
      "Prometheus text format export, JSON log files with rotation, rich terminal tables with live refresh, and 12 tracked metric counters.",
  },
  {
    icon: "Globe",
    title: "Full Protocol Support",
    description:
      "HTTP/1.x, HTTPS via CONNECT tunnel, HTTP/2 over TLS, SOCKS5 TCP, WebSocket — all throttled transparently through a single local proxy.",
  },
  {
    icon: "Zap",
    title: "Zero Dependencies",
    description:
      "No admin required. No OS-level rules. No native binaries. One pip install, cross-platform. Process death = automatic cleanup. Nothing lingers.",
  },
];

export interface Profile {
  name: string;
  bandwidth: string;
  latency: string;
  loss: string;
  jitter: string;
  description: string;
  tier: "good" | "ok" | "slow" | "dead";
}

export const PROFILES: Profile[] = [
  { name: "fiber", bandwidth: "1 Gbps", latency: "5 ms", loss: "0%", jitter: "2 ms", description: "Fast wired fiber", tier: "good" },
  { name: "cable", bandwidth: "100 Mbps", latency: "20 ms", loss: "0.05%", jitter: "5 ms", description: "Residential cable", tier: "good" },
  { name: "5g", bandwidth: "50 Mbps", latency: "30 ms", loss: "0.1%", jitter: "10 ms", description: "Fast mobile", tier: "good" },
  { name: "wifi", bandwidth: "30 Mbps", latency: "25 ms", loss: "0.1%", jitter: "8 ms", description: "Home Wi-Fi", tier: "good" },
  { name: "satellite", bandwidth: "12 Mbps", latency: "650 ms", loss: "0.5%", jitter: "80 ms", description: "High-latency satellite", tier: "slow" },
  { name: "dsl", bandwidth: "6 Mbps", latency: "60 ms", loss: "0.2%", jitter: "20 ms", description: "Older DSL", tier: "ok" },
  { name: "4g", bandwidth: "4 Mbps", latency: "80 ms", loss: "0.3%", jitter: "25 ms", description: "4G mobile", tier: "ok" },
  { name: "congested", bandwidth: "1.5 Mbps", latency: "180 ms", loss: "2.5%", jitter: "140 ms", description: "Busy shared network", tier: "slow" },
  { name: "3g", bandwidth: "780 Kbps", latency: "200 ms", loss: "1%", jitter: "60 ms", description: "3G mobile", tier: "slow" },
  { name: "edge", bandwidth: "240 Kbps", latency: "400 ms", loss: "3%", jitter: "120 ms", description: "2.5G EDGE", tier: "slow" },
  { name: "2g", bandwidth: "50 Kbps", latency: "500 ms", loss: "2%", jitter: "150 ms", description: "2G mobile", tier: "slow" },
  { name: "offline", bandwidth: "0 bps", latency: "0 ms", loss: "100%", jitter: "0 ms", description: "All traffic dropped", tier: "dead" },
];

export const TYPING_SPEED = 35;
export const PAUSE_BETWEEN = 900;
