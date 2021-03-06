'use strict';

var scenario = [
  {    // SCENE 0
    "src": "img/scene02.png",
    "text": "this is scene 2/to scene 3//to scene 4",
    "next": [1, 2],
    "link": {
      "top": "10px",
      "left": "10px",
      "width": "100px",
      "height": "100px"
    },
    "linkUrl": "http://www.goo.ne.jp/howto/"
  }, { // SCENE 1
    "src": "img/scene03.png",
    "text": "this is scene 3",
    "next": 3,
    "link": {
      "top": "10px",
      "left": "50px",
      "width": "20px",
      "height": "100px"
    },
    "linkUrl": "http://www.goo.ne.jp/howto/"
  }, { // SCENE 2
    "src": "img/scene04.png",
    "text": "this is scene 4",
    "next": 0
  }, { // SCENE 3
    "src": "img/scene05.png",
    "text": "this is scene 5",
    "next": 256
  }
];

jQuery(function($) {
  // set variables
  var $SCENE = $("#scene");
  var $MESSAGE = $("#message");
  var $BUTTON_AREA = $("#sec-message");
  var $LINK_AREA = $("#sec-scene");

  var DEF_SCENE = $SCENE.attr("src");
  var DEF_TEXT = "default text";

  var SPEED = 10;

  var BOX_STYLE1 = {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "border": "solid 1px #999",
    "width": "100%",
    "height": "7.8em",
    "boxSizing": "border-box"
  };

  var BOX_STYLE2 = {
    "position": "absolute",
    "top": "2.5em",
    "left": "0",
    "border": "solid 1px #899",
    "width": "100%",
    "height": "1.6em",
    "boxSizing": "border-box"
  };

  var BOX_STYLE3 = {
    "position": "absolute",
    "top": "5.5em",
    "left": "0",
    "border": "solid 1px #989",
    "width": "100%",
    "height": "1.6em",
    "boxSizing": "border-box"
  };

  var LINK_STYLE_DEFAULT = {
    "position": "absolute",
    "display": "block",
    "background": "rgba(0,0,0,0.3)"
  };

  var URL_TO_FINISH = "http://www.goo.ne.jp/";

  var sceneNum = 0;

  // error check
  if($SCENE.length < 1) {
    throw('no <img id="scene">');
  }
  if($MESSAGE.length < 1) {
    throw('no <p id="message">');
  }

  // init
  setNext(0);

  // functions
  function setNext(next) {
    $SCENE.add($MESSAGE).off("click");
    $BUTTON_AREA.find("div").remove();
    if($.isArray(next)) {
      var option1 = $("<div>").attr("id", "button1").css(BOX_STYLE2);
      var option2 = $("<div>").attr("id", "button2").css(BOX_STYLE3);

      option1.on("click", function() {
        $BUTTON_AREA.find("div").remove();
        nextScene(scenario, next[0], setNext);
      });
      option2.on("click", function() {
        $BUTTON_AREA.find("div").remove();
        nextScene(scenario, next[1], setNext);
      });
      $BUTTON_AREA.append(option1, option2);
    } else {
      var option = $("<div>").attr("id", "button1").css(BOX_STYLE1);
      option.on("click", function() {
        $BUTTON_AREA.find("div").remove();
        nextScene(scenario, next, setNext);
      });
      $BUTTON_AREA.append(option);
    }
  }
  function nextScene(arr, num, callback) {
    var sceneData;
    if(arr.length <= num) {
      location.href = URL_TO_FINISH;
    } else {
      sceneData = arr[num];
      changeSet(sceneData, callback);
      return sceneData.next;
    }
  }
  function changeSet(hash, callback) {
    var src, text;
    hash = (hash) ? hash : {} ;
    src = (hash.src) ? hash.src : DEF_SCENE ;
    text = (hash.text) ? hash.text : DEF_TEXT ;

    changeScene(src);
    changeMessage(text, hash.next, callback);
    changeLink(hash.linkUrl, hash.link);
  }

  function changeScene(src) {
    $SCENE.attr("src", src);
  }

  function changeMessage(text, next, callback) {
    var interval, i;
    text = text.split("");
    $MESSAGE.html("");
    for(i = 0; i < 5; i++){
      showOneChar(text.shift());
    }
    interval = setInterval(function() {
      if(text.length <= 0) {
        clearInterval(interval);
        callback(next);
      } else {
        showOneChar(text.shift());
      }
    }, SPEED);

    function showOneChar(chr) {
      if(chr === "/") {
        $MESSAGE.html($MESSAGE.html() + "<br>");
      } else {
        $MESSAGE.html($MESSAGE.html() + chr);
      }
    }
  }
  function changeLink(link, hash) {
    var a;
    $LINK_AREA.find("a").remove();
    if(link) {
      a = $("<a>").css(LINK_STYLE_DEFAULT).css(hash).attr("href", link);
      $LINK_AREA.append(a);
    } else {
      return false;
    }
  }
});
