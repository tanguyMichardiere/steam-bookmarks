/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
  tailwindFunctions: ["cx"],
};
