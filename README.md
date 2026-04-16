<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenCode User Input Recorder</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #24292e;
        }
        .lang-switch {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e1e4e8;
        }
        .lang-switch button {
            padding: 8px 16px;
            border: 1px solid #d1d5da;
            background: #f6f8fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        .lang-switch button:hover {
            background: #e1e4e8;
        }
        .lang-switch button.active {
            background: #0366d6;
            color: white;
            border-color: #0366d6;
        }
        .content { display: none; }
        .content.active { display: block; }
        h1 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        h2 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        code {
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 85%;
        }
        pre {
            background-color: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow: auto;
        }
        pre code {
            background: none;
            padding: 0;
        }
        ul, ol { padding-left: 2em; }
        li { margin: 0.25em 0; }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        th, td {
            border: 1px solid #d1d5da;
            padding: 8px 12px;
            text-align: left;
        }
        th { background: #f6f8fa; }
    </style>
</head>
<body>
    <div class="lang-switch">
        <button onclick="showLang('en')" class="active" id="btn-en">English</button>
        <button onclick="showLang('zh')" id="btn-zh">中文</button>
    </div>

    <div id="en" class="content active">
        <h1>OpenCode User Input Recorder</h1>
        <p>Automatically records user inputs in OpenCode to Markdown files.</p>

        <h2>Features</h2>
        <ul>
            <li><strong>Auto Recording</strong>: Automatically saves every message to <code>.opencode/recorders/</code> directory</li>
            <li><strong>Session Isolation</strong>: Each session is stored separately with session ID in filename</li>
            <li><strong>Smart Notifications</strong>: Shows toast on first message, no repeat within 15 minutes</li>
            <li><strong>Cross-Platform</strong>: Supports Windows, macOS, and Linux</li>
            <li><strong>Quick Open</strong>: Use "Open Record" / "打开记录" command to quickly view record files</li>
        </ul>

        <h2>Installation</h2>
        <ol>
            <li>Copy the plugin to OpenCode plugins directory:
                <ul>
                    <li>Project level: <code>.opencode/plugins/</code></li>
                    <li>Global level: <code>~/.config/opencode/plugins/</code></li>
                </ul>
            </li>
            <li>Configure in <code>opencode.json</code>:</li>
        </ol>
        <pre><code>{
  "plugin": ["./plugins/opencode-user-input-recorder"]
}</code></pre>
        <p>Or install from npm:</p>
        <pre><code>{
  "plugin": ["opencode-user-input-recorder"]
}</code></pre>

        <h2>Usage</h2>
        <h3>View Records</h3>
        <p>Plugin automatically saves conversations to:</p>
        <pre><code>.opencode/recorders/recorder-{sessionID}.md</code></pre>

        <h3>Open Record</h3>
        <p>In OpenCode, type "打开记录" or "Open Record" to open the current session's record file using the system default application.</p>
        <ul>
            <li><strong>Windows</strong>: Opens with Explorer</li>
            <li><strong>macOS</strong>: Opens with Finder</li>
            <li><strong>Linux</strong>: Opens with xdg-open</li>
        </ul>

        <h3>Toast Notifications</h3>
        <ul>
            <li>First message shows "输入已保存" toast notification</li>
            <li>No repeat notification within 15 minutes of continuous conversation</li>
            <li>Timer resets on each new message</li>
            <li>Notification shows again after 15 minutes of inactivity</li>
            <li>New session also triggers notification</li>
        </ul>

        <h2>Record Format</h2>
        <pre><code>------
2024年4月16日 15:30:00

User input content...</code></pre>

        <h2>Limitations</h2>
        <ul>
            <li>Toast file path currently does not support click-to-open, please use "打开记录" / "Open Record" command</li>
            <li>Record files are stored in project's <code>.opencode/recorders</code> directory</li>
            <li>If project does not have <code>.opencode</code> directory, it will be created automatically</li>
        </ul>

        <h2>Tech Stack</h2>
        <ul>
            <li>OpenCode Plugin SDK</li>
            <li>TypeScript</li>
            <li>Cross-platform file opening (Windows/macOS/Linux)</li>
        </ul>
    </div>

    <div id="zh" class="content">
        <h1>OpenCode User Input Recorder</h1>
        <p>自动记录用户在 OpenCode 中的每次输入到 Markdown 文件中。</p>

        <h2>功能</h2>
        <ul>
            <li><strong>自动记录</strong>：每次发送消息时自动保存到 <code>.opencode/recorders/</code> 目录</li>
            <li><strong>会话隔离</strong>：每个会话独立存储，文件名包含会话 ID</li>
            <li><strong>智能通知</strong>：首次对话显示 toast 通知，15 分钟内连续对话不再重复提醒</li>
            <li><strong>跨平台支持</strong>：支持 Windows、macOS、Linux</li>
            <li><strong>快速打开</strong>：通过 "打开记录" / "Open Record" 命令快速查看记录文件</li>
        </ul>

        <h2>安装</h2>
        <ol>
            <li>将插件放入 OpenCode 插件目录：
                <ul>
                    <li>项目级：<code>.opencode/plugins/</code></li>
                    <li>全局级：<code>~/.config/opencode/plugins/</code></li>
                </ul>
            </li>
            <li>在 <code>opencode.json</code> 中配置：</li>
        </ol>
        <pre><code>{
  "plugin": ["./plugins/opencode-user-input-recorder"]
}</code></pre>
        <p>或从 npm 安装：</p>
        <pre><code>{
  "plugin": ["opencode-user-input-recorder"]
}</code></pre>

        <h2>使用</h2>
        <h3>查看记录</h3>
        <p>插件会在每次输入时自动保存对话到：</p>
        <pre><code>.opencode/recorders/recorder-{sessionID}.md</code></pre>

        <h3>打开记录</h3>
        <p>在 OpenCode 中输入 "打开记录" 或 "Open Record"，插件会自动使用系统默认程序打开对应的 md 文件。</p>
        <ul>
            <li><strong>Windows</strong>: 使用资源管理器打开</li>
            <li><strong>macOS</strong>: 使用 Finder 打开</li>
            <li><strong>Linux</strong>: 使用 xdg-open 打开</li>
        </ul>

        <h3>Toast 通知</h3>
        <ul>
            <li>首次对话会显示 "输入已保存" 的 toast 通知</li>
            <li>15 分钟内的连续对话不会重复显示通知</li>
            <li>每次新输入会重置计时器</li>
            <li>超过 15 分钟后再输入会再次显示通知</li>
            <li>切换新会话也会显示通知</li>
        </ul>

        <h2>记录格式</h2>
        <pre><code>------
2024年4月16日 15:30:00

用户输入的内容...</code></pre>

        <h2>注意事项</h2>
        <ul>
            <li>Toast 中的文件路径暂时不支持点击打开，请使用 "打开记录" / "Open Record" 命令</li>
            <li>记录文件保存在项目的 <code>.opencode/recorders</code> 目录中</li>
            <li>如果项目没有 <code>.opencode</code> 目录，会自动创建</li>
        </ul>

        <h2>技术栈</h2>
        <ul>
            <li>OpenCode Plugin SDK</li>
            <li>TypeScript</li>
            <li>跨平台文件打开（Windows/macOS/Linux）</li>
        </ul>
    </div>

    <script>
        function showLang(lang) {
            document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.lang-switch button').forEach(el => el.classList.remove('active'));
            document.getElementById(lang).classList.add('active');
            document.getElementById('btn-' + lang).classList.add('active');
        }
    </script>
</body>
</html>