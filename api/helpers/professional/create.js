module.exports = {


  friendlyName: 'Create',


  description: 'Create professional.',


  inputs: {
    user:{
      type: "json",
      required: true
    },
    profession: {
      type: "number",
      required: true
    },
    rate: {
      type: "number",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    //Create user
    try{
      inputs.user.group = sails.config.custom.USER_PROFESSIONAL;
      const newUser = await sails.helpers.user.create.with(inputs.user);
      if(newUser){
        const professional = {
          picture: "",
          score: 5,
          profession: inputs.profession,
          rate: inputs.rate,
          state: sails.config.custom.STATUS_OFFLINE,
        };
        const newProfessional  = await Professional.create(professional).fetch();
        if(newProfessional){
          return  newProfessional;
        }else{
          throw {serverError: {message: "Professional not created"}};
        }
      }else{
        throw {serverError: {message: "User not created"}};
      }

    } catch (e) {
      throw {serverError: e};
    }
  }


};

