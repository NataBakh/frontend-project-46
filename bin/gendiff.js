#!/usr/bin/env node
import { program } from 'commander'
import gendiff from '../src/index.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format')
  .action ((filepath1, filepath2, options) => {
    console.log(gendiff(filepath1, filepath2, options))
  })

program.parse()
