/**
 * Chat.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    duration:{
      type: "number"
    },
    maxDuration:{
      type: "number"
    },
    paid: {
      type: "boolean"
    },
    startTime:{
      type: "ref",
      columnType: 'datetime'
    },
    finishTime:{
      type: "ref",
      columnType: 'datetime'
    },
    cost: {
      type: "number"
    },
    customerLastPing:{
      type: "ref",
      columnType: 'datetime'
    },
    professionalLastPing:{
      type: "ref",
      columnType: 'datetime'
    },
    billed: {
      type: "boolean",
      defaultsTo: false
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    customer:{
      model: "customer"
    },
    professional:{
      model: "professional"
    },
    conversation: {
      model: "conversation"
    },
    chatState: {
      model: "state"
    },
    customerState: {
      model: "state"
    },
    professionalState: {
      model: "state"
    }
  },

};

