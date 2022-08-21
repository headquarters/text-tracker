import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/text-tracker.js",
  output: [
    {
      file: "public/text-tracker-iife.js",
      format: "iife",
    },
    {
      file: "public/text-tracker-es.js",
      format: "es",
    }
  ],
  plugins: [nodeResolve(), terser()],
};
