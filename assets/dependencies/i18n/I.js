class I {


  static init() {
    console.log('Inter');
    const self = this;
    return new Promise (async (resolve, reject) => {
      try {
        self.en = null;
        //  Load the JSON File
        let text = await $.ajax('/dependencies/i18n/english.json');
        //  Set the data
        self.en = i18n.create(text);
        //Get default language
        self.userLang = localStorage.getItem('userLang');
        if (!self.userLang) {
          self.userLang = navigator.language || navigator.userLanguage;
          localStorage.setItem('userLang', self.userLang);
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });



  }

    static get(key) {
    let max=0;
    const self = this;
      return new Promise (async (resolve, reject) => {
        const interval = setInterval(function () {
          try {
            let value = '';
            key = key.replace(/ /g,"_");
            if(self.userLang && self.en) {
              value = self._obtain(key);
              if(!value) {
                reject('No value');
              }
            }
            if(value) {
              clearInterval(interval);
              resolve(value);
            }
            max++;
            if(max === 10) {
              clearInterval(interval);
              reject('TimeOut');
            }

          } catch (e) {
            reject(e);
          }

        }, 500);

      });

    }

    static _obtain(key) {
    const self = this;
      switch (self.userLang) {
        case 'en':
          return self.en(key);
        default:
          return self.en(key);

      }
    }
}
