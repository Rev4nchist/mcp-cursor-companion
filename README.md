# MCP Cursor Companion

A powerful companion tool that enhances AI collaboration in Cursor IDE through structured memory management and project context.

## Features

- 🚀 Quick Setup: One command to configure MCP
- 📁 Automatic Directory Creation
- 🧠 Advanced AI Memory Management
- 🤝 Enhanced Collaboration Support
- 💡 Smart Code Generation
- 📚 Project-Specific Knowledge Base
- 🔄 Context Persistence Across Sessions
- 📋 Command-Line Tools for Memory Maintenance

## Installation

```bash
npm install -g mcp-cursor-companion
```

## Basic Usage

Navigate to your project directory and run:

```bash
mcpCompanion setup
```

This will:
1. Create necessary MCP directories
2. Initialize the AI memory file with enhanced structure
3. Set up collaboration rules
4. Configure Cursor IDE for enhanced AI assistance

## Memory Management Commands

MCP Cursor Companion provides powerful tools to manage the AI's memory of your project:

### View Memory

```bash
mcpCompanion memory
```

View a summary of the AI memory structure and its contents.

To view a specific section:

```bash
mcpCompanion memory -s project_overview
```

Available sections include: `project_overview`, `architecture`, `code_conventions`, `feature_registry`, `decision_log`, `session_history`, and more.

### Update Project Information

```bash
mcpCompanion update -v 1.2.0
```

Updates the project version in the memory structure.

```bash
mcpCompanion update -f "Implement user authentication"
```

Adds a new focus area to the development priorities.

### Add Memory Entries

```bash
mcpCompanion add -i
```

Launches an interactive prompt to add a new memory entry. You can document:

- Features implemented
- Architectural decisions
- Development sessions
- Code patterns
- Solutions to problems
- Bug fixes
- Optimizations

Each entry becomes part of the AI's knowledge base for your project, enabling more relevant assistance.

## Enhanced Features

### Context-Aware Assistance
- AI understands your project structure
- Maintains conversation history
- Provides relevant suggestions based on project memory

### Smart Code Generation
- Generates code based on project context
- Follows your coding style and conventions
- Maintains consistency with existing patterns

### Project-Specific Knowledge
- Learns from your documented decisions and features
- Provides domain-specific suggestions
- Adapts to your workflow and priorities

### Memory Persistence Across Sessions
- Maintains project context between coding sessions
- Quickly orients the AI with each new conversation
- Provides consistent assistance over time

## Getting Started

1. Install the companion tool globally:
   ```bash
   npm install -g mcp-cursor-companion
   ```

2. Run the setup in your project directory:
   ```bash
   mcpCompanion setup
   ```

3. Document important project information:
   ```bash
   mcpCompanion add -i
   ```

4. Restart Cursor IDE

5. Use Cmd/Ctrl + Shift + A to access AI features

6. Start coding with enhanced AI assistance

## AI Memory Structure

The memory system maintains a comprehensive structure that includes:

- **Project Overview**: Basic information about the project
- **Architecture**: Components, data flow, and patterns
- **Code Conventions**: Naming, structure, and documentation standards
- **Feature Registry**: Completed and planned features
- **Decision Log**: Important decisions and their rationale
- **Session History**: Summary of past development sessions
- **Detailed Memories**: Specific context about important changes

## Best Practices

For the most effective AI collaboration:

1. **Document Important Decisions**:
   ```bash
   mcpCompanion add -i
   ```
   Select "decision" type and document architectural choices.

2. **Record Feature Implementations**:
   After completing a feature, document it to help the AI understand its purpose and implementation.

3. **Update Project Version**:
   ```bash
   mcpCompanion update -v 1.2.0
   ```
   Keep the version information current.

4. **Add Session Summaries**:
   At the end of significant coding sessions, document what was accomplished.

## Requirements

- Node.js >= 14.0.0
- Cursor IDE

## Troubleshooting

If you encounter any issues:
1. Ensure you have write permissions in the project directory
2. Check if Cursor IDE is properly installed
3. Try running the command with administrator privileges
4. Verify the memory file exists: `.mcp/ai_memory.json`

## License

MIT 