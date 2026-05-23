import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./__test__/setup.ts"],
    fileParallelism: false,
  },
});
