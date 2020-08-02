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
    professionalNoCreated: {
      description: 'Professional was not created'
    },
    userNoCreated: {
      description: 'User was not created'
    }

  },


  fn: async function (inputs) {

    return await sails.getDatastore()
      .transaction(async (db)=> {

        //Create user
        let newUser;
        try {
          inputs.user.group = sails.config.custom.USER_PROFESSIONAL;
          inputs.user.db = db;
          newUser = await sails.helpers.user.create.with(inputs.user);
        } catch (e) {
          throw 'userNoCreated';
        }
        if(newUser){
          const professional = {
            picture: "",
            score: 5,
            profession: inputs.profession,
            rate: inputs.rate,
            state: sails.config.custom.PROFESSIONAL_STATES.OFFLINE,
            user: newUser.id
          };
          try {
            let newProfessional = await Professional.create(professional).fetch().usingConnection(db);
            newProfessional.user = newUser;
            if(newProfessional){
              return  newProfessional;
            }else{
              throw 'professionalNoCreated';
            }
          } catch (e) {
            throw 'professionalNoCreated';
          }

        }else{
          throw 'userNoCreated';
        }
      });


  }


};

