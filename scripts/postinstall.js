#!/usr/bin/env node

const cp = require("child_process");

cp.execSync(
  'npx npm-merge-driver install --driver="yarn auto-merge-json %A %O %B %P" --driver-name="custom-merge-package-json111" --files=["package.json"]'
);
