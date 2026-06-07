"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useScrollSpy } from "@/hooks/useScrollSpy";

// --- Shared UI primitives ---

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <h2 className="font-sans text-2xl font-bold text-white mb-6">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-10 scroll-mt-20">
      <h3 className="font-mono text-accent-green text-lg mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Code({ children, className }: { children: string; className?: string }) {
  return (
    <div className="rounded-lg bg-[#0d0d0d] border border-terminal-border overflow-hidden my-4">
      <pre className={clsx("overflow-x-auto px-4 py-3 text-sm leading-relaxed font-mono", className)}>
        <code className="text-[#e0e0e0]">{children}</code>
      </pre>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border border-terminal-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-terminal-surface text-left text-gray-400 font-mono text-xs">
            {headers.map((h) => (
              <th key={h} className="py-2.5 px-4 font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono divide-y divide-terminal-border/50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-terminal-surface/50">
              {row.map((cell, j) => (
                <td key={j} className="py-2 px-4 text-gray-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Sidebar ---

interface TocGroup {
  label: string;
  items: TocItem[];
}

interface TocItem {
  id: string;
  label: string;
  children?: TocItem[];
}

const tocGroups: TocGroup[] = [
  {
    label: "Getting Started",
    items: [
      { id: "how-it-works", label: "How It Works" },
      { id: "installation", label: "Installation" },
      { id: "first-time-setup", label: "First-Time Setup" },
      { id: "quick-start", label: "Quick Start" },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "built-in-profiles", label: "Built-in Profiles" },
      {
        id: "cli-reference", label: "CLI Reference", children: [
          { id: "cli-run", label: "netshape run" },
          { id: "cli-adjust", label: "netshape adjust" },
          { id: "cli-status", label: "netshape status" },
          { id: "cli-stop", label: "netshape stop" },
          { id: "cli-test", label: "netshape test" },
          { id: "cli-profiles", label: "netshape profiles" },
          { id: "cli-metrics", label: "netshape metrics" },
          { id: "cli-rule", label: "netshape rule" },
          { id: "cli-scenario", label: "netshape scenario" },
          { id: "cli-setup", label: "netshape setup" },
        ],
      },
      { id: "web-dashboard", label: "Web Dashboard" },
      { id: "throttle-parameters", label: "Throttle Parameters" },
    ],
  },
  {
    label: "Guides",
    items: [
      { id: "per-endpoint-rules", label: "Per-Endpoint Rules" },
      { id: "scenarios", label: "Scenarios" },
      {
        id: "compatibility-guide", label: "Compatibility Guide", children: [
          { id: "compat-python", label: "Python Apps" },
          { id: "compat-node", label: "Node.js Apps" },
          { id: "compat-electron", label: "Electron Apps" },
          { id: "compat-multi", label: "Multi-Service Apps" },
          { id: "compat-does-not-work", label: "What Doesn't Work" },
        ],
      },
      { id: "data-and-logs", label: "Data & Logs" },
      { id: "faq", label: "FAQ" },
    ],
  },
];

function flattenIds(groups: TocGroup[]): string[] {
  return groups.flatMap((g) =>
    g.items.flatMap((item) => [item.id, ...(item.children?.map((c) => c.id) ?? [])])
  );
}

const allSectionIds = flattenIds(tocGroups);

function SidebarParent({
  item,
  activeId,
  onNavigate,
}: {
  item: TocItem;
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasActiveChild = item.children?.some((c) => c.id === activeId);
  const isActive = hasActiveChild || activeId === item.id;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "w-full flex items-center gap-1 py-1.5 text-sm font-sans transition-colors border-l-2 pl-3 text-left",
          isActive
            ? "text-accent-green border-accent-green"
            : "text-gray-400 border-transparent hover:text-gray-200 hover:border-terminal-dim"
        )}
      >
        <span className="flex-1">{item.label}</span>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {open && item.children && (
        <div className="ml-4 mt-0.5">
          {item.children.map((child) => (
            <a
              key={child.id}
              href={`#${child.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(child.id);
              }}
              className={clsx(
                "block py-1 text-xs font-sans transition-colors border-l-2 pl-3",
                activeId === child.id
                  ? "text-accent-green border-accent-green"
                  : "text-gray-500 border-transparent hover:text-gray-300 hover:border-terminal-dim"
              )}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarLink({
  item,
  activeId,
  onNavigate,
}: {
  item: TocItem;
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <a
      href={`#${item.id}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.id);
      }}
      className={clsx(
        "block py-1.5 text-sm font-sans transition-colors border-l-2 pl-3",
        activeId === item.id
          ? "text-accent-green border-accent-green"
          : "text-gray-400 border-transparent hover:text-gray-200 hover:border-terminal-dim"
      )}
    >
      {item.label}
    </a>
  );
}

// --- Main component ---

export function DocsContent() {
  const { activeId, navigateTo: scrollTo } = useScrollSpy(allSectionIds);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (id: string) => {
    setSidebarOpen(false);
    scrollTo(id);
  };

  const renderSidebarItem = (item: TocItem) => {
    if (item.children) {
      return (
        <SidebarParent
          key={item.id}
          item={item}
          activeId={activeId}
          onNavigate={handleNavigate}
        />
      );
    }
    return (
      <SidebarLink
        key={item.id}
        item={item}
        activeId={activeId}
        onNavigate={handleNavigate}
      />
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed bottom-4 left-4 z-50 lg:hidden px-4 py-2 rounded-lg bg-terminal-surface border border-terminal-border text-accent-green font-mono text-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "× Close" : "≡ Menu"}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-64 bg-terminal-bg border-r border-terminal-border overflow-y-auto transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4">
          <p className="font-mono text-accent-green text-xs mb-4 uppercase tracking-wider">Documentation</p>
          {tocGroups.map((group, gi) => (
            <div key={group.label} className={gi > 0 ? "mt-6" : ""}>
              <p className="font-mono text-[10px] uppercase tracking-wider text-gray-600 mb-2">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map(renderSidebarItem)}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-12 lg:pl-[calc(16rem+1.5rem)]">
        <p className="font-mono text-accent-green text-sm mb-2">$ netshape --docs</p>
        <h1 className="font-sans text-4xl font-bold text-white mb-3">Complete Documentation</h1>
        <p className="text-gray-400 text-lg font-sans mb-12">
          NetShape is a local throttling proxy for simulating degraded network conditions.
          It wraps any app or command, injecting latency, bandwidth limits, packet loss, and jitter
          so you can test how your software behaves on slow, flaky, or unreliable connections.
        </p>

        {/* How It Works */}
        <Section id="how-it-works" title="How It Works">
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            NetShape starts a local HTTP/HTTPS forward proxy on your machine and launches your app as a child process.
            The child process inherits three environment variables:
          </p>
          <Code>{`HTTP_PROXY=http://127.0.0.1:8090
HTTPS_PROXY=http://127.0.0.1:8090
ALL_PROXY=http://127.0.0.1:8090`}</Code>
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            Any standard HTTP client that respects these variables will automatically send all traffic through the proxy.
            NetShape then applies the configured throttle settings — delaying packets, capping throughput, randomly dropping data —
            before forwarding to the real destination.
          </p>
          <div className="rounded-lg border border-terminal-border bg-terminal-surface p-4 my-4">
            <p className="text-accent-amber font-sans text-sm mb-2">
              <strong>Python / LiteLLM users:</strong>
            </p>
            <p className="text-gray-400 font-sans text-sm leading-relaxed">
              <code className="text-accent-cyan font-mono text-xs">ALL_PROXY</code> is intentionally set to an <code className="text-accent-green font-mono text-xs">http://</code> URL
              (not <code className="text-accent-green font-mono text-xs">socks5://</code>). This means Python libraries like <code className="text-accent-green font-mono text-xs">httpx</code>,{" "}
              <code className="text-accent-green font-mono text-xs">LiteLLM</code>, and <code className="text-accent-green font-mono text-xs">openai</code> work without installing
              any extra packages (<code className="text-accent-green font-mono text-xs">socksio</code> is not required).
            </p>
          </div>
          <Code>{`Your App  ──→  NetShape Proxy (127.0.0.1:8090)  ──→  Internet
                ↑ bandwidth cap
                ↑ latency injection
                ↑ packet loss
                ↑ jitter`}</Code>
          <p className="text-gray-300 font-sans leading-relaxed">
            A second port (8091 by default) hosts the control API and the web dashboard.
          </p>
        </Section>

        {/* Installation */}
        <Section id="installation" title="Installation">
          <SubSection id="install-requirements" title="Requirements">
            <ul className="space-y-2 text-gray-300 font-sans mb-4">
              <li>• Python 3.10 or later</li>
              <li>• pip</li>
            </ul>
          </SubSection>
          <SubSection id="install-global" title="Global install (recommended for CLI use)">
            <Code>{`pip install netshape`}</Code>
          </SubSection>
          <SubSection id="install-venv" title="Inside a virtual environment">
            <Code>{`python -m venv .venv
# Windows
.venv\\Scripts\\activate
# macOS / Linux
source .venv/bin/activate

pip install netshape`}</Code>
            <div className="rounded-lg border border-terminal-border bg-terminal-surface p-4 my-4">
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                If installed in a virtual environment, the <code className="text-accent-green font-mono text-xs">netshape</code> command
                is only available while that environment is activated. Install globally if you want it available in any terminal.
              </p>
            </div>
          </SubSection>
          <SubSection id="install-verify" title="Verify the installation">
            <Code>{`netshape --version`}</Code>
          </SubSection>
        </Section>

        {/* First-Time Setup */}
        <Section id="first-time-setup" title="First-Time Setup">
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            After installing, run the interactive setup wizard once to choose your preferences:
          </p>
          <Code>{`netshape setup`}</Code>
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            The wizard presents two selection menus:
          </p>
          <p className="text-white font-sans font-semibold mb-2">Feature selection</p>
          <Code>{`┌─────────────────────────────────────────────────────────────┐
│  1  Core CLI only        Terminal commands, no browser UI   │
│  2  CLI + Web Dashboard  Visual controls, live graphs, ...  │
└─────────────────────────────────────────────────────────────┘`}</Code>
          <ul className="space-y-2 text-gray-300 font-sans mb-6">
            <li>• <strong className="text-white">Core CLI only</strong> — installs the lightest footprint. All terminal commands work fully; the dashboard URL is simply not served.</li>
            <li>• <strong className="text-white">CLI + Web Dashboard</strong> — enables the browser UI at <code className="text-accent-green font-mono text-xs">http://127.0.0.1:8091/dashboard</code> whenever a session is active.</li>
          </ul>
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            You also pick a default throttle profile. Your choices are saved to <code className="text-accent-green font-mono text-xs">~/.netshape/config.json</code>.
            Re-run <code className="text-accent-green font-mono text-xs">netshape setup</code> at any time to change them.
          </p>
        </Section>

        {/* Quick Start */}
        <Section id="quick-start" title="Quick Start">
          <Code>{`# 1. (First time only) run the setup wizard
netshape setup

# 2. Run your app through a 3G profile
netshape run --profile 3g -- python app.py

# 3. In a separate terminal, check what's happening
netshape status --watch

# 4. Change conditions live (no restart needed)
netshape adjust --profile satellite

# 5. Stop the session
netshape stop`}</Code>
        </Section>

        {/* Built-in Profiles */}
        <Section id="built-in-profiles" title="Built-in Profiles">
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            Profiles are named presets covering common real-world network conditions.
          </p>
          <Table
            headers={["Profile", "Bandwidth", "Latency", "Loss", "Jitter", "Description"]}
            rows={[
              ["2g", "50 kbps", "500 ms", "2%", "150 ms", "Typical 2G mobile"],
              ["3g", "780 kbps", "200 ms", "1%", "60 ms", "Typical 3G mobile"],
              ["4g", "4 Mbps", "80 ms", "0.3%", "25 ms", "Typical 4G LTE"],
              ["5g", "50 Mbps", "30 ms", "0.1%", "10 ms", "Fast mobile"],
              ["edge", "240 kbps", "400 ms", "3%", "120 ms", "Very slow mobile EDGE"],
              ["wifi", "30 Mbps", "25 ms", "0.1%", "8 ms", "Common home Wi-Fi"],
              ["dsl", "6 Mbps", "60 ms", "0.2%", "20 ms", "Older DSL broadband"],
              ["cable", "100 Mbps", "20 ms", "0.05%", "5 ms", "Residential cable"],
              ["fiber", "1 Gbps", "5 ms", "0%", "2 ms", "Fast wired fiber"],
              ["satellite", "12 Mbps", "650 ms", "0.5%", "80 ms", "High-latency satellite"],
              ["congested", "1.5 Mbps", "180 ms", "2.5%", "140 ms", "Busy shared network"],
              ["offline", "0", "0 ms", "100%", "0 ms", "All traffic dropped"],
            ]}
          />
          <p className="text-gray-300 font-sans leading-relaxed">
            List them at any time:
          </p>
          <Code>{`netshape profiles`}</Code>
        </Section>

        {/* CLI Reference */}
        <Section id="cli-reference" title="CLI Reference">
          <SubSection id="cli-run" title="netshape run">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Starts a proxy session and launches your app as a child process. Everything after <code className="text-accent-green font-mono text-xs">--</code> is the command to run.
            </p>
            <Table
              headers={["Option", "Short", "Description", "Default"]}
              rows={[
                ["--profile", "-p", "Built-in profile name", "—"],
                ["--bandwidth", "-b", "Bandwidth limit (1mbps, 500kbps)", "—"],
                ["--latency", "-l", "Added latency (200ms, 1s)", "—"],
                ["--loss", "", "Packet loss (2%, 0.5%)", "—"],
                ["--jitter", "-j", "Latency variance (50ms)", "—"],
                ["--timeout", "-t", "Auto-stop after duration. Units: s (seconds), m (minutes), h (hours). E.g. 30m, 1h, 90s", "—"],
                ["--port", "", "Proxy traffic port", "8090"],
                ["--log-file", "", "Write JSON logs to file (rotating, 10 MB)", "—"],
              ]}
            />
            <Code>{`# Use a profile
netshape run --profile 3g -- python app.py
netshape run --profile 4g -- node server.js
netshape run --profile satellite -- npx electron .

# Custom settings
netshape run --bandwidth 1mbps --latency 200ms --loss 1% -- python app.py

# Profile with one override
netshape run --profile 3g --latency 500ms -- python app.py

# Auto-stop after 30 minutes
netshape run --profile 3g --timeout 30m -- python app.py

# Save logs to file
netshape run --profile 3g --log-file proxy.log -- python app.py`}</Code>
          </SubSection>

          <SubSection id="cli-adjust" title="netshape adjust">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Applies new throttle settings to the currently running session live, with no restart needed.
            </p>
            <Table
              headers={["Option", "Short", "Description"]}
              rows={[
                ["--profile", "-p", "Switch to a built-in profile"],
                ["--bandwidth", "-b", "New bandwidth limit"],
                ["--latency", "-l", "New latency"],
                ["--loss", "", "New packet loss"],
                ["--jitter", "-j", "New jitter"],
              ]}
            />
            <Code>{`# Switch profile
netshape adjust --profile satellite

# Adjust individual values
netshape adjust --bandwidth 500kbps
netshape adjust --latency 800ms
netshape adjust --loss 5%
netshape adjust --jitter 100ms

# Remove all throttling
netshape adjust --bandwidth 0 --latency 0 --loss 0 --jitter 0`}</Code>
          </SubSection>

          <SubSection id="cli-status" title="netshape status">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Shows the current session status.
            </p>
            <Table
              headers={["Option", "Description"]}
              rows={[
                ["--watch, -w", "Live-updating table, refreshes every second"],
                ["--json", "Output raw JSON"],
              ]}
            />
          </SubSection>

          <SubSection id="cli-stop" title="netshape stop">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Stops the active session and terminates the child process.
            </p>
            <Code>{`netshape stop`}</Code>
          </SubSection>

          <SubSection id="cli-test" title="netshape test">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Verifies the proxy is correctly intercepting traffic by running a local speed test.
            </p>
            <Code>{`netshape test                   # quick verification
netshape test --profile 3g      # test under 3G conditions`}</Code>
          </SubSection>

          <SubSection id="cli-profiles" title="netshape profiles">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Lists all built-in profiles with their parameters.
            </p>
            <Code>{`netshape profiles`}</Code>
          </SubSection>

          <SubSection id="cli-metrics" title="netshape metrics">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Shows detailed proxy metrics.
            </p>
            <Table
              headers={["Option", "Description"]}
              rows={[["--prometheus, -p", "Output in Prometheus text exposition format"]]}
            />
          </SubSection>

          <SubSection id="cli-rule" title="netshape rule">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Manages per-endpoint throttle rules. Rules let you apply different throttle settings to specific domains or URL patterns.
            </p>
            <Code>{`# Add a rule
netshape rule add stripe\\.com --bandwidth 1mbps --latency 200ms --comment "payment API"

# List rules
netshape rule list
netshape rule list --json

# Enable/disable
netshape rule enable "payment API"
netshape rule disable "payment API"

# Remove
netshape rule remove "payment API"`}</Code>
          </SubSection>

          <SubSection id="cli-scenario" title="netshape scenario">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Runs a sequence of network condition phases automatically over time.
            </p>
            <Table
              headers={["Option", "Description"]}
              rows={[
                ["--no-wait", "Submit the scenario and return immediately (useful in CI scripts)"],
              ]}
            />
            <Code>{`# List scenarios
netshape scenario list

# Run a built-in scenario
netshape scenario run --builtin subway

# Start scenario without blocking the terminal
netshape scenario run --builtin subway --no-wait

# Run from a YAML file
netshape scenario run ./my-scenario.yaml

# Check status / stop
netshape scenario status
netshape scenario stop`}</Code>
          </SubSection>

          <SubSection id="cli-setup" title="netshape setup">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Interactive first-time setup wizard. Configures which features are enabled and your default throttle profile.
            </p>
            <Code>{`netshape setup`}</Code>
            <p className="text-gray-300 font-sans leading-relaxed mb-4 mt-4">
              Config file at <code className="text-accent-green font-mono text-xs">~/.netshape/config.json</code>:
            </p>
            <Code>{`{
  "dashboard": true,
  "default_profile": "3g"
}`}</Code>
          </SubSection>
        </Section>

        {/* Web Dashboard */}
        <Section id="web-dashboard" title="Web Dashboard">
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            The dashboard is an optional live web UI built into the proxy. It gives full visual control over all settings.
          </p>
          <h4 className="text-white font-sans font-semibold mb-2">Enabling the Dashboard</h4>
          <Code>{`netshape setup
# → choose option 2: "CLI + Web Dashboard"`}</Code>
          <p className="text-gray-300 font-sans leading-relaxed mb-4 mt-4">
            Open it at <code className="text-accent-green font-mono text-xs">http://127.0.0.1:8091/dashboard</code>
          </p>
          <h4 className="text-white font-sans font-semibold mb-2">Dashboard Sections</h4>
          <ul className="space-y-2 text-gray-300 font-sans mb-4">
            <li>• <strong className="text-white">Live Metrics</strong> — Real-time download/upload speed graphs, active throttle readings, connection status</li>
            <li>• <strong className="text-white">Controls</strong> — Sliders for bandwidth, latency, loss, jitter; profile dropdown; apply button</li>
            <li>• <strong className="text-white">Per-Endpoint Rules</strong> — Add, toggle, and remove domain-specific rules</li>
            <li>• <strong className="text-white">Scenarios</strong> — Run built-in or custom scenarios; build custom ones</li>
            <li>• <strong className="text-white">Logs</strong> — Live proxy activity log</li>
          </ul>
        </Section>

        {/* Throttle Parameters */}
        <Section id="throttle-parameters" title="Throttle Parameters">
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-sans font-semibold mb-2">Bandwidth</h4>
              <p className="text-gray-300 font-sans leading-relaxed">
                Caps the maximum throughput in each direction using a token bucket algorithm.
                Short bursts above the limit are absorbed, sustained transfer is capped.
              </p>
            </div>
            <div>
              <h4 className="text-white font-sans font-semibold mb-2">Latency</h4>
              <p className="text-gray-300 font-sans leading-relaxed">
                Adds a fixed delay to each packet in both directions.
                <strong className="text-accent-amber"> Key insight:</strong> Latency multiplies across round trips.
                At 300ms, a TLS handshake (3 RTTs) costs ~900ms before a byte of data transfers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-sans font-semibold mb-2">Loss</h4>
              <p className="text-gray-300 font-sans leading-relaxed">
                Randomly drops a percentage of packets. TCP will retransmit dropped packets, causing stalls.
                Even 5% loss with 200ms latency causes TCP retransmit storms and drastic throughput collapse.
              </p>
            </div>
            <div>
              <h4 className="text-white font-sans font-semibold mb-2">Jitter</h4>
              <p className="text-gray-300 font-sans leading-relaxed">
                Varies the latency randomly ± the jitter value on each packet.
                Causes unpredictable response times, streaming stutter, and WebSocket lag spikes.
              </p>
            </div>
          </div>
        </Section>

        {/* Per-Endpoint Rules */}
        <Section id="per-endpoint-rules" title="Per-Endpoint Rules">
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            Per-endpoint rules let you apply different throttle settings to specific hosts or URL patterns,
            overriding the global session settings for matched traffic.
          </p>
          <h4 className="text-white font-sans font-semibold mb-2">How Matching Works</h4>
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            The <code className="text-accent-green font-mono text-xs">pattern</code> field is a regular expression matched against
            the target host (for CONNECT tunnels) or the full URL (for direct HTTP). Matching is case-insensitive.
          </p>
          <Code>{`# Match exact domain
netshape rule add "stripe\\.com"

# Match any subdomain
netshape rule add "\\.supabase\\.co"

# Match multiple services
netshape rule add "openai\\.com|anthropic\\.com"`}</Code>
          <h4 className="text-white font-sans font-semibold mb-2 mt-6">Persistence</h4>
          <p className="text-gray-300 font-sans leading-relaxed">
            Rules are saved to <code className="text-accent-green font-mono text-xs">~/.netshape/rules.json</code> automatically.
            When you start a new session, all saved rules are restored — in the disabled state by default.
          </p>
        </Section>

        {/* Scenarios */}
        <Section id="scenarios" title="Scenarios">
          <p className="text-gray-300 font-sans leading-relaxed mb-4">
            Scenarios automate a sequence of network conditions over time.
          </p>
          <h4 className="text-white font-sans font-semibold mb-2">Writing a Custom Scenario File</h4>
          <Code>{`name: "Flakey Mobile Connection"
description: "Starts decent, degrades, goes offline, recovers."

phases:
  - name: "Good Start"
    duration: "30s"
    profile: "4g"
  - name: "Degrading"
    duration: "20s"
    bandwidth: "500kbps"
    latency: "300ms"
    loss: "3%"
    jitter: "80ms"
  - name: "Offline"
    duration: "10s"
    bandwidth: 0
    loss: "100%"
  - name: "Slow Recovery"
    duration: "20s"
    profile: "edge"
  - name: "Recovered"
    duration: "30s"
    profile: "3g"`}</Code>
          <p className="text-gray-300 font-sans leading-relaxed mb-4 mt-4">
            Save the file to <code className="text-accent-green font-mono text-xs">~/.netshape/scenarios/</code> to make it available in the CLI and dashboard.
          </p>
          <h4 className="text-white font-sans font-semibold mb-2 mt-6">Built-in Scenarios</h4>
          <Table
            headers={["Name", "Description"]}
            rows={[
              ["subway", "Platform (4G) → tunnel (dead zone) → re-emergence (2G) → platform (4G)"],
              ["coffee-shop-wifi", "Quiet café (fast) → lunch rush (congested) → peak (packet-loss hell) → afternoon (recovering)"],
              ["satellite", "High-bandwidth but very high latency, simulating a satellite link"],
              ["flight-mode", "Normal → airplane mode (offline) → reconnect"],
            ]}
          />
        </Section>

        {/* Compatibility Guide */}
        <Section id="compatibility-guide" title="Compatibility Guide">
          <SubSection id="compat-what" title="What Gets Throttled">
            <p className="text-gray-300 font-sans leading-relaxed">
              NetShape throttles HTTP and HTTPS traffic routed through the proxy. This covers the vast majority of modern app traffic.
            </p>
          </SubSection>

          <SubSection id="compat-python" title="Python Apps">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              All standard HTTP libraries respect <code className="text-accent-green font-mono text-xs">HTTP_PROXY</code> automatically — no code changes needed.
            </p>
            <Table
              headers={["Library", "Throttled?"]}
              rows={[
                ["requests", "Yes"],
                ["httpx", "Yes"],
                ["aiohttp", "Yes"],
                ["urllib / urllib2", "Yes"],
                ["openai SDK", "Yes"],
                ["anthropic SDK", "Yes"],
                ["supabase-py", "Yes"],
                ["boto3 (AWS)", "Yes"],
              ]}
            />
          </SubSection>

          <SubSection id="compat-node" title="Node.js Apps">
            <Table
              headers={["Library / Runtime", "Throttled?", "Notes"]}
              rows={[
                ["axios", "Yes", ""],
                ["node-fetch / fetch (Node 18+)", "Yes", ""],
                ["got", "Yes", ""],
                ["undici", "Yes", ""],
                ["OpenAI Node SDK", "Yes", ""],
                ["http.get() / https.get() (native)", "No", "Requires http-proxy-agent (HTTP) or https-proxy-agent (HTTPS) npm packages"],
                ["supabase-js (Node server-side)", "Yes", ""],
              ]}
            />
          </SubSection>

          <SubSection id="compat-electron" title="Electron Apps">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Electron has two traffic paths. The renderer process uses Chromium's network stack and ignores <code className="text-accent-green font-mono text-xs">HTTP_PROXY</code> — you must configure it via <code className="text-accent-green font-mono text-xs">session.setProxy()</code>.
            </p>
            <Code>{`import { app, BrowserWindow, session } from 'electron';

async function applyProxySettings() {
  const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
  if (proxyUrl) {
    const { host } = new URL(proxyUrl);
    await session.defaultSession.setProxy({ proxyRules: host });
  }
}

app.whenReady().then(async () => {
  await applyProxySettings();
  createWindow();
});`}</Code>

            <div className="rounded-lg border border-terminal-border bg-terminal-surface p-4 my-4">
              <p className="text-accent-amber font-sans text-sm mb-3">
                <strong>Common mistake — wrong order</strong>
              </p>
              <Code className="mt-2">{`// ❌ Wrong — window opens before proxy is configured
app.whenReady().then(() => {
  createWindow();           // renderer starts without proxy
  applyProxySettings();     // too late, renderer ignores this
});

// ✅ Correct — proxy configured before window opens
app.whenReady().then(async () => {
  await applyProxySettings();  // proxy first
  createWindow();
});`}</Code>
            </div>

            <div className="rounded-lg border border-terminal-border bg-terminal-surface p-4 my-4">
              <p className="text-accent-amber font-sans text-sm">
                Do not use <code className="text-accent-green font-mono text-xs">npm run dev</code> (Vite dev server). Build first and launch Electron directly:
              </p>
              <Code className="mt-2">{`npm run build
netshape run --profile 3g -- npx electron .`}</Code>
            </div>

            <h4 className="text-white font-sans font-semibold mb-2 mt-6">Verify the proxy is intercepting renderer traffic</h4>
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              After launching with <code className="text-accent-green font-mono text-xs">netshape run</code>, open the NetShape dashboard or run{" "}
              <code className="text-accent-green font-mono text-xs">netshape status --watch</code> in another terminal.
              Then trigger a network request from the renderer. You should see <strong className="text-white">Requests handled</strong> increment immediately.
            </p>

            <Code>{`// Quick smoke test — paste in Electron DevTools (Ctrl+Shift+I)
fetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(data => {
    console.log('✓ Request succeeded — check NetShape dashboard for traffic');
    console.log(data);
  })
  .catch(err => console.error('✗ Request failed:', err));`}</Code>

            <ul className="space-y-2 text-gray-300 font-sans mb-4 mt-4">
              <li>• Dashboard at <code className="text-accent-green font-mono text-xs">http://127.0.0.1:8091/dashboard</code> → "Requests handled" should increment</li>
              <li>• <code className="text-accent-green font-mono text-xs">netshape status --watch</code> → "Connections active" should be &gt; 0 during a request</li>
              <li>• If "Requests handled" stays at 0 → <code className="text-accent-green font-mono text-xs">applyProxySettings()</code> is not running before <code className="text-accent-green font-mono text-xs">createWindow()</code></li>
              <li>• If requests fail entirely → check that <code className="text-accent-green font-mono text-xs">session.defaultSession.setProxy()</code> resolved before the request was made</li>
            </ul>
          </SubSection>

          <SubSection id="compat-multi" title="Multi-Service Apps (Electron + Python backend)">
            <p className="text-gray-300 font-sans leading-relaxed mb-4">
              Launch each process through its own <code className="text-accent-green font-mono text-xs">netshape run</code> in separate terminals.
            </p>
            <Code>{`# Terminal 1 — Electron frontend
netshape run --profile 3g -- npx electron .

# Terminal 2 — Python backend
netshape run --profile 3g -- python -m uvicorn app.main:app`}</Code>
          </SubSection>

          <SubSection id="compat-does-not-work" title="What Doesn't Work">
            <Table
              headers={["Traffic type", "Example", "Why"]}
              rows={[
                ["Raw TCP sockets", "Self-hosted Redis, MongoDB driver", "Not HTTP"],
                ["UDP", "DNS, VoIP, game servers, QUIC", "Not TCP/HTTP"],
                ["WebRTC", "Video calls, peer-to-peer", "UDP/DTLS"],
                ["gRPC (some configs)", "gRPC over HTTP/2 works", "Depends on transport"],
                ["Browser-side traffic", "Chrome/Firefox without system proxy", "Browser ignores env vars"],
              ]}
            />
          </SubSection>
        </Section>

        {/* Data & Logs (merged Log Files + Persistence) */}
        <Section id="data-and-logs" title="Data &amp; Logs">
          <SubSection id="data-logs-files" title="Log Files">
            <Code>{`netshape run --profile 3g --log-file proxy.log -- python app.py`}</Code>
            <p className="text-gray-300 font-sans leading-relaxed mt-4">
              Each line is a JSON object. Log files rotate at 10 MB, keeping 3 backup files.
            </p>
          </SubSection>

          <SubSection id="data-logs-persistence" title="Persistence">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-sans font-semibold mb-2">Rules</h4>
                <p className="text-gray-300 font-sans leading-relaxed">
                  Automatically saved to <code className="text-accent-green font-mono text-xs">~/.netshape/rules.json</code>. Restored on new sessions — always in disabled state.
                </p>
              </div>
              <div>
                <h4 className="text-white font-sans font-semibold mb-2">User Scenarios</h4>
                <p className="text-gray-300 font-sans leading-relaxed">
                  Scenario files saved to <code className="text-accent-green font-mono text-xs">~/.netshape/scenarios/</code> are automatically discovered.
                </p>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* FAQ */}
        <Section id="faq" title="FAQ">
          <div className="space-y-8">
            <div>
              <h4 className="text-white font-sans font-semibold mb-2">Do I need to change my app's code?</h4>
              <p className="text-gray-300 font-sans leading-relaxed">
                For most apps — no. Python, Node.js, Go, Ruby, and PHP HTTP clients all respect <code className="text-accent-green font-mono text-xs">HTTP_PROXY</code> env vars automatically. Electron apps require a one-time code change.
              </p>
            </div>
            <div>
              <h4 className="text-white font-sans font-semibold mb-2">Will NetShape throttle LLM streaming responses?</h4>
              <p className="text-gray-300 font-sans leading-relaxed">
                Yes. Streaming token responses are especially interesting to throttle — tokens trickle in slowly under low bandwidth, and high latency delays the first token. No code changes needed for any Python or Node.js OpenAI/Anthropic SDK.
              </p>
            </div>
            <div>
              <h4 className="text-white font-sans font-semibold mb-2">Can I run multiple sessions at the same time?</h4>
              <p className="text-gray-300 font-sans leading-relaxed">
                Yes — one per service, each in its own terminal. Each session auto-selects its own proxy port (8090, 8092, 8094, ...) and control port (8091, 8093, 8095, ...).
              </p>
            </div>
            <div>
              <h4 className="text-white font-sans font-semibold mb-2">Can I use NetShape in CI?</h4>
              <p className="text-gray-300 font-sans leading-relaxed">
                Yes. Run your test command through NetShape — <code className="text-accent-green font-mono text-xs">netshape run --profile 3g -- pytest</code>. The session exits automatically when the test finishes.
              </p>
            </div>
          </div>
        </Section>

        <div className="border-t border-terminal-border pt-12 mt-20 text-center">
          <p className="text-gray-500 text-sm font-mono">NetShape v1.0.1 — MIT License</p>
        </div>
      </div>
    </div>
  );
}
