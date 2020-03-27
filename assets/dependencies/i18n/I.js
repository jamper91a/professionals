class I {


  static init() {
    this.en = null;
    const self=this;
    //  Load the JSON File
    $.ajax("/dependencies/i18n/english.json").done(function (text) {
      //  Set the data
      self.en = i18n.create(text);
      //Get default language
      self.userLang = localStorage.getItem('userLang');
      if(!self.userLang) {
        this.userLang = navigator.language || navigator.userLanguage;
        localStorage.setItem('userLang', this.userLang);
      }
    });


  }

    static get(key) {
    const self = this;
    const interval = setInterval(function () {
      key = key.replace(/ /g,"_");
      if(self.userLang && self.en) {
        switch (self.userLang) {
          case 'en':
            return self.en(key);
          default:
            return self.en(key);

        }
        clearInterval(interval);
      }

    }, 1000);


    }
}
