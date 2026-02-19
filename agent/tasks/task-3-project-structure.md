# Task 3: Create Project Structure

**Milestone**: Milestone 1 - Project Setup
**Estimated Time**: 0.25 hours
**Dependencies**: Task 2
**Status**: Not Started

---

## Objective

Create the basic directory structure and skeleton files for the task-mcp-server project.

## Steps

### 1. Create src Directory

```bash
mkdir -p src
```

### 2. Create Skeleton index.ts

Create `src/index.ts` with TODO comments:

```typescript
// TODO: Implement main server with mcp-auth wrapper
// TODO: Import createServer from @prmichaelsen/task-mcp
// TODO: Configure environment variables
// TODO: Add graceful shutdown handlers

console.log('task-mcp-server starting...');
console.log('TODO: Implement server');
```

### 3. Test TypeScript Compilation

Verify TypeScript can compile the skeleton:

```bash
npm run build
```

This should create `dist/index.js`.

### 4. Test Development Mode

Verify development mode works:

```bash
npm run dev
```

This should start tsx watch mode and display the TODO messages.

## Verification

- [ ] src/ directory created
- [ ] src/index.ts created with TODO comments
- [ ] `npm run build` compiles successfully
- [ ] dist/ directory created
- [ ] dist/index.js exists
- [ ] `npm run dev` starts without errors
- [ ] Hot reload works (edit src/index.ts and see changes)

## Expected Output

```bash
$ npm run build

$ npm run start
task-mcp-server starting...
TODO: Implement server

$ npm run dev
task-mcp-server starting...
TODO: Implement server
[watching for changes...]
```

## Directory Structure

After this task, the structure should be:

```
task-mcp-server/
├── src/
│   └── index.ts
├── dist/
│   └── index.js
├── node_modules/
├── agent/
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Notes

- Skeleton file ensures TypeScript compilation works
- TODO comments guide future implementation
- Development mode (tsx watch) enables hot reload
- Production build creates optimized JavaScript

---

**Previous Task**: [Task 2: Create TypeScript Configuration](task-2-typescript-config.md)
**Next Task**: [Task 4: Create Configuration Files](task-4-configuration-files.md)
