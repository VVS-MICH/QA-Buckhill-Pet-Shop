const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}' ,
    baseUrl: "https://pet-shop.buckhill.com.hr",
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
