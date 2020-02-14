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
      let professionals = await Professional.find().populate('user').paginate(0, 50);
      professionals = _.filter(professionals, function(professional) { return professional.user.enabled===1; });
      _.forEach(professionals, function (professional) {
        if(professional.user.enabled===0) delete professional;
        else{
          professional = sails.helpers.util.formatDate(professional);
          professionals.user = sails.helpers.util.formatDate(professional.user);
        }
      });
      // All done.
      return professionals;
    } catch (e) {
      throw e;
    }
  }


};

