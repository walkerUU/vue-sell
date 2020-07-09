module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-undef": 0,
    semi: ["error", "always"],
    "space-before-function-paren": [1, "never"],
    "spaced-comment": [1, "always"],
    "vue/no-unused-components": [ 0, "error",
      {
        ignoreWhenBindingPresent: false
      }
    ]
  }
};
