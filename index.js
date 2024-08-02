#!/usr/bin/env node

const chalk = require('chalk');
const { program } = require('commander');

program.command('convert')
  .option('--hex <hex>')
  .option('--rgb <rgb>')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });;

program.parse();