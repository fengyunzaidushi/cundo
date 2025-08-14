# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ccundo is a CLI tool that provides intelligent undo functionality for Claude Code sessions. It reads Claude Code session files to extract file operations and allows selective reverting/restoring of changes with cascading safety.

## Commands

### Development Commands
```bash
# Run tests
npm test

# Watch mode for testing
npm test:watch

# Run language demo (requires demo-language.sh script)
npm run demo
```

### Application Commands
```bash
# List operations from current Claude Code session
ccundo list

# Preview operations without making changes  
ccundo preview

# Undo operations with cascading safety
ccundo undo

# Redo previously undone operations
ccundo redo

# Switch languages (en, ja, fr, es, de)
ccundo language [lang]

# List all sessions
ccundo sessions
```

## Architecture

### Core Components

**ClaudeSessionParser** (`src/core/ClaudeSessionParser.js`): 
- Reads `.jsonl` session files from `~/.claude/projects/`
- Extracts operations from tool usage (Write, Edit, MultiEdit, Bash)
- Handles cross-platform path encoding (Windows: `C:\` → `C--`, Unix: `/` → `-`)

**UndoManager** (`src/core/UndoManager.js`):
- Executes undo operations by reversing file changes
- Creates backups in `~/.ccundo/backups/` before changes
- Handles file creates/edits/deletes/renames, directory operations, bash commands

**RedoManager** (`src/core/RedoManager.js`):
- Restores previously undone operations
- Maintains same safety guarantees as undo operations

**Operation** (`src/core/Operation.js`):
- Represents single file/bash operations with type, data, timestamp
- Types: `file_create`, `file_edit`, `file_delete`, `file_rename`, `directory_create`, `directory_delete`, `bash_command`

**UndoTracker** (`src/core/UndoTracker.js`):
- Tracks which operations have been undone per session
- Stores state in `~/.ccundo/undone-operations.json`

### Key Concepts

**Cascading Operations**: When undoing/redoing, all subsequent/prior operations are automatically included to maintain project consistency.

**Operation Extraction**: Parses Claude Code tool usage:
- `Write` tool → `file_create`
- `Edit`/`MultiEdit` tool → `file_edit` 
- `Bash` with file commands → various operation types

**Cross-platform Session Handling**: Claude Code encodes project paths differently on Windows vs Unix systems.

## File Structure

```
src/
├── core/           # Core operation management classes
├── hooks/          # Claude session integration hooks
├── i18n/           # Internationalization (5 languages)
└── utils/          # Utility functions (time formatting)
```

## Configuration

- Language preferences: `~/.ccundo/config.json`
- Undo tracking: `~/.ccundo/undone-operations.json` 
- Backups: `~/.ccundo/backups/`
- Claude sessions: `~/.claude/projects/`

## Testing

Jest configuration supports ES modules with `.js` extension mapping. Tests are in `test/` directory.