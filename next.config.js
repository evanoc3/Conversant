"use strict";

const withPwa = require("next-pwa");

module.exports = {
  ...withPwa({
    pwa: {
      disable: process.env.NODE_ENV === "development",
      dest: "public"
    }
  }),
  sassOptions: {
    includePaths: [ `${__dirname}/src/styles/` ],
  }
};
