const button = document.querySelector('button');
const progress = document.querySelector('.progress');
const h2 = document.querySelector('h2');
const loaderContainer = document.querySelector('.dependencies-loader-container')
const loadingAnimationContainer = document.querySelector('.preload-window-container')
var i = 0;
var x = 100;

loadingSpinner.style.display = 'none';

progress.style.width = '0%';

function animationRun() {
  if (progress.style.width === '0%') {
    setInterval(speed, 90);
    function speed(){
    if (i < 100) {
        i++;
        h2.innerHTML = i + '%';
        progress.style.width = i + '%';
      }
    }
  }
  else{
    setInterval(sss, 50);
    function sss(){
        if (x > 0) {
        x--;
        h2.innerHTML = x + '%';
        progress.style.width = x + '%';
        }
    }
  }

  new TypeIt('.dependencies-loader-container', {
      speed:20,
      afterComplete: function() {
          loadingAnimationContainer.style.display = 'none';
          loadingSpinner.style.display = '';
      }
  })
  .type("Reading package lists")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .type("   Done")
  .type("<br>Loading dependencies")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .type("   Done")
  .type("<br>Updatating database")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .type("   Done")
  .type("<br>Generating terminal environment")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .type("   Done")
  .type("<br>Registering variables")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .pause(200)
  .type(".")
  .type("   Done")
  .type("<br>Launching terminal")
  .type(".")
  .pause(100)
  .type(".")
  .pause(100)
  .type(".")
  .pause(100)
  .type(".")
  .pause(100)
  .type(".")
  .pause(100)
  .type(".")
  .pause(100)
  .type(".")
  .pause(100)
  .type(".")
  .go();
}

setTimeout(() => {
  minimizedWindowBox.style.display = 'none';
  backgroundContent.style.display = 'none';
  animationRun();
  loadingSpinnerTimeout();
}, 10)