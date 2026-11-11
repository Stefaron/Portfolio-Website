/**
 * @type {import("prettier").Config}
 */
export default {
  plugins: ["prettier-plugin-astro"],
  printWidth: 90,
  overrides: [
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
};
