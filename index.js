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
    
    // Initialize memory file with the enhanced structure
    const memoryFile = path.join(mcpDir, 'ai_memory.json');
    if (!await fs.pathExists(memoryFile)) {
      spinner.text = 'Initializing AI memory system...';
      
      // Get project info
      let projectName = path.basename(directory);
      try {
        const packagePath = path.join(directory, 'package.json');
        if (await fs.pathExists(packagePath)) {
          const packageJson = await fs.readJson(packagePath);
          projectName = packageJson.name || projectName;
        }
      } catch (error) {
        // Ignore errors, use directory name as fallback
      }
      
      // Initialize with enhanced memory structure
      await fs.writeJson(memoryFile, {
        project_overview: {
          name: projectName,
          description: "Project managed with MCP Cursor Companion",
          purpose: "To provide value through software",
          current_version: "1.0.0",
          key_technologies: [],
          last_updated: new Date().toISOString()
        },
        architecture: {
          components: [],
          data_flow: "",
          key_patterns: []
        },
        code_conventions: {
          naming: {
            variables: "camelCase",
            functions: "camelCase",
            classes: "PascalCase",
            constants: "UPPER_SNAKE_CASE",
            files: ""
          },
          structure: {},
          documentation: {}
        },
        user_interaction_guidelines: {
          communication_style: "Friendly, helpful, and technically precise",
          error_messages: "Clear explanations with suggested solutions",
          progress_indication: "Use visual indicators for long operations",
          common_user_needs: [],
          response_patterns: {}
        },
        feature_registry: [],
        decision_log: [],
        current_development_focus: {
          priority_features: [],
          known_issues: [],
          upcoming_changes: []
        },
        session_history: [],
        detailed_memories: [],
        ai_guidance: {
          context_retrieval_strategy: {
            user_question_mapping: {
              setup_questions: ["project_overview", "feature_registry", "session_history"],
              architecture_questions: ["architecture", "code_conventions", "decision_log"],
              feature_questions: ["feature_registry", "detailed_memories", "session_history"],
              code_assistance: ["code_conventions", "architecture", "detailed_memories"]
            },
            priority_information: "Always check project_overview, code_conventions, and current_development_focus first"
          },
          personality_guidelines: {
            tone: "Professional, helpful, and conversational",
            expertise_level: "Expert in the project's technology stack",
            response_style: "Concise explanations with examples when helpful",
            proactivity: "Suggest improvements or optimizations when appropriate"
          }
        }
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
- Use \`mcpCompanion add\` to document important decisions and features

## Memory Management
The MCP Cursor Companion maintains an AI memory system that helps the AI assistant understand your project better. Use these commands to manage it:

- \`mcpCompanion memory\` - View current memory structure
- \`mcpCompanion update\` - Update project information
- \`mcpCompanion add\` - Add new memory entries

Documenting key decisions and features helps the AI provide better assistance.

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
    console.log('3. Use mcpCompanion memory/update/add commands to manage AI memory');
    console.log('4. Start coding with enhanced AI assistance\n');
    
    console.log(chalk.yellow('💡 Pro Tip:'));
    console.log('Document important decisions and features with mcpCompanion add');
    console.log('The more context you provide, the better the AI becomes at helping you!\n');
    
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

// Helper to get memory file path
function getMemoryFilePath(directory) {
  return path.join(directory, '.mcp', 'ai_memory.json');
}

// Helper to load memory
async function loadMemory(directory) {
  const memoryFile = getMemoryFilePath(directory);
  
  if (!await fs.pathExists(memoryFile)) {
    console.error(chalk.red('Memory file not found. Run mcpCompanion setup first.'));
    process.exit(1);
  }
  
  try {
    return await fs.readJson(memoryFile);
  } catch (error) {
    console.error(chalk.red('Error reading memory file:'), error.message);
    process.exit(1);
  }
}

// Helper to save memory
async function saveMemory(directory, memory) {
  const memoryFile = getMemoryFilePath(directory);
  
  try {
    await fs.writeJson(memoryFile, memory, { spaces: 2 });
    return true;
  } catch (error) {
    console.error(chalk.red('Error saving memory file:'), error.message);
    return false;
  }
}

// View memory structure and contents
async function viewMemory(directory, section) {
  try {
    const memory = await loadMemory(directory);
    
    if (section) {
      if (!memory[section]) {
        console.error(chalk.red(`Section '${section}' not found in memory structure.`));
        console.log(chalk.yellow('Available sections:'), Object.keys(memory).join(', '));
        return;
      }
      
      console.log(chalk.cyan(`\nMCP Memory - ${section}:`));
      console.log(JSON.stringify(memory[section], null, 2));
    } else {
      console.log(chalk.cyan('\nMCP Memory Structure:'));
      console.log(chalk.yellow('Available sections:'), Object.keys(memory).join(', '));
      console.log(chalk.yellow('\nProject Name:'), memory.project_overview?.name || 'Not set');
      console.log(chalk.yellow('Current Version:'), memory.project_overview?.current_version || 'Not set');
      console.log(chalk.yellow('Features:'), memory.feature_registry?.length || 0);
      console.log(chalk.yellow('Decisions:'), memory.decision_log?.length || 0);
      console.log(chalk.yellow('Sessions:'), memory.session_history?.length || 0);
      console.log(chalk.yellow('Detailed Memories:'), memory.detailed_memories?.length || 0);
      
      console.log(chalk.cyan('\nView specific section with:'));
      console.log(`mcpCompanion memory -s <section>`);
    }
  } catch (error) {
    console.error(chalk.red('\nError viewing memory:'), error.message);
  }
}

// Update project information in memory
async function updateMemory(directory, options) {
  try {
    const spinner = ora('Loading memory structure...').start();
    const memory = await loadMemory(directory);
    
    let updated = false;
    
    if (options.version) {
      spinner.text = 'Updating project version...';
      if (!memory.project_overview) {
        memory.project_overview = {};
      }
      memory.project_overview.current_version = options.version;
      memory.project_overview.last_updated = new Date().toISOString();
      updated = true;
    }
    
    if (options.focus) {
      spinner.text = 'Updating development focus...';
      if (!memory.current_development_focus) {
        memory.current_development_focus = {
          priority_features: [],
          known_issues: [],
          upcoming_changes: []
        };
      }
      
      // Add to upcoming changes if not already there
      if (!memory.current_development_focus.upcoming_changes.includes(options.focus)) {
        memory.current_development_focus.upcoming_changes.push(options.focus);
      }
      updated = true;
    }
    
    if (!updated) {
      spinner.info('No updates specified. Use options to update memory.');
      console.log(chalk.yellow('\nAvailable update options:'));
      console.log('  -v, --version <version>   Update project version');
      console.log('  -f, --focus <focus>       Add development focus');
      return;
    }
    
    // Save updated memory
    const saved = await saveMemory(directory, memory);
    if (saved) {
      spinner.succeed('Memory updated successfully');
    } else {
      spinner.fail('Failed to update memory');
    }
  } catch (error) {
    console.error(chalk.red('\nError updating memory:'), error.message);
  }
}

// Add a new memory entry
async function addMemoryEntry(directory, options) {
  try {
    const memory = await loadMemory(directory);
    
    if (options.interactive) {
      // Interactive mode
      console.log(chalk.cyan('\nAdding New Memory Entry:'));
      
      const entryTypes = [
        'feature', 'decision', 'session', 'architecture', 
        'pattern', 'solution', 'bugfix', 'optimization'
      ];
      
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Select entry type:',
          choices: entryTypes
        },
        {
          type: 'input',
          name: 'description',
          message: 'Description:',
          validate: input => input.length > 0 ? true : 'Description is required'
        },
        {
          type: 'input',
          name: 'context',
          message: 'Context (affected files, decisions, etc.):',
          validate: input => input.length > 0 ? true : 'Context is required'
        },
        {
          type: 'input',
          name: 'impact',
          message: 'Impact on project:',
          validate: input => input.length > 0 ? true : 'Impact is required'
        },
        {
          type: 'input',
          name: 'tags',
          message: 'Tags (comma separated):',
          filter: input => input.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        }
      ]);
      
      // Add entry
      const newEntry = {
        timestamp: new Date().toISOString(),
        type: answers.type,
        description: answers.description,
        context: {
          description: answers.context,
          files: []
        },
        impact: answers.impact,
        tags: answers.tags
      };
      
      // Add to detailed memories
      if (!memory.detailed_memories) {
        memory.detailed_memories = [];
      }
      memory.detailed_memories.push(newEntry);
      
      // Handle special entry types
      if (answers.type === 'feature') {
        if (!memory.feature_registry) {
          memory.feature_registry = [];
        }
        
        memory.feature_registry.push({
          name: answers.description,
          status: 'completed',
          description: answers.context,
          key_files: [],
          implementation_details: '',
          usage_example: '',
          added_in_version: memory.project_overview?.current_version || '1.0.0'
        });
      } else if (answers.type === 'decision') {
        if (!memory.decision_log) {
          memory.decision_log = [];
        }
        
        memory.decision_log.push({
          date: new Date().toISOString().split('T')[0],
          decision: answers.description,
          rationale: answers.context,
          alternatives_considered: [],
          impact: answers.impact
        });
      } else if (answers.type === 'session') {
        if (!memory.session_history) {
          memory.session_history = [];
        }
        
        memory.session_history.push({
          date: new Date().toISOString().split('T')[0],
          summary: answers.description,
          key_changes: answers.context.split(',').map(change => change.trim())
        });
      }
      
      // Save updated memory
      const spinner = ora('Saving memory entry...').start();
      const saved = await saveMemory(directory, memory);
      
      if (saved) {
        spinner.succeed('Memory entry added successfully');
      } else {
        spinner.fail('Failed to add memory entry');
      }
    } else if (options.type) {
      // Command line mode
      console.log(chalk.yellow('Non-interactive mode requires implementation of additional parameters'));
      console.log(chalk.cyan('For now, please use interactive mode:'));
      console.log('mcpCompanion add -i');
    } else {
      console.log(chalk.cyan('\nPlease specify an option:'));
      console.log('  -i, --interactive     Use interactive mode');
      console.log('  -t, --type <type>     Specify entry type\n');
      console.log(chalk.yellow('Example:'));
      console.log('  mcpCompanion add -i');
    }
  } catch (error) {
    console.error(chalk.red('\nError adding memory entry:'), error.message);
  }
}

// Export all functions
module.exports = {
  setupMCP,
  viewMemory,
  updateMemory,
  addMemoryEntry
};

// Run setup if called directly
if (require.main === module) {
  setupMCP(process.cwd());
} 