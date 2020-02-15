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
      //Subscribe to socket
      let professionals = await Professional.find()
        .populate('user')
        .populate('profession')
        .populate('state')
        .paginate(0, 50);
      //Delete those users that are not enable, this does not for in the for
      professionals = _.filter(professionals, function(professional) { return professional.user.enabled===1; });
      for await (let professional of professionals) {
        //Find information about their location

        if(professional.user.enabled===0) delete professional;
        else{
          const country = await Country.findOne({id: professional.user.country});
          const rate = await Rate.findOne({id: professional.rate}).populate('currency');
          professional = sails.helpers.util.formatDate(professional);
          professionals.user = sails.helpers.util.formatDate(professional.user);
          professional.user.country = country;
          professional.rate = rate;
        }
      }
      // All done.
      return professionals;
    } catch (e) {
      throw e;
    }
  }


};

