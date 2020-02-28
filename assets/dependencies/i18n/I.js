class I {


  static init() {
    this.en = null;
    const self=this;
    //  Load the JSON File
    $.ajax("/dependencies/i18n/english.json").done(function (text) {
      //  Set the data
      console.log('text', text);
      self.en = i18n.create(text);
      console.log(self.en);
    });
    //Get default language
    this.userLang = localStorage.getItem('userLang');
    if(!this.userLang) {
      this.userLang = navigator.language || navigator.userLanguage;
      localStorage.setItem('userLang', this.userLang);
    }

  }

    static get(key) {
      key = key.replace(/ /g,"_");
      switch (this.userLang) {
        case 'en':
          return this.en(key);
        default:
          return this.en(key);

      }

    }
}
