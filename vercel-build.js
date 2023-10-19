import { execSync } from 'child_process';

try {
  // Run Prisma generate during the build process
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Add other build steps here if necessary
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}
