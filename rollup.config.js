import svelte from "rollup-plugin-svelte";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js"
  },
  plugins: [
    svelte(),
    resolve({
      browser: true,
      dedupe: ["svelte"]
    }),
    commonjs(),
    css({ output: "bundle.css" }),
    terser()
  ],
  watch: {
    clearScreen: false
  }
};
