"use strict";

const withPwa = require("next-pwa");

module.exports = {
  ...withPwa({
    pwa: {
      dest: "public"
    }
  }),
  sassOptions: {
    includePaths: [ `${__dirname}/src/styles/` ],
  }
};
