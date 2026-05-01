# OpenCode User Input Recorder

[English Document](https://github.com/easyfrog/opencode-user-input-recorder/blob/master/README-en.md)

自动记录用户在 OpenCode 中的每次输入到 Markdown 文件中。

## 功能

- **自动记录**：每次发送消息时自动保存到 `.OpencodeRecorder/` 目录
- **会话隔离**：每个会话独立存储，文件名包含会话 ID
- **智能通知**：首次对话显示 toast 通知，15 分钟内连续对话不再重复提醒
- **跨平台支持**：支持 Windows、macOS、Linux
- **快速打开**：通过 "打开记录" / "Open Record" 命令快速查看记录文件

## 安装

1. 将插件放入 OpenCode 插件目录：
   - 项目级：`.opencode/plugins/`
   - 全局级：`~/.config/opencode/plugins/`

2. 在 `opencode.json` 中配置：

```json
{
  "plugin": ["./plugins/opencode-user-input-recorder"]
}
```

或从 npm 安装：

```json
{
  "plugin": ["opencode-user-input-recorder"]
}
```

## 使用

### 查看记录

插件会在每次输入时自动保存对话到：

```
.OpencodeRecorder/recorder-{sessionID}.md
```

### 打开记录

在 OpenCode 中输入 `openRecord`（英文）或 `openRecordZh`（中文）命令，插件会自动使用系统默认程序打开对应的 md 文件。

- **Windows**: 使用资源管理器打开
- **macOS**: 使用 Finder 打开
- **Linux**: 使用 xdg-open 打开

> 注意：原命令 "打开记录" 因兼容性问题已更名为 `openRecordZh`

### Toast 通知

- 首次对话会显示 "输入已保存" 的 toast 通知
- 15 分钟内的连续对话不会重复显示通知
- 每次新输入会重置计时器
- 超过 15 分钟后再输入会再次显示通知
- 切换新会话也会显示通知

## 记录格式

```markdown
------
2024年4月16日 15:30:00

用户输入的内容...
```

## 注意事项

- 请使用 `openRecord`（英文）或 `openRecordZh`（中文）命令打开记录文件
- 记录文件保存在项目的 `.OpencodeRecorder` 目录中，不会污染用户的 OpenCode 配置
- 如果项目没有 `.OpencodeRecorder` 目录，会自动创建

## Bug 修复

- 修复了工具名称包含非 ASCII 字符导致 DeepSeek 等兼容 OpenAI API 的模型报错的问题
- 原命令 "打开记录" 已更名为 `openRecordZh` 以符合 API 规范

## 技术栈

- OpenCode Plugin SDK
- TypeScript
- 跨平台文件打开（Windows/macOS/Linux）

---

For English documentation, see [README-en.md](https://github.com/easyfrog/opencode-user-input-recorder/blob/master/README-en.md)