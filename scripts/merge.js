#!/usr/bin/env node

function start() {
  console.info("resolve conflict.....");
  const { readFileSync, writeFileSync } = require("fs");
  const { minVersion, gt } = require("semver");
  const argv = process.argv;
  const oursPath = argv[2];
  const theirsPath = argv[4];
  const oursJson = JSON.parse(readFileSync(oursPath));
  const theirsJson = JSON.parse(readFileSync(theirsPath));
  const oursJsonDependenciesKeys = Object.keys(oursJson.dependencies);
  const oursJsonDevDependenciesKeys = Object.keys(oursJson.devDependencies);

  const theirsJsonDependenciesKeys = Object.keys(theirsJson.dependencies);
  const theirsJsonDevDependenciesKeys = Object.keys(theirsJson.devDependencies);

  const uniqueDependenciesKeys = [
    ...new Set([...oursJsonDependenciesKeys, ...theirsJsonDependenciesKeys]),
  ];

  const uniqueDevDependenciesKeys = [
    ...new Set([
      ...oursJsonDevDependenciesKeys,
      ...theirsJsonDevDependenciesKeys,
    ]),
  ];

  const dependencies = {};

  const devDependencies = {};

  const unique = (keys, output, dependencies) => {
    keys.forEach((key) => {
      const version1 = oursJson[dependencies][key];
      const version2 = theirsJson[dependencies][key];
      if (!version1 || !version2) {
        output[key] = version1 || version2;
      } else {
        const rawVersion1 = minVersion(version1).version;
        const rawVersion2 = minVersion(version2).version;
        output[key] = gt(rawVersion1, rawVersion2) ? version1 : version2;
      }
    });
  };

  unique(uniqueDependenciesKeys, dependencies, "dependencies");
  unique(uniqueDevDependenciesKeys, devDependencies, "devDependencies");

  oursJson.dependencies = dependencies;
  oursJson.devDependencies = devDependencies;
  writeFileSync(oursPath, JSON.stringify(oursJson));
  console.info(
    "package.json文件dependencies和devDependencies已自动合并完成，该文件其他字段以ours为主，请手动check其他字段..."
  );
}

start();
