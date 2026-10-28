import {defineConfig} from 'vitest/config';

// `npm test` runs the project's own tests only. Lab checks live in labs/ and run with `npm run lab:*`.
export default defineConfig({test: {include: ['test/**/*.test.ts']}});
