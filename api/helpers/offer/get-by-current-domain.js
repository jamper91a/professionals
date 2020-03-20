module.exports = {


  friendlyName: 'Get by current domain',


  description: '',


  inputs: {
    domainName: {
      type: 'string',
      required: false
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'By current domain',
    },
    noOffers: {
      outputFriendlyName: 'No offers for current domain'
    },
    domainNotValid: {
      outputFriendlyName: 'Domain not valid'
    }

  },


  fn: async function ({domainName}) {

    const groupBy = key => array =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});

    const groupByGateway = groupBy('gateway');
    const domain = await Domain.findOne({domain: domainName});
    if(domain) {
      const offers = await Offer.find({domain: domain.id, active: 1});
      if(offers && offers.length>0) {
        return groupByGateway(offers);
      } else {
        throw 'noOffers';
      }
    } else {
      throw 'domainNotValid';
    }

  }


};

