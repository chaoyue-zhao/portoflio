const chao = {};

chao.greeting = () => {
  const date = new Date
  const time = date.getHours();

  if (time >= 5 && time <= 11){
    document.querySelector('.greeting').innerHTML = 'Morning';
  } else if (time >=12 && time <= 16){
    document.querySelector('.greeting').innerHTML = 'Afternoon';
  } else if (time >=17 && time <= 22) {
    document.querySelector('.greeting').innerHTML = 'Evening';
  } else if ((time >=22 && time <= 24) || time < 4){
    document.querySelector('.greeting').innerHTML = 'Night';
  }
};

chao.parallax = () => {

  // Init ScrollMagic
  let controller = new ScrollMagic.Controller();

  // get all triggers
  const triggers = ["#slide-1", "#slide-2", "#slide-3", "#slide-4"];

  // create scenes for each of the triggers
  triggers.forEach(function (trigger, index) {

    // number for highlighting scenes
    const num = index + 1;
    
    // make scene
    const triggerScene = new ScrollMagic.Scene({
      triggerElement: trigger,
      offset: -95
    })
      .setClassToggle("#slide-" + num, "is-active")
      .addTo(controller);
 })
}
chao.init = () => {
  chao.greeting();
  chao.parallax();
};

(function () {
  chao.init();
})();

