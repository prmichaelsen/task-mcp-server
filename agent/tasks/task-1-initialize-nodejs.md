# Task 1: Initialize Node.js Project

**Milestone**: Milestone 1 - Project Setup
**Estimated Time**: 0.5 hours
**Dependencies**: None
**Status**: Not Started

---

## Objective

Create the Node.js project with package.json, install dependencies, and verify the project structure is ready for development.

## Steps

### 1. Create package.json

Create `package.json` with the following content:

```json
{
  "name": "@prmichaelsen/task-mcp-server",
  "version": "0.1.0",
  "type": "module",
  "description": "Deployment wrapper for task-mcp MCP server with mcp-auth",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "type-check": "tsc --noEmit"
  },
  "keywords": [
    "mcp",
    "mcp-server",
    "multi-tenant",
    "task-management",
    "firestore"
  ],
  "author": "Patrick Michaelsen <prmichaelsen@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.4",
    "@prmichaelsen/mcp-auth": "^7.0.3",
    "@prmichaelsen/task-mcp": "^0.4.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "tsx": "^4.7.0",
    "typescript": "^5.7.2"
  }
}
```

### 2. Install Dependencies

Run npm install:

```bash
npm install
```

### 3. Verify Installation

Check that all dependencies installed correctly:

```bash
npm list --depth=0
```

Expected output should show:
- @modelcontextprotocol/sdk
- @prmichaelsen/mcp-auth
- @prmichaelsen/task-mcp
- @types/node (dev)
- tsx (dev)
- typescript (dev)

## Verification

- [ ] package.json created with correct structure
- [ ] All dependencies listed in package.json
- [ ] `npm install` completes without errors
- [ ] node_modules/ directory created
- [ ] package-lock.json created
- [ ] No vulnerability warnings (or acceptable warnings only)
- [ ] Scripts defined: build, dev, start, type-check

## Expected Output

```bash
$ npm install

added 150+ packages in 10s

$ npm list --depth=0
@prmichaelsen/task-mcp-server@0.1.0
├── @modelcontextprotocol/sdk@1.0.4
├── @prmichaelsen/mcp-auth@7.0.3
├── @prmichaelsen/task-mcp@0.4.0
├── @types/node@22.10.2
├── tsx@4.7.0
└── typescript@5.7.2
```

## Notes

- Using `type: "module"` for ES modules
- mcp-auth v7.0.3+ supports optional tokenResolver
- task-mcp v0.4.0+ has multi-tenant support built-in
- tsx for development hot-reload
- TypeScript for type safety

---

**Next Task**: [Task 2: Create TypeScript Configuration](task-2-typescript-config.md)
