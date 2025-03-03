#!/usr/bin/env node

const { program } = require('commander');
const setupMCP = require('../index.js');

program
  .name('mcp-companion')
  .description('Setup MCP for enhanced Cursor IDE collaboration')
  .version('1.0.0')
  .action(() => {
    setupMCP(process.cwd());
  });

program.parse(process.argv); 