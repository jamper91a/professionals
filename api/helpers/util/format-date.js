var moment = require('moment');
module.exports = {


  friendlyName: 'Format several dates',


  description: 'This helper will format the dates of every record. Will format the felds createdAt and updatedAt',


  inputs: {
    record: {
      type: "ref",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,


  fn: function ({record}) {
      record.createdAt = moment(record.createdAt).format('YYYY-MM-DD');
      record.updatedAt = moment(record.updatedAt).format('YYYY-MM-DD');
    return record;
  }


};

