const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "./cypress/tests/**.*",
    baseUrl: "https://the-internet.herokuapp.com",

    // 👉 Thêm dòng này để toàn bộ click, type... không tự scroll
    scrollBehavior: false,
  },

  // Timeout mặc định cho mọi lệnh
  defaultCommandTimeout: 10000,
});
