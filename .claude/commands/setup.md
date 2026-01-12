---
argument-hint: [mcp-name or "all"]
description: Setup and configure MCP servers (shadcn, context7, supabase, next-devtools, playwright, browser)
---

## Task
Help set up and configure MCP (Model Context Protocol) servers for enhanced development capabilities.

### Available MCPs:
- **shadcn** - Browse, search, and install shadcn/ui components
- **context7** - Access up-to-date code documentation for libraries
- **supabase** - Interact with Supabase projects, databases, and migrations
- **next-devtools** - Next.js development tools and diagnostics
- **playwright** - Browser automation and testing
- **browser** - Browser extension for web automation (via cursor-browser-extension)

### Setup Process:

1. **Check if `.mcp.json` exists** in project root or `.cursor/` directory
2. **Create or update `.mcp.json`** with the requested MCP server configurations
3. **Guide through environment variable setup** where needed (API keys, tokens, etc.)
4. **Provide verification steps** for each MCP server

### MCP Server Configurations:

#### Shadcn MCP
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

#### Context7 MCP
Requires CONTEXT7_API_KEY environment variable:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```
Get API key from: https://context7.com

#### Supabase MCP
Requires SUPABASE_ACCESS_TOKEN and project-ref:
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=YOUR_PROJECT_REF"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN_HERE"
      }
    }
  }
}
```
- Get access token from: Supabase Dashboard > Account Settings > Access Tokens
- Find project-ref in your Supabase project URL or dashboard

#### Next.js DevTools MCP
```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```
Note: Requires Next.js 16+ with dev server running. MCP endpoint auto-enabled at `/_next/mcp`.

#### Playwright MCP
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

#### Browser Extension MCP
Already configured via Cursor browser extension. No additional setup needed if extension is installed.

### Instructions:

If user requests "all" or no specific MCP:
1. Create a comprehensive `.mcp.json` with all MCPs
2. Prompt for required environment variables (Context7 API key, Supabase token, etc.)
3. Guide through obtaining credentials
4. Provide verification commands

If user requests a specific MCP:
1. Add only that MCP to `.mcp.json` (merge with existing if present)
2. Guide through setup for that specific MCP
3. Provide verification steps

### After Setup:
1. Restart Cursor to apply MCP configurations
2. Verify in Cursor Settings > Features > MCP that servers show as active
3. Test MCP functionality by using relevant commands

### Important Notes:
- `.mcp.json` should be in project root or `.cursor/` directory
- Environment variables can be set in `.mcp.json` or via system environment
- For Supabase: Use `--read-only` flag for safety, specify `--project-ref` to limit access
- For Next.js: Dev server must be running for MCP to work
- Never commit API keys or tokens to git - use `.env` or environment variables
