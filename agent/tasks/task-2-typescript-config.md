# Task 2: Create TypeScript Configuration

**Milestone**: Milestone 1 - Project Setup
**Estimated Time**: 0.25 hours
**Dependencies**: Task 1
**Status**: Not Started

---

## Objective

Create TypeScript configuration file (tsconfig.json) for ES2022 modules with proper compiler options for Node.js 20 and MCP server development.

## Steps

### 1. Create tsconfig.json

Create `tsconfig.json` in project root:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022"],
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 2. Verify TypeScript Configuration

Test that TypeScript configuration is valid:

```bash
npx tsc --showConfig
```

This should display the resolved configuration without errors.

## Verification

- [ ] tsconfig.json created
- [ ] Target set to ES2022
- [ ] Module system set to ES2022
- [ ] Output directory set to ./dist
- [ ] Source directory set to ./src
- [ ] Strict mode enabled
- [ ] Source maps enabled
- [ ] Declaration files enabled
- [ ] `npx tsc --showConfig` runs without errors

## Expected Output

```bash
$ npx tsc --showConfig
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    ...
  },
  "files": [],
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Notes

- ES2022 target for modern JavaScript features
- Strict mode for maximum type safety
- Source maps for debugging
- Declaration files for TypeScript consumers
- Matches remember-mcp-server configuration

---

**Previous Task**: [Task 1: Initialize Node.js Project](task-1-initialize-nodejs.md)
**Next Task**: [Task 3: Create Project Structure](task-3-project-structure.md)
