module.exports = {


  friendlyName: 'Find professionals by',


  description: 'Helper to filter professionals by country or profession',


  inputs: {
    country: {
      type: "number"
    },
    profession: {
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
      let where={};
      if(inputs.profession>0){
        where.profession = inputs.profession;
      }
      //Filter
      let professionals = await Professional.find(where)
        .populate('user')
        .populate('profession')
        .populate('state')
        .paginate(0, 50);
      //Delete those professionals that are not enable and does not belong to the country
      professionals = _.filter(professionals, function(professional) {
        let passByCountry = false;
        if(inputs.country === 0)
          passByCountry = true;
        else if (inputs.country>0 && professional.user.country === inputs.country)
          passByCountry = true;
        return professional.user.enabled===1 && passByCountry
      });
      for await (let professional of professionals) {
        //Find information about their location
          const country = await Country.findOne({id: professional.user.country});
          const rate = await Rate.findOne({id: professional.rate}).populate('currency');
          professional = sails.helpers.util.formatDate(professional);
          professionals.user = sails.helpers.util.formatDate(professional.user);
          professional.user.country = country;
          professional.rate = rate;
      }
      // All done.
      return professionals;
    } catch (e) {
      throw e;
    }
  }


};

