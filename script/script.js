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
  } else if ((time >=22 && time <= 24) || (time < 4 )){
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
    contain: true,
    watchCSS: true,
    groupCells: true
  });
}

chao.loading = () => {
/**************************************************************
  THIS LOVELY BLOGPOST ON PRE-LOADING FROM PETR TICHY SAVED MY LIFE
  CREDIT HERE: https://ihatetomatoes.net/a-simple-one-page-template-with-a-preloading-screen/
**************************************************************/

  // number of loaded images for preloader progress
  let loadedCount = 0; //current number of images loaded
  const imagesToLoad = $('.bcg').length; //number of slides with .bcg container
  let loadingProgress = 0; //timeline progress - starts at 0

  $('.bcg').imagesLoaded({
    background: true
  }).progress(function (instance, image) {
    loadProgress();
  });

  function loadProgress(imgLoad, image) {
    //one more image has been loaded
    loadedCount++;

    loadingProgress = (loadedCount / imagesToLoad);

    // GSAP tween of our progress bar timeline
    TweenLite.to(progressTl, 0.7, { progress: loadingProgress, ease: Linear.easeNone });
  }

  //progress timeline
  const progressTl = new TimelineMax({
    paused: true,
    onUpdate: progressUpdate,
    onComplete: loadComplete
  });

  progressTl
    //tween the progress bar width
    .to($('.progress span'), 1, { width: 100, ease: Linear.easeNone });

  //as the progress bar width updates and grows we put the percentage loaded in the screen
  function progressUpdate() {
    //the percentage loaded based on the tween's progress
    loadingProgress = Math.round(progressTl.progress() * 100);

    //we put the percentage in the screen
    $(".txt-perc").text(loadingProgress + '%');
}

  function loadComplete() {
    // preloader out
    var preloaderOutTl = new TimelineMax();

    preloaderOutTl
      .to($('.progress'), 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn })
      .to($('.txt-perc'), 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn }, 0.1)
      .set($('body'), { className: '-=is-loading' })
      .set($('#intro'), { className: '+=is-loaded' })
      .to($('#preloader'), 0.7, { yPercent: 100, ease: Power4.easeInOut })
      .set($('#preloader'), { className: '+=is-hidden' })
      .from($('#intro .header__title'), 1, { autoAlpha: 0, ease: Power1.easeOut }, '-=0.2')
      .from($('#intro .header__tagline'), 0.7, { autoAlpha: 0, ease: Power1.easeOut }, '+=0.2')
      .from($('#intro .nav__button'), 1, { autoAlpha: 0, ease: Power1.easeOut }, '-=0.2')
      .from($('#intro .header__logo'), 1, { autoAlpha: 0, ease: Power1.easeOut }, '-=0.2')
      .from($('.scroll-hint'), 0.3, { y: -20, autoAlpha: 0, ease: Power1.easeOut }, '+=0.1');

    return preloaderOutTl;
  }
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
  chao.loading();

  if ($(window).width() >= 1150) {
    chao.parallax();
  }
};

(function () {
  chao.init();
})();

