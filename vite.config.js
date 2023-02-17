import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
export default {
  publicDir: "games",
  build: {
    rollupOptions: {
      input: {
        main: resolve(_dirname, "index.html"),
        migration: resolve(_dirname, "migration-iframe.html")
      }
    }
  }
}
