"use strict";
let datafire = require('datafire');

let fantasydata_nascar_v2 = require('@datafire/fantasydata_nascar_v2').actions;
module.exports = new datafire.Action({
  handler: async (input, context) => {
    let driver = await Promise.all([].map(item => fantasydata_nascar_v2.DriverDetails({
      format: "json",
      driverid: "",
    }, context)));
    return driver;
  },
});
