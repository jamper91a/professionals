module.exports = {


  friendlyName: 'Change status',


  description: '',


  inputs: {
    professionalId:{
      type: "number",
      defaultsTo: 0
    },
    state: {
      type: "number",
      required: true
    }
  },


  exits: {
    professionalRequired: {
      description: 'Professional Id is required',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    try {
      if(inputs.professionalId === 0) {
        if (this.req.user && this.req.professional && this.req.professional.id) {
          inputs.professionalId = this.req.professional.id;
        }else{
          throw 'professionalRequired';
        }
      }
      const professional = await sails.helpers.professional.changeStatus.with(inputs);
      // All done.

      return professional;
    } catch (e) {
      throw e;
    }

  }


};
