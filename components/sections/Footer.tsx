import { GitHubIcon } from "@/components/ui/GitHubIcon";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-terminal-border mt-16 sm:mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="text-center md:text-left">
          <p className="font-mono text-accent-green text-sm">netshape</p>
          <p className="text-gray-500 text-xs font-sans mt-1">
            Open source under MIT License
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/aarush-dhingra/netshape"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-1.5"
          >
            <GitHubIcon size={14} />
            GitHub
          </a>
          <a
            href="https://pypi.org/project/netshape/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm font-sans"
          >
            PyPI
          </a>
          <a
            href="https://github.com/aarush-dhingra/netshape/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm font-sans"
          >
            Issues
          </a>
        </div>

        <p className="text-gray-600 text-xs font-mono">
          Made for developers who test on real networks
        </p>

        <a
          href="#hero"
          className="text-gray-500 hover:text-accent-green transition-colors text-xs font-mono"
          aria-label="Back to top"
        >
          ↑ Top
        </a>
      </div>
    </footer>
  );
}
