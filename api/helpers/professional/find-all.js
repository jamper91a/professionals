module.exports = {


  friendlyName: 'Find all',


  description: 'Find all professionals',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function () {
    try {
      let professionals = await Professional.find().populate('user').populate('profession').paginate(0, 50);
      professionals = _.filter(professionals, function(professional) { return professional.user.enabled===1; });
      for await (let professional of professionals) {
        //Find information about their location

        if(professional.user.enabled===0) delete professional;
        else{
          const country = await Country.findOne({id: professional.user.country});
          professional = sails.helpers.util.formatDate(professional);
          professionals.user = sails.helpers.util.formatDate(professional.user);
          professional.user.country = country;
        }
      }
      // All done.
      return professionals;
    } catch (e) {
      throw e;
    }
  }


};

