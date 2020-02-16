module.exports = {


  friendlyName: 'Change status',


  description: 'Help to chnage the status of a professional',


  inputs: {
    professionalId:{
      type: "number"
    },
    state: {
      type: "number"
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {

      let professional = await Professional.updateOne({id: inputs.professionalId}).set({state: inputs.state});
      sails.sockets.broadcast('professionals', 'changeStatus', professional);
      return professional;
    } catch (e) {
      throw e;
    }
  }


};

