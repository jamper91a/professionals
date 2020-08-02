module.exports = {


  friendlyName: 'Find one professional',


  description: 'Function to find one specific professional ',


  inputs: {
    professionalId:{
      type: "number",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    notFound: {
      description: 'Professional not found'
    }

  },


  fn: async function ({professionalId}) {
    let professional = await Professional.findOne({id: professionalId})
      .populate('user')
      .populate('profession')
      .populate('state');
    if(professional)
      return professional;
    else
      throw 'notFound';
  }


};

