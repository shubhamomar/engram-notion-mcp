# Engram MCP - Semantic Memory for AI Agents

**Engram MCP** is a powerful Model Context Protocol (MCP) server that gives your AI agents a **permanent, semantic memory**. It seamlessly integrates with [Notion](https://notion.so) to store, retrieve, and organize information, turning your workspace into an intelligent knowledge base.

> 🧠 **Why Engram?**
> AI Agents often suffer from amnesia. Engram solves this by providing a persistent memory layer backed by Notion's robust database structure.

---

## 📦 Features

### Notion Integration
| Feature | Tool Name | Description |
| :--- | :--- | :--- |
| **Page Creation** | `create_page` | Create new pages with content. Supports explicit parent IDs or defaults. |
| **Page Updates** | `update_page` | Append content to existing pages. |
| **Logging** | `log_to_notion` | Fast logging wrapper for appending notes/logs. |
| **Reading** | `read_page_content` | Read and parse page content into Agent-friendly text. |
| **Databases** | `list_databases` | detailed list of accessible databases. |
| **Querying** | `query_database` | Query databases with filters to find specific items. |
| **Organization** | `list_sub_pages` | List pages within a parent page. |
| **Cleanup** | `delete_block` | Archive/Delete blocks or pages. |

### Semantic Memory (SQLite)
| Feature | Tool Name | Description |
| :--- | :--- | :--- |
| **Store Facts** | `remember_fact` | Saves key info to internal vector-like storage. |
| **Search** | `search_memory` | Full-text search over stored memories. |
| **Recall** | `get_recent_memories`| Retrieve the latest context/facts. |

### Operations
| Feature | Tool Name | Description |
| :--- | :--- | :--- |
| **Alerts** | `send_alert` | Send push notifications via Telegram. |

---

## 🛠 Configuration

To use Engram MCP, you need to set up your environment variables.

| Variable | Required | Description |
| :--- | :--- | :--- |
| `NOTION_API_KEY` | **Yes** | Your Notion Internal Integration Token (`secret_...`). |
| `NOTION_PAGE_ID` | No | Default Page ID for creating pages if no parent is specified. |
| `TELEGRAM_BOT_TOKEN`| No | For `send_alert` tool. |
| `TELEGRAM_CHAT_ID` | No | For `send_alert` tool. |
| `AGENT_MEMORY_PATH` | No | Custom path for the SQLite memory database. |

### Configuration Patterns

#### 1. Minimal Setup (Flexible / Unbound)
You can omit `NOTION_PAGE_ID` to keep the agent "unbound". It will force the agent to ask for a destination or search for one.

```json
"env": {
  "NOTION_API_KEY": "secret_your_key_here"
}
```

#### 2. Multi-Page Support
You don't need to configure an array of IDs. **Engram relies on Notion's native permissions.**
To give the agent access to multiple specific pages:
1.  Open the specific page in Notion.
2.  Click the **... (three dots)** menu at the top-right of the page.
3.  Scroll down to **Connect to** (or "Add connections").
4.  Search for and select your integration (e.g., "Engram MCP").
5.  **Repeat this** for any other page you want the agent to see.

---

## 🔌 Client Setup Instructions
Configure your favorite AI tool to use Engram MCP. Click to expand your tool of choice:

<details>
<summary><strong>🖥️ Desktop Apps (Claude Desktop, ChatGPT)</strong></summary>

Add this to your `claude_desktop_config.json` or `mcp.json`.

**Config for using `npx` (Recommended):**
```json
{
  "mcpServers": {
    "engram": {
      "command": "npx",
      "args": ["-y", "engram-mcp"],
      "env": {
        "NOTION_API_KEY": "secret_your_key_here"
      }
    }
  }
}
```
</details>

<details>
<summary><strong>🆚 VS Code & Extensions (Cursor, Windsurf, Cline, Roo Code)</strong></summary>

Most VS Code environments use a `mcpServers` object in their settings.

**Generic Config:**
```json
"mcpServers": {
  "engram": {
    "command": "npx",
    "args": ["-y", "engram-mcp"],
    "env": {
      "NOTION_API_KEY": "secret_your_key_here"
    }
  }
}
```

**Where to put it:**
- **Cursor / Windsurf / VS Code**: User Settings (`settings.json`).
- **Cline / Roo Code**: Extension Settings -> MCP Servers.
- **Kilo Code**: `.kilo/config.json`.
</details>

<details>
<summary><strong>⌨️ CLI Tools (Gemini CLI, Claude Code)</strong></summary>

**Gemini CLI:**
```bash
gemini mcp add engram node "npx engram-mcp" -e NOTION_API_KEY=secret_...
```

**Claude Code:**
```bash
export NOTION_API_KEY=secret_...
claude --mcp engram-mcp
```
</details>

<details>
<summary><strong>🐍 Manual / Python Native</strong></summary>

If you prefer `uvx` or have strict Python environments:

```json
"engram": {
  "command": "uvx",
  "args": ["engram-mcp"],
  "env": { ... }
}
```
</details>

---

## 🤝 Contributing
1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---
Built with ❤️ using [FastMCP](https://github.com/jlowin/fastmcp).
