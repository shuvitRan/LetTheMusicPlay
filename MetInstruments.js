  
  /*
   *
   * This is the main section of this p5 app, including Setup and Draw.
   * The project can be deconstructed by looking at switch case function in draw(). 
   * 
   */

  
  let metData;
  let images = [];
  
  let objIds = [];
  let img_height = 300;
  let sound, playSound = true;;
  let selection = "waitSelect";
  let page = "Start";
  let vizPage = 1;
  let isClickAble = false;

  let font1;
  var movingDots = []
  let myMainFont = 'Palatino';
  let myTime = 0;
  var t;

  let correctSound, wrongSound, clickSound;

  let posneg = 1,
    random4Shape = 1;

  // sound Vis
  let fft, wfft, fft2;
  let fftCircles = [];
  let fftLines = [];

  let showInfo = false;

  function preload() {
    metData = loadJSON("DataRequest/insdata.json", data => {
      font1 = loadFont("styleFile/Cochinchine.ttf");
      correctSound = loadSound("sound/fx/correct.mp3");
      wrongSound = loadSound("sound/fx/wrong.mp3");
      clickSound = loadSound("sound/fx/click.mp3");
      // selectSoundFx = loadSound("sound/select.mp3")
      data.forEach(function (n, i) {
        images[i] = loadImage("resizeImg/" + metData[i].objIds + ".jpg");
        // sound[i]= loadSound("../../MajorStudioSupportFile/InteractiveProject/WorldMusicTrack/"+metData[i].objIds+".mp3");
        objIds[i] = metData[i].objIds;
      });
    });
  }

  function setup() {

    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('container');
    fft = new p5.FFT(0.9, 64);
    fft2 = new p5.FFT(0.9, 16);
    wfft = width / 64;
    clickSound.setVolume(0.5);

    // Add an initial set of boids into the system
    for (let i = 0; i < 64; i++) {
      fftCircles.push(new Jitter());
      fftLines.push(new SoundLine());
    }

    textFont(font1);
    textSize(120);
    let aString = 'Let the music play!';
    let tWidth = textWidth(aString);
    var points = font1.textToPoints(aString, (width - tWidth) / 2, height / 2 - 100, 120, {
      sampleFactor: 0.25


    });
    for (let i = 0; i < points.length; i++) {
      let pt = points[i];
      let movingDot = new MovingDot(pt.x, pt.y);
      movingDots.push(movingDot);
    }
    t = 0.0;
    textFont(myMainFont);

  }


  function draw() {


    switch (page) {
      case "Start":

        background(20);
        // lineViz();
        circleViz();
        DescriptionParagraph(height / 2 + 100);
        // textFont(font1);

        for (let i = 0; i < movingDots.length; i++) {
          var v = movingDots[i];
          v.behaviors();
          v.update();
          v.show();
          // fill(i);

        }
        noStroke(0);
        strokeWeight(0);
        StartButton();

        break;

      case "Loading":
        background(20, 20, 20);
        fill(100);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("loading", width / 2, height / 2)

        break;
      case "Quize":
        background(20, 20, 20);
        SoundViz();
        noStroke();
        displayQuizeImages();

        // Check selection
        if (selection == "Wrong") {

          playerSelected = 0;
          fill(250);
          textSize(50);
          textAlign(CENTER, CENTER);
          text("WHOOPS...TRY AGAIN.", width / 2, height / 2 - 250);
          setTimeout(function () {
            selection = "waitSelect";
          }, 500);
        } else if (selection == "Correct") {
          fill(250, 250, 250);
          textSize(50);
          textAlign(CENTER, CENTER);
          text("YES, YOU ARE RIGHT.", width / 2, height / 2 - 250);
          setTimeout(function () {
            selection = "waitSelect";
            page = "Result";

          }, 1000);
        };

        break;

      case "Result":

        DescriptionPage(resultInfo, resultPicture);
        DescriptionParagraph(height / 2 + 300);


        if (!showInfo) {
          showInfo = true;

        } else {
          return;
        };

        break;
      default:

    }



  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    if (page != "Start") {
      soundButton.checkWidth(width / 2 + 10, 550);
      restartButton.checkWidth(width / 2 - 210, 550);

    }
    if (page == "Result") {
      infoButton.checkWidth(width / 2 - 80, height / 2 + 40);
    }

  }

  // Manage Sounds
  function SoundStatus() {

    if (!sound.isPlaying() && playSound == true) {
      sound.loop();
    } else if (sound.isPlaying() && playSound == false) {

      sound.pause();

    } else if (sound.isPlaying() && playSound == false) {
      // return;
      sound.pause();
    } else if (!sound.isPlaying() && playSound == true) {
      sound.loop();
    };
  }

  function DisplayImages() {
    let thiswidth = 0;
    let thisY = 0;
    for (let i = 0; i < Object.keys(metData).length; i++) {
      console.log(metData[i].objIds);
      images[i].resize(0, img_height);
      image(images[i], thiswidth, thisY, images[i].width, images[i].height);
      text(metData[i].title, thiswidth + 20, images[i].height + thisY + 20);
      thiswidth += images[i].width;
      if (i % 4 == 0) {
        thisY += images[i].height + 40;
        thiswidth = 0;
      }
    }
  }



  function DescriptionParagraph(y) {
    this.y = y;
    push();
    fill(200);
    textSize(12);
    textAlign(CENTER, CENTER);
    text("This is an interactive project based on Met's instruments collection.\n The project aims to provide the audience with a sensual association between the 24 instruments and their sounds.", width / 2, this.y);
    pop();
  }