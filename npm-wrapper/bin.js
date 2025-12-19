#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Colors for output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m"
};

console.log(`${colors.blue}🚀 Launching Engram MCP...${colors.reset}`);

// We want to run the python module 'engram_mcp'.
// Strategy:
// 1. Try 'uvx engram-mcp' (fastest/modern way if user has uv)
// 2. Try 'python3 -m engram_mcp' (if installed in current env)
// 3. Try 'pipx run engram-mcp'

// For this wrapper, since it's likely being run via 'npx engram-mcp',
// we assume the user might NOT have it installed locally.
// We will default to trying `uvx` first as it's the most robust zero-setup runner for Python,
// then fall back to `pipx`.

function runCommand(command, args) {
  const child = spawn(command, args, { stdio: 'inherit' });

  child.on('error', (err) => {
    if(err.code === 'ENOENT') {
      // Command not found, try next strategy
      return false;
    }
    console.error(`${colors.red}Error spawning ${command}:${colors.reset}`, err);
    process.exit(1);
  });

  child.on('close', (code) => {
    process.exit(code);
  });

  return true;
}

// Check for uvx
const tryUvx = () => {
  console.log(`${colors.yellow}Attempting to run with uvx...${colors.reset}`);
  const child = spawn('uvx', [ 'engram-mcp' ], { stdio: 'inherit' });

  child.on('error', (err) => {
    if(err.code === 'ENOENT') {
      tryPipx();
    }
  });

  child.on('close', (code) => {
    if(code !== 0) {
      // Did it fail?
    }
    process.exit(code);
  });
}

const tryPipx = () => {
  console.log(`${colors.yellow}uvx not found. Attempting to run with pipx...${colors.reset}`);
  const child = spawn('pipx', [ 'run', 'engram-mcp' ], { stdio: 'inherit' });

  child.on('error', (err) => {
    console.error(`${colors.red}Critical: Neither 'uvx' nor 'pipx' could be found.${colors.reset}`);
    console.error("Please install 'uv' (recommended) or 'pipx' to run this python-based MCP server.");
    console.error("Install uv: curl -LsSf https://astral.sh/uv/install.sh | sh");
    process.exit(1);
  });

  child.on('close', (code) => {
    process.exit(code);
  });
}

tryUvx();
