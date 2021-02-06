"use strict";

const withImages = require("next-images");

module.exports = withImages({
  sassOptions: {
    includePaths: [ `${__dirname}/src/styles/` ],
  }
});
