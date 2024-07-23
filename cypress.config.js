const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    baseUrl: process.env.CYPRESS_BASE_URL,
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,
env: {
    adminEmail: process.env.CYPRESS_ADMINEMAIL,
    custPassword: process.env.CYPRESS_CUSTPASSWORD,
    adminPassword: process.env.CYPRESS_ADMINPASSWORD
},
   
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
