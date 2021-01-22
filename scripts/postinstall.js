#!/usr/bin/env node

const cp = require("child_process");

cp.execSync(
  `git config merge.custom.name "custom merge driver for specific files"`
);
