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

      let auxProfessional = await Professional.findOne({id: inputs.professionalId});
      let professional = await Professional.updateOne({id: inputs.professionalId}).set({state: inputs.state, previousState: auxProfessional.state});
      const state = await State.findOne({id:inputs.state});
      const user = await User.findOne({id:professional.user}).populate('country');
      const rate = await Rate.findOne({id: professional.rate}).populate('currency');
      const profession = await Profession.findOne({id: professional.profession});
      professional.state = state;
      professional.user = user;
      professional = sails.helpers.util.formatDate(professional);
      professional.user = sails.helpers.util.formatDate(professional.user);
      professional.rate = rate;
      professional.profession = profession;


      await sails.helpers.socket.send('professionals', sails.config.custom.SOCKET_EVENTS.READER_CHANGE_STATUS, professional);
      return professional;
    } catch (e) {
      throw e;
    }
  }


};

