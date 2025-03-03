#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

async function setupMCP(directory) {
  console.log(chalk.cyan('\n🚀 MCP Cursor Companion Setup\n'));
  
  try {
    // Create necessary directories
    const mcpDir = path.join(directory, '.mcp');
    const rulesDir = path.join(directory, '.cursor/rules');
    await fs.ensureDir(mcpDir);
    await fs.ensureDir(rulesDir);
    
    // Initialize memory file
    const memoryFile = path.join(mcpDir, 'ai_memory.json');
    if (!await fs.pathExists(memoryFile)) {
      await fs.writeJson(memoryFile, { entries: [] }, { spaces: 2 });
    }
    
    // Create basic rule file
    const ruleFile = path.join(rulesDir, 'companion.mdc');
    await fs.writeFile(ruleFile, `# MCP Cursor Companion\n\nEnhancing your coding experience with AI collaboration.`);
    
    console.log(chalk.green('\n✅ Setup completed successfully!\n'));
    console.log('Next steps:');
    console.log('1. Restart Cursor IDE');
    console.log('2. Start coding with enhanced AI assistance\n');
    
    return true;
  } catch (error) {
    console.error(chalk.red('Error during setup:'), error.message);
    return false;
  }
}

// Run setup
setupMCP(process.cwd()); 