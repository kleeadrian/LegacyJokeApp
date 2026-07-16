const [major] = process.versions.node.split(".");
if (major !== "26") {
  console.error(`This app requires Node.js 26.x (found ${process.version}).`);
  process.exit(1);
}
