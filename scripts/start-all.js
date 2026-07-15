import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32"
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

async function startAll() {
  console.log("Starting backend and frontend...\n");

  const backend = spawn("npm", ["start"], {
    cwd: path.join(rootDir, "backend"),
    stdio: "inherit",
    shell: process.platform === "win32"
  });

  const frontend = spawn("npm", ["start"], {
    cwd: path.join(rootDir, "frontend"),
    stdio: "inherit",
    shell: process.platform === "win32"
  });

  const shutdown = () => {
    backend.kill();
    frontend.kill();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

await startAll();
