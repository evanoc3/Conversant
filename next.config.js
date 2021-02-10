"use strict";

const withImages = require("next-images");
const withPwa = require("next-pwa");

module.exports = {
  ...withPwa({
    pwa: {
      dest: "public"
    }
  }),
  ...withImages(),
  sassOptions: {
    includePaths: [ `${__dirname}/src/styles/` ],
  }
};
