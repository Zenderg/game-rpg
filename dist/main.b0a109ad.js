// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY"
  },
  IMAGE: {
    LOGO: "logo.png",
    PLAY: "play_button.png",
    OPTIONS: "options_button.png",
    TITLE: "title_bg.jpg"
  },
  AUDIO: {
    TITLE: "shuinvy-childhood.mp3"
  },
  SPRITE: {
    CAT: "cat.png"
  }
};
},{}],"src/scenes/LoadScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var LoadScene =
/** @class */
function (_super) {
  __extends(LoadScene, _super);

  function LoadScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.LOAD
    }) || this;
  }

  LoadScene.prototype.loadImages = function () {
    this.load.setPath("./assets/image");

    for (var prop in CST_1.CST.IMAGE) {
      //@ts-ignore
      this.load.image(CST_1.CST.IMAGE[prop], CST_1.CST.IMAGE[prop]);
    }
  };

  LoadScene.prototype.loadSprites = function (frameConfig) {
    this.load.setPath("./assets/sprite");

    for (var prop in CST_1.CST.SPRITE) {
      //@ts-ignore
      this.load.spritesheet(CST_1.CST.SPRITE[prop], CST_1.CST.SPRITE[prop], frameConfig);
    }
  };

  LoadScene.prototype.loadAudios = function () {
    this.load.setPath("./assets/audio");

    for (var prop in CST_1.CST.AUDIO) {
      //@ts-ignore
      this.load.audio(CST_1.CST.AUDIO[prop], CST_1.CST.AUDIO[prop]);
    }
  };

  LoadScene.prototype.init = function () {};

  LoadScene.prototype.preload = function () {
    var _this = this;

    this.load.spritesheet('anna', './assets/sprite/anna.png', {
      frameHeight: 64,
      frameWidth: 64
    });
    this.load.atlas('characters', './assets/atlas/characters.png', './assets/atlas/characters.json');
    this.load.atlas('daze', './assets/atlas/daze.png', './assets/atlas/daze.json');
    this.loadImages();
    this.loadSprites({
      frameWidth: 32,
      frameHeight: 32
    });
    this.loadAudios();
    var progressBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });
    this.load.on("progress", function (percent) {
      progressBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 20);
      console.log(percent);
    });
    this.load.on('complete', function () {
      _this.scene.start(CST_1.CST.SCENES.MENU);
    });
  };

  LoadScene.prototype.create = function () {};

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.ts"}],"src/scenes/MenuScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var MenuScene =
/** @class */
function (_super) {
  __extends(MenuScene, _super);

  function MenuScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.MENU
    }) || this;
  }

  MenuScene.prototype.init = function () {};

  MenuScene.prototype.preload = function () {
    console.log("MENU preload");
  };

  MenuScene.prototype.create = function () {
    var _this = this;

    console.log("MENU create");
    this.add.image(0, 0, CST_1.CST.IMAGE.TITLE).setOrigin(0).setDepth(0);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, CST_1.CST.IMAGE.LOGO).setDepth(1);
    var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST_1.CST.IMAGE.PLAY).setDepth(1);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, CST_1.CST.IMAGE.OPTIONS).setDepth(1);
    var cat = this.add.sprite(100, 100, CST_1.CST.SPRITE.CAT).setDepth(1);
    this.anims.create({
      key: 'walk',
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers(CST_1.CST.SPRITE.CAT, {
        frames: [0, 1, 2, 3]
      })
    });
    cat.setScale(2);
    cat.setVisible(false);
    playButton.setInteractive();
    playButton.on('pointerover', function () {
      cat.setVisible(true);
      cat.x = playButton.x - playButton.width;
      cat.y = playButton.y;
      console.log(cat);
      cat.play('walk');
    });
    playButton.on('pointerout', function () {
      cat.setVisible(false);
    });
    playButton.on('pointerup', function () {
      _this.scene.start(CST_1.CST.SCENES.PLAY);
    });
  };

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.ts"}],"src/classes/Anna.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Anna =
/** @class */
function (_super) {
  __extends(Anna, _super);

  function Anna(scene, x, y, texture, frames) {
    var _this = _super.call(this, scene, x, y, texture, frames) || this;

    scene.sys.updateList.add(_this);
    scene.sys.displayList.add(_this);

    _this.setOrigin(0, 0).setDepth(1);

    scene.physics.world.enableBody(_this);
    _this.hp = 10;
    var hpBar = scene.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });
    return _this;
  }

  return Anna;
}(Phaser.Physics.Arcade.Sprite);

exports.default = Anna;
},{}],"src/scenes/PlayScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var Anna_1 = __importDefault(require("../classes/Anna"));

