#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

async function setupMCP(directory) {
  console.log(chalk.cyan('\n🚀 MCP Cursor Companion Setup\n'));
  
  const spinner = ora('Initializing MCP setup...').start();
  
  try {
    // Create necessary directories
    const mcpDir = path.join(directory, '.mcp');
    const rulesDir = path.join(directory, '.cursor/rules');
    
    spinner.text = 'Creating MCP directories...';
    await fs.ensureDir(mcpDir);
    await fs.ensureDir(rulesDir);
    
    // Initialize memory file
    const memoryFile = path.join(mcpDir, 'ai_memory.json');
    if (!await fs.pathExists(memoryFile)) {
      spinner.text = 'Initializing AI memory system...';
      await fs.writeJson(memoryFile, { 
        entries: [],
        lastUpdated: new Date().toISOString(),
        version: '1.0.0'
      }, { spaces: 2 });
    }
    
    // Create basic rule file
    const ruleFile = path.join(rulesDir, 'companion.mdc');
    spinner.text = 'Setting up collaboration rules...';
    await fs.writeFile(ruleFile, `# MCP Cursor Companion

## Enhanced AI Collaboration
This setup enables advanced AI collaboration features in your Cursor IDE:

1. **Context-Aware Assistance**
   - AI understands your project structure
   - Maintains conversation history
   - Provides relevant suggestions

2. **Smart Code Generation**
   - Generates code based on project context
   - Follows your coding style
   - Maintains consistency

3. **Project-Specific Knowledge**
   - Learns from your codebase
   - Provides domain-specific suggestions
   - Adapts to your workflow

## Getting Started
1. Restart Cursor IDE to activate new features
2. Use the AI command palette (Cmd/Ctrl + Shift + A)
3. Ask questions about your code
4. Request code generation or modifications

## Tips for Best Results
- Be specific in your requests
- Provide context when needed
- Use the AI command palette for quick access
- Review generated code before applying

Enjoy enhanced AI collaboration! 🚀`);
    
    spinner.succeed('Setup completed successfully!');
    
    console.log(chalk.green('\n✨ MCP Cursor Companion is ready! ✨\n'));
    console.log(chalk.cyan('What\'s New:'));
    console.log('1. Enhanced AI Context Management');
    console.log('2. Project-Specific Knowledge Base');
    console.log('3. Smart Code Generation');
    console.log('4. Improved Collaboration Features\n');
    
    console.log(chalk.cyan('Next Steps:'));
    console.log('1. Restart Cursor IDE to activate new features');
    console.log('2. Use Cmd/Ctrl + Shift + A to access AI features');
    console.log('3. Start coding with enhanced AI assistance\n');
    
    console.log(chalk.yellow('💡 Pro Tip:'));
    console.log('The AI companion learns from your codebase over time.');
    console.log('The more you use it, the better it becomes at helping you!\n');
    
    return true;
  } catch (error) {
    spinner.fail('Setup failed');
    console.error(chalk.red('\nError during setup:'), error.message);
    console.log(chalk.yellow('\nTroubleshooting:'));
    console.log('1. Ensure you have write permissions in the project directory');
    console.log('2. Check if Cursor IDE is properly installed');
    console.log('3. Try running the command with administrator privileges\n');
    return false;
  }
}

// Export the setupMCP function
module.exports = setupMCP;

// Run setup if called directly
if (require.main === module) {
  setupMCP(process.cwd());
} 