import {defineConfig} from 'vitest/config';

// Lab checks: each file fails on a fresh clone and passes once the lab is done.
export default defineConfig({test: {include: ['labs/**/*.test.ts']}});
