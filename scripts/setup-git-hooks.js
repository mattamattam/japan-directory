// Setup script to install Git hooks for places data management
import fs from 'fs';
import path from 'path';

const gitHooksDir = '.git/hooks';
const sourceHookPath = '.githooks/pre-commit';
const targetHookPath = path.join(gitHooksDir, 'pre-commit');

console.log('🪝 Setting up Git hooks...');

try {
  // Check if .git directory exists
  if (!fs.existsSync('.git')) {
    console.error('❌ Not a Git repository. Run this from the root of a Git repo.');
    process.exit(1);
  }

  // Check if source hook exists
  if (!fs.existsSync(sourceHookPath)) {
    console.error(`❌ Source hook not found: ${sourceHookPath}`);
    process.exit(1);
  }

  // Create hooks directory if it doesn't exist
  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir, { recursive: true });
    console.log(`📁 Created hooks directory: ${gitHooksDir}`);
  }

  // Copy the hook
  fs.copyFileSync(sourceHookPath, targetHookPath);
  
  // Make it executable
  fs.chmodSync(targetHookPath, 0o755);
  
  console.log('✅ Pre-commit hook installed successfully!');
  console.log('🎯 The hook will:');
  console.log('   - Check for BUILD_API_KEY environment variable');
  console.log('   - Fetch fresh places data if API server is available');
  console.log('   - Stage places data file for commit');
  console.log('   - Ensure commits always include up-to-date places data');
  console.log('');
  console.log('💡 To update places data manually: npm run fetch-places-data');

} catch (error) {
  console.error('❌ Error setting up Git hooks:', error.message);
  process.exit(1);
}