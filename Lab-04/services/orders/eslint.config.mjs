import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ["node_modules/", "coverage/"],
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
    },
    pluginJs.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "prettier/prettier": "off", // Wyłączamy błędy formatowania, niech VS Code to robi
        },
    },
];
