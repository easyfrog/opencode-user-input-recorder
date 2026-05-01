# OpenCode User Input Recorder

[中文文档](https://github.com/easyfrog/opencode-user-input-recorder)

Automatically records user inputs in OpenCode to Markdown files.

## Features

- **Auto Recording**: Automatically saves every message to `.OpencodeRecorder/` directory
- **Session Isolation**: Each session is stored separately with session ID in filename
- **Smart Notifications**: Shows toast on first message, no repeat within 15 minutes
- **Cross-Platform**: Supports Windows, macOS, and Linux
- **Quick Open**: Use "Open Record" / "打开记录" command to quickly view record files

## Installation

1. Copy the plugin to OpenCode plugins directory:
   - Project level: `.opencode/plugins/`
   - Global level: `~/.config/opencode/plugins/`

2. Configure in `opencode.json`:

```json
{
  "plugin": ["./plugins/opencode-user-input-recorder"]
}
```

Or install from npm:

```json
{
  "plugin": ["opencode-user-input-recorder"]
}
```

## Usage

### View Records

Plugin automatically saves conversations to:

```
.OpencodeRecorder/recorder-{sessionID}.md
```

### Open Record

In OpenCode, use `openRecord` (English) or `openRecordZh` (Chinese) command to open the current session's record file using the system default application.

- **Windows**: Opens with Explorer
- **macOS**: Opens with Finder
- **Linux**: Opens with xdg-open

> Note: The original command "打开记录" has been renamed to `openRecordZh` for compatibility.

### Toast Notifications

- First message shows "输入已保存" toast notification
- No repeat notification within 15 minutes of continuous conversation
- Timer resets on each new message
- Notification shows again after 15 minutes of inactivity
- New session also triggers notification

## Record Format

```markdown
------
2024年4月16日 15:30:00

User input content...
```

## Limitations

- Use `openRecord` (English) or `openRecordZh` (Chinese) command to open record files
- Record files are stored in project's `.OpencodeRecorder` directory, won't pollute user's OpenCode config
- If project does not have `.OpencodeRecorder` directory, it will be created automatically

## Bug Fixes

- Fixed issue where tool names with non-ASCII characters caused errors with DeepSeek and other OpenAI API compatible models
- Renamed "打开记录" to `openRecordZh` to comply with API naming conventions

## Tech Stack

- OpenCode Plugin SDK
- TypeScript
- Cross-platform file opening (Windows/macOS/Linux)