var PlayScene =
/** @class */
function (_super) {
  __extends(PlayScene, _super);

  function PlayScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.PLAY
    }) || this;
  }

  PlayScene.prototype.init = function () {};

  PlayScene.prototype.preload = function () {
    this.animsCreate();
    this.textures.addSpriteSheetFromAtlas("hooded", {
      frameHeight: 64,
      frameWidth: 64,
      atlas: "characters",
      frame: "hooded"
    });
    this.textures.addSpriteSheetFromAtlas("mandy", {
      frameHeight: 64,
      frameWidth: 64,
      atlas: "characters",
      frame: "mandy"
    });
    this.load.tilemapTiledJSON("map", './assets/map2.json');
    this.load.image("tiles", './assets/tiles2.jpg');
  };

  PlayScene.prototype.create = function () {
    var _this = this;

    var pimple = this.add.sprite(100, 100, 'daze');
    pimple.play('dazzle');
    this.anna = new Anna_1.default(this, 400, 400, 'anna', 26);
    var hpBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });
    hpBar.fillRect(400, 400, 100, 20).setDepth(2);
    this.hooded = this.physics.add.sprite(200, 200, 'hooded').setDepth(1);
    this.assassins = this.physics.add.group({
      immovable: true
    });
    this.fireAttacks = this.physics.add.group(); // create map

    var map = this.make.tilemap({
      key: 'map'
    });
    var tileset = map.addTilesetImage('my-tiles', 'tiles');
    map.createStaticLayer('bg', tileset, 0, 0).setDepth(0);
    var buildings = map.createStaticLayer('buildings', tileset, 0, 0).setDepth(0);
    buildings.setCollisionByProperty({
      collides: true
    });
    this.physics.add.collider(this.anna, buildings);
    this.physics.add.collider(this.assassins, buildings);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels); //debug layers

    buildings.renderDebug(this.add.graphics(), {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    }); // init following camera

    this.cameras.main.startFollow(this.anna);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.anna.setSize(40, 50).setOffset(10, 10);
    this.anna.setCollideWorldBounds(true);
    this.assassins.add(this.hooded); // pimple.on('animationupdate', () => {
    //     console.log("ОБНОВЛЯЮСЬ ХОЗЯИН");
    // });
    // pimple.on('animationrepeat', () => {
    //     console.log("НАЧИНАЮ ОБНОВЛЕНИЕ ЗАНОВО");
    // });

    this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
    this.input.on('pointermove', function (pointer) {
      if (pointer.isDown) {
        var fire_1 = _this.add.sprite(pointer.worldX, pointer.worldY, 'daze', 'fire00.png').play('blaze');

        _this.fireAttacks.add(fire_1);

        fire_1.on('animationcomplete', function () {
          fire_1.destroy();
        });
      }
    });
    this.physics.world.addCollider(this.anna, this.assassins, function (anna, hooded) {
      hooded.destroy();
      _this.anna.hp--;
      if (_this.anna.hp <= 0) anna.destroy();
      console.log(_this.anna.hp);
      console.log();
      var x = Phaser.Math.Between(0, _this.game.renderer.width);
      var y = Phaser.Math.Between(0, _this.game.renderer.height);

      for (var i = 0; i < 2; i++) {
        _this.assassins.add(_this.physics.add.sprite(x, y, 'hooded').setScale(2));
      }
    });
    this.physics.world.addCollider(this.fireAttacks, this.assassins, function (fireAttacks, hooded) {
      fireAttacks.destroy();
      hooded.destroy();
      console.log();
      var x = Phaser.Math.Between(0, _this.game.renderer.width);
      var y = Phaser.Math.Between(0, _this.game.renderer.height);

      for (var i = 0; i < 2; i++) {
        _this.assassins.add(_this.physics.add.sprite(x, y, 'hooded').setScale(2));
      }
    });
  };

  PlayScene.prototype.update = function (time, delta) {
    for (var i = 0; i < this.assassins.getChildren().length; i++) {
      var assasin = this.assassins.getChildren()[i];
      var distance = Phaser.Math.Distance.Between(assasin.x, assasin.y, this.anna.x, this.anna.y);
      var speed = 50; // if (distance <= 100) speed = 0;

      this.physics.moveToObject(assasin, this.anna, speed);
    }

    if (this.anna.active) {
      if (this.keyboard.D.isDown) {
        this.anna.setVelocityX(128);
      }

      if (this.keyboard.A.isDown) {
        this.anna.setVelocityX(-128);
      }

      if (this.keyboard.W.isDown) {
        this.anna.setVelocityY(-128);
      }

      if (this.keyboard.S.isDown) {
        this.anna.setVelocityY(128);
      }

      if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
        this.anna.setVelocityX(0);
      }

      if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
        this.anna.setVelocityY(0);
      }

      if (this.anna.body.velocity.x > 0) {
        this.anna.play("right", true);
      } else if (this.anna.body.velocity.x < 0) {
        this.anna.anims.playReverse("left", true);
      } else if (this.anna.body.velocity.y < 0) {
        this.anna.play("up", true);
      } else if (this.anna.body.velocity.y > 0) {
        this.anna.play("down", true);
      }
    }
  };

  PlayScene.prototype.animsCreate = function () {
    this.anims.create({
      key: 'blaze',
      duration: 50,
      frames: this.anims.generateFrameNames('daze', {
        prefix: 'fire0',
        suffix: '.png',
        end: 55
      })
    });
    this.anims.create({
      key: 'dazzle',
      frameRate: 30,
      frames: this.anims.generateFrameNames('daze', {
        prefix: 'daze0',
        suffix: '.png',
        start: 0,
        end: 41
      }),
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('anna', {
        start: 27,
        end: 35
      })
    });
    this.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('anna', {
        start: 9,
        end: 17
      })
    });
    this.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('anna', {
        start: 0,
        end: 8
      })
    });
    this.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('anna', {
        start: 18,
        end: 26
      })
    });
  };

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene;
},{"../CST":"src/CST.ts","../classes/Anna":"src/classes/Anna.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";
/** @type {import("../typings/phaser")}*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LoadScene_1 = require("./scenes/LoadScene");

var MenuScene_1 = require("./scenes/MenuScene");

var PlayScene_1 = require("./scenes/PlayScene");

var game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, PlayScene_1.PlayScene],
  render: {
    pixelArt: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT
  }
});
},{"./scenes/LoadScene":"src/scenes/LoadScene.ts","./scenes/MenuScene":"src/scenes/MenuScene.ts","./scenes/PlayScene":"src/scenes/PlayScene.ts"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33223" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map