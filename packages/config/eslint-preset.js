module.exports = {
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/airbnb",
    "prettier",
  ],
  plugins: ["prettier"],
  parser: "vue-eslint-parser",
  // parserOptions: {
  //   parser: "babel-eslint",
  // },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/script-setup-uses-vars": "error",
    // recommended by Vetur
    "vue/html-self-closing": "off",

    // Disable max-len
    "max-len": "off",

    // we don't want it
    semi: ["error", "never"],

    // add parens ony when required in arrow function
    "arrow-parens": ["error", "as-needed"],

    // add new line above comment
    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],

    "linebreak-style": "off",

    // add new line above comment
    "newline-before-return": "error",

    // add new line below import
    "import/newline-after-import": ["error", { count: 1 }],

    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    "global-require": "off",
  },
};
