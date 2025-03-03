#!/usr/bin/env node

const { program } = require('commander');
const { setupMCP, viewMemory, updateMemory, addMemoryEntry } = require('../index.js');

program
  .name('mcpCompanion')
  .description('Enhanced AI collaboration tool for Cursor IDE')
  .version('1.1.0');

program
  .command('setup')
  .description('Setup MCP for enhanced Cursor IDE collaboration')
  .action(() => {
    setupMCP(process.cwd());
  });

program
  .command('memory')
  .description('View the current AI memory structure')
  .option('-s, --section <section>', 'Specific memory section to view')
  .action((options) => {
    viewMemory(process.cwd(), options.section);
  });

program
  .command('update')
  .description('Update project information in AI memory')
  .option('-v, --version <version>', 'Update project version')
  .option('-f, --focus <focus>', 'Update development focus')
  .action((options) => {
    updateMemory(process.cwd(), options);
  });

program
  .command('add')
  .description('Add a new memory entry')
  .option('-t, --type <type>', 'Type of memory entry (feature, decision, session, etc.)')
  .option('-i, --interactive', 'Use interactive mode for adding entry')
  .action((options) => {
    addMemoryEntry(process.cwd(), options);
  });

program.parse(process.argv); 