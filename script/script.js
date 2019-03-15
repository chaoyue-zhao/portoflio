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

chao.init = () => {
  chao.greeting();
};

(function () {
  chao.init();
})();

