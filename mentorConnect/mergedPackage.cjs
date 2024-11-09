const fs = require("fs");

(async function mergePackages() {
  const package1 = JSON.parse(
    await fs.promises.readFile("package.json", "utf-8")
  );
  const package2 = JSON.parse(
    await fs.promises.readFile("package1.json", "utf-8")
  );

  const mergedPackage = {
    ...package1,
    ...package2,
    dependencies: {
      ...(package1.dependencies || {}),
      ...(package2.dependencies || {}),
    },
    devDependencies: {
      ...(package1.devDependencies || {}),
      ...(package2.devDependencies || {}),
    },
    scripts: {
      ...(package1.scripts || {}),
      ...(package2.scripts || {}),
    },
  };

  await fs.promises.writeFile(
    "package.json",
    JSON.stringify(mergedPackage, null, 2),
    "utf-8"
  );
  console.log("Merged package.json created successfully.");
})();
