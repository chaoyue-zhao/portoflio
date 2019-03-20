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

chao.navigation = () => {
  $('.nav__button').on("click", (e) => {
    console.log(e.target);
    $('.nav__nav').toggleClass("open");
    $('.nav__overlay').toggleClass("open");
  })
}

chao.carousel = () => {
  $('.main-carousel').flickity({
    cellAlign: 'left',
    contain: true
  });
}

chao.parallax = () => {

  /**************************************************************
   THIS LOVELY BLOGPOST ON PARALLEX FROM PETR TICHY SAVED MY LIFE
   CREDIT HERE: https://t.co/CwcyHXK1g5?amp=1
   **************************************************************/
  
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
      offset: 95
    })
      .setClassToggle("#slide-" + num, "is-active")
      .addTo(controller);
  })

  // move bcg container when slide gets into the view
  triggers.forEach(function (trigger, index) {

    const $bcg = $(trigger).find('.bcg');

    const triggerParallaxScene = new ScrollMagic.Scene({
      triggerElement: trigger,
      triggerHook: 1,
      duration: "80%"
    })
      .setTween(TweenMax.from($bcg, 1, { y: '-40%', autoAlpha: 0.3, ease: Power0.easeNone }))
      .addTo(controller);
  });

  // move bcg container when intro gets out of the the view
    const introTl = new TimelineMax();

    introTl
      .to($('#intro h1, #intro h2, .scroll-hint'), 0.2, { autoAlpha: 0, ease: Power0.easeNone })
      .to($('#intro.bcg'), 1.4, { y: '20%', ease: Power1.easeOut }, '-=0.2')
      .to($('#intro'), 0.7, { autoAlpha: 0.7, ease: Power0.easeNone }, '-=1.4');

    const introScene = new ScrollMagic.Scene({
      triggerElement: '#intro',
      triggerHook: 0,
      duration: "100%"
    })
    .setTween(introTl)
    .addTo(controller);

  // change behavior of controller to animate scroll instead of jump
    controller.scrollTo(function (newpos) {
      TweenMax.to(window, 1, { scrollTo: { y: newpos }, ease: Power1.easeInOut });
    });

   //  bind scroll to anchor links
   $(document).on("click", "a[href^='#']", function (e) {
    var id = $(this).attr("href");
    if ($(id).length > 0) {
      e.preventDefault();

      // trigger scroll
      controller.scrollTo(id);

      // if supported by the browser we can even update the URL.
      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  });
}

chao.init = () => {
  chao.greeting();
  chao.navigation();
  chao.carousel();

  if ($(window).width() >= 1150) {
    // do some magic
    chao.parallax();
  }
};

(function () {
  chao.init();
})();

