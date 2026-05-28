type BannerOptions = {
  environment?: string;
  version?: string;
};

const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
};

function normalizeEnvironment(value?: string): string {
  const env =
    value || process.env.STELLAR_ENV || process.env.NODE_ENV || "development";

  if (/mainnet|production|prod/i.test(env)) return "Mainnet";
  if (/staging|stage/i.test(env)) return "Staging";
  if (/testnet|test/i.test(env)) return "Testnet";
  return env.charAt(0).toUpperCase() + env.slice(1);
}

export class BannerService {
  static render(options: BannerOptions = {}): string {
    const environment = normalizeEnvironment(options.environment);
    const version =
      options.version ||
      process.env.ENGINE_VERSION ||
      process.env.npm_package_version ||
      "0.0.0";

    const logo = [
      "  ____  _       _ _             _____ _               ",
      " / ___|| |_ ___| | | __ _ _ __|  ___| | _____      __",
      " \\___ \\| __/ _ \\ | |/ _` | '__| |_  | |/ _ \\ \\ /\\ / /",
      "  ___) | ||  __/ | | (_| | |  |  _| | | (_) \\ V  V / ",
      " |____/ \\__\\___|_|_|\\__,_|_|  |_|   |_|\\___/ \\_/\\_/  ",
    ];

    const rows = [
      `Environment : ${environment}`,
      `Engine      : v${version}`,
      `Runtime     : ${process.version}`,
    ];

    const width = Math.max(...rows.map((row) => row.length), 36);
    const top = `╭${"─".repeat(width + 2)}╮`;
    const bottom = `╰${"─".repeat(width + 2)}╯`;
    const body = rows.map((row) => `│ ${row.padEnd(width, " ")} │`).join("\n");

    return [
      "",
      `${ANSI.cyan}${ANSI.bold}${logo.join("\n")}${ANSI.reset}`,
      `${ANSI.magenta}${top}${ANSI.reset}`,
      `${ANSI.magenta}${body}${ANSI.reset}`,
      `${ANSI.magenta}${bottom}${ANSI.reset}`,
      `${ANSI.dim}Institutional Oracle Infrastructure • StellarFlow Network${ANSI.reset}`,
      "",
    ].join("\n");
  }

  static print(options: BannerOptions = {}): void {
    // eslint-disable-next-line no-console
    console.log(BannerService.render(options));
  }
}
