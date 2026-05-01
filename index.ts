import type { Plugin } from "@opencode-ai/plugin"
import { tool, type ToolContext } from "@opencode-ai/plugin"
import * as fs from "fs"
import * as path from "path"
import * as os from "os"

const TOAST_INTERVAL_MS = 15 * 60 * 1000
const RECORD_FOLDER = '.OpencodeRecorder'

async function openFile(filePath: string, $: any) {
  const platform = os.platform()
  if (platform === "win32") {
    try {
      await $`explorer "${filePath}"`
    } catch {
      await $`cmd /c start "" "${filePath}"`
    }
  } else if (platform === "darwin") {
    await $`open "${filePath}"`
  } else {
    await $`xdg-open "${filePath}" 2>/dev/null || echo "Cannot open automatically, please open manually: ${filePath}"`
  }
}

async function executeOpenRecord(baseDir: string, sessionID: string, $: any, lang: "en" | "zh" = "zh") {
  const safeSessionTitle = sessionID.replace(/[<>:"/\\|?*]/g, "_")
  const filePath = path.join(baseDir, RECORD_FOLDER, `recorder-${safeSessionTitle}.md`)

  if (fs.existsSync(filePath)) {
    await openFile(filePath, $)
    return lang === "en" 
      ? `Record file opened: ${filePath}`
      : `已打开记录文件: ${filePath}`
  } else {
    return lang === "en" 
      ? "Record file does not exist"
      : "记录文件不存在"
  }
}

export const SessionRecorderPlugin: Plugin = async ({ project, client, directory, $ }) => {
  const baseDir = project?.path || directory || process.cwd()

  let lastToastTime = 0
  let lastSessionID = ""

  await client.app.log({
    body: {
      service: "session-recorder",
      level: "info",
      message: `Plugin initialized with baseDir: ${baseDir}`,
    },
  })

  return {
    "chat.message": async (input, output) => {
      try {
        const message = output.message
        if (!message || message.role !== "user") {
          return
        }

        const userText = output.parts
          .filter((part: any) => part.type === "text")
          .map((part: any) => part.text)
          .join("\n")

        if (!userText) {
          return
        }

        const now = new Date()
        const timestamp = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

        const sessionTitle = input.sessionID || "default"
        const safeSessionTitle = sessionTitle.replace(/[<>:"/\\|?*]/g, "_")

        const record = `___
> ${timestamp}

  ${userText}


`

        const recordersDir = path.join(baseDir, RECORD_FOLDER)

        if (!fs.existsSync(recordersDir)) {
          fs.mkdirSync(recordersDir, { recursive: true })
        }

        const filePath = path.join(recordersDir, `recorder-${safeSessionTitle}.md`)
        fs.appendFileSync(filePath, record, "utf-8")

        const nowTime = Date.now()
        const isNewSession = input.sessionID !== lastSessionID
        const timeSinceLastToast = nowTime - lastToastTime
        const shouldShowToast = isNewSession || timeSinceLastToast > TOAST_INTERVAL_MS

        if (shouldShowToast) {
          lastToastTime = nowTime
          lastSessionID = input.sessionID

          const fileUrl = filePath.replace(/\\/g, '/').replace(/:/g, '')
          await client.tui.showToast({
            body: {
              title: "输入已保存",
              message: `记录在 ${path.basename(filePath)}`,
              variant: "info",
            },
          })
        }

        await client.app.log({
          body: {
            service: "session-recorder",
            level: "info",
            message: `Recorded user input to ${filePath}`,
          },
        })
      } catch (error) {
        await client.app.log({
          body: {
            service: "session-recorder",
            level: "error",
            message: `Failed to record user input: ${(error as Error).message}`,
          },
        })
      }
    },
    tool: {
      openRecord: tool({
        description: "Open current session's record file",
        args: {},
        execute: async (_args: any, context: ToolContext) => {
          const sessionTitle = lastSessionID || context.sessionID || "default"
          return executeOpenRecord(baseDir, sessionTitle, $, "en")
        },
      }),
      openRecordZh: tool({
        description: "打开当前会话的记录文件",
        args: {},
        execute: async (_args: any, context: ToolContext) => {
          const sessionTitle = lastSessionID || context.sessionID || "default"
          return executeOpenRecord(baseDir, sessionTitle, $, "zh")
        },
      }),
    },
  }
}