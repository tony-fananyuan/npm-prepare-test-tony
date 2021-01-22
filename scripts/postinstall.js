#!/usr/bin/env node

const cp = require("child_process");

cp.execSync(`git config core.attributesfile "~/.gitattributes"`);

cp.execSync(
  `git config merge.custom.name "custom merge driver for specific files"`
);

cp.execSync(
  `git config merge.custom.driver "yarn auto-merge-json %A %O %B %P"`
);
