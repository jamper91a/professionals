class Sounds {
  static init(){
    ion.sound({
      sounds: [
        {
          name: "inflicted",
          volume: 1,
          preload: true
        }
      ],
      path: "dependencies/ion.sound-3.0.7/sounds/",
    });
  }

  static play(sound, options = {}){
    ion.sound.play(sound, options);
  }
  static stop(){
    ion.sound.destroy();
  }
  static chatNotification(){
    this.play('inflicted', {loop: true});
  }
}
