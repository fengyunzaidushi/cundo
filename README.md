# cundo

[![npm version](https://badge.fury.io/js/cundo.svg)](https://badge.fury.io/js/cundo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Enhanced undo tool for Claude Code sessions** - Fixed and improved version with cascading safety and detailed previews.

cundo seamlessly integrates with Claude Code to provide granular undo and redo functionality. It reads directly from Claude Code's session files to track file operations and allows you to selectively revert or restore changes with full preview and cascading safety.

## ✨ Features

- **Automatic Detection** - Reads directly from Claude Code session files
- **Detailed Previews** - See exactly what will be changed before undoing/redoing
- **Cascading Undo/Redo** - Maintains project consistency by undoing/redoing dependent operations
- **Complete Redo System** - Reverse any undo operation with full cascading support
- **Multi-language** - Supports English and Japanese (日本語)
- **Smart Operation Tracking** - Tracks file edits, creations, deletions, renames, and bash commands
- **Safe Backups** - Creates backups before making changes
- **Zero Configuration** - Works out of the box with Claude Code

## Installation

```bash
npm install -g cundo
```

## Quick Start

1. Navigate to a directory where you've used Claude Code
2. List recent operations:
   ```bash
   cundo list
   ```
3. Preview what would be undone:
   ```bash
   cundo preview
   ```
4. Undo operations with confirmation:
   ```bash
   cundo undo
   ```
5. Redo previously undone operations:
   ```bash
   cundo redo
   ```

## Usage

### List Operations

View all operations from your current Claude Code session:

```bash
cundo list                    # Show recent operations
cundo list --all             # Include already undone operations
```

**Example output:**

```
Operations from Claude Code session:

1. [ACTIVE] file_edit - 2m ago
   ID: toolu_01XYZ...
   File: /project/src/app.js

2. [ACTIVE] file_create - 5m ago
   ID: toolu_01ABC...
   File: /project/src/utils.js

3. [ACTIVE] bash_command - 7m ago
   ID: toolu_01DEF...
   Command: npm install express
```

### Preview Changes

See exactly what will be undone without making any changes:

```bash
cundo preview                 # Interactive selection
cundo preview <operation-id>  # Preview specific operation
```

**Preview shows:**

- File diffs for edits (- current content, + original content)
- Content that will be restored for deleted files
- Files that will be deleted for created files
- Bash commands that require manual intervention

### Undo Operations

Safely revert operations with detailed confirmation:

```bash
cundo undo                    # Interactive selection with preview
cundo undo <operation-id>     # Undo specific operation
cundo undo --yes             # Skip confirmation prompts
```

**Cascading Undo:** When you select an operation to undo, cundo will also undo ALL operations that came after it. This ensures your project remains in a consistent state.

### Redo Operations

Restore previously undone operations with the same safety and preview features:

```bash
cundo redo                    # Interactive selection of undone operations
cundo redo <operation-id>     # Redo specific operation
cundo redo --yes             # Skip confirmation prompts
```

**Cascading Redo:** When you select an operation to redo, cundo will also redo ALL undone operations that came before it. This maintains the same consistency guarantees as undo operations.

### Session Management

Work with multiple Claude Code sessions:

```bash
cundo sessions              # List all sessions across projects
cundo session <session-id>  # Switch to specific session
```

### Language Support

cundo supports multiple languages with persistent preferences:

```bash
cundo language              # Show current language and options
cundo language en           # Switch to English
cundo language ja           # Switch to Japanese (日本語)
cundo language fr           # Switch to French (Français)
cundo language es           # Switch to Spanish (Español)
cundo language de           # Switch to German (Deutsch)
```

**Supported Languages:**

- 🇺🇸 English (`en`) - Default
- 🇯🇵 Japanese (`ja`) - 日本語フルサポート
- 🇫🇷 French (`fr`) - Français
- 🇪🇸 Spanish (`es`) - Español
- 🇩🇪 German (`de`) - Deutsch

## How It Works

cundo automatically integrates with Claude Code by:

1. **Reading Session Files** - Parses `.jsonl` files in `~/.claude/projects/`
2. **Extracting Operations** - Identifies file operations and bash commands from tool usage
3. **Tracking Dependencies** - Understands operation ordering for safe cascading undo
4. **Creating Backups** - Saves current state before making changes to `~/.cundo/backups/`
5. **Maintaining State** - Stores undo history and language preferences in `~/.cundo/`

## Supported Operations

| Operation Type       | Description                | Undo Action                  | Redo Action                         |
| -------------------- | -------------------------- | ---------------------------- | ----------------------------------- |
| **File Create**      | Files created by Claude    | Delete file (with backup)    | Recreate file with original content |
| **File Edit**        | File content modifications | Revert to original content   | Re-apply the edit changes           |
| **File Delete**      | Files deleted by Claude    | Restore file content         | Delete file again (with backup)     |
| **File Rename**      | File/directory renames     | Rename back to original      | Apply rename again                  |
| **Directory Create** | Directory creation         | Remove directory             | Recreate directory                  |
| **Directory Delete** | Directory removal          | Recreate directory           | Remove directory again              |
| **Bash Command**     | Shell commands             | Manual intervention required | Manual intervention required        |

## Examples

### Undoing Recent File Changes

```bash
$ cundo list
Operations from Claude Code session:

1. [ACTIVE] file_edit - 30s ago
   ID: toolu_01XYZ123
   File: /project/src/app.js

$ cundo preview
📋 Preview: Would undo 1 operation(s):

1. file_edit - 30s ago
   Will revert file: /project/src/app.js

   - const newFeature = true;
   + const newFeature = false;
     console.log('App started');

$ cundo undo --yes
✓ File reverted: /project/src/app.js
  Backup saved to: ~/.cundo/backups/toolu_01XYZ123-current

Completed: 1 successful, 0 failed
```

### Cascading Undo Example

```bash
$ cundo preview
⚠️  Cascading undo: Selecting an operation will undo it and ALL operations that came after it.

? Select operation to preview:
❯ file_create - 1m ago (+ 2 more would be undone)
  file_edit - 2m ago (+ 1 more would be undone)
  bash_command - 5m ago

📋 Preview: Would undo 3 operation(s):

1. file_create - 1m ago
   Will delete file: /project/new-feature.js

2. file_edit - 2m ago
   Will revert file: /project/app.js

3. bash_command - 5m ago
   Cannot auto-undo bash command: npm install new-package
   Manual intervention required
```

### Redoing Undone Operations

```bash
$ cundo undo
# ... undo some operations ...

$ cundo redo
⚠️  Cascading redo: Selecting an operation will redo it and ALL undone operations that came before it.

? Select operation to redo:
❯ file_edit - 2m ago (+ 1 more will be redone)
  file_create - 5m ago

$ cundo redo --yes
✓ File edit redone: /project/src/app.js
  Backup saved to: ~/.cundo/backups/toolu_01XYZ123-redo
✓ File recreated: /project/new-feature.js

Completed: 2 successful, 0 failed
```

## Configuration

cundo stores its configuration in `~/.cundo/`:

```
~/.cundo/
├── config.json              # Language preferences
├── undone-operations.json   # Undo/redo state tracking
├── sessions/                # Local session tracking (if used)
└── backups/                # Operation backups
```

**Config format:**

```json
{
  "language": "en"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
git clone https://github.com/yourusername/cundo.git
cd cundo
npm install
npm link
```

### Adding Languages

1. Add translations to `src/i18n/languages.js`
2. Update language list in documentation
3. Test with `npm run test`

## License

MIT © Ronit Sachdev
