const fs = require("fs").promises;
const path = require("path");

const root = path.join(__dirname, "..");
const targets = [
  path.join(root, "app", "(en)"),
  path.join(root, "app", "ar"),
  path.join(root, "app", "projects", "[slug]")
];

(async function main() {
  for (const t of targets) {
    try {
      await fs.rm(t, { recursive: true, force: true });
      console.log("removed:", t);
    } catch (err) {
      console.warn("skip remove:", t, err.message);
    }
  }

  try {
    await fs.rm(path.join(root, ".next"), { recursive: true, force: true });
    console.log("removed: .next");
  } catch (e) {
    // ignore
  }
})();