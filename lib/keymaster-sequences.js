(function (global) {
  'use strict';

  var re_space = new RegExp('\\s+')
    , timeout = 1000
    , sequences = {}
    , lastDocumentEvent = null;

  function keySequence(str, scope, method) {
    if (!re_space.test(str)) return key.apply(this, arguments);
    if (typeof scope == 'function') method = scope, scope = 'all';

    var keys = str.split(re_space)
      , addedHandlers = []
      , sequence = sequences[str] = {
            keys: keys
          , events: []
          , _gc: null
          , _working: null
        }
      , handler = function() {
          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift(sequence, method);
          return sequenceHandler.apply(this, args);
        }

    for (var i=0; i < keys.length; i++) {
      var k = keys[i];
      if (!~addedHandlers.indexOf(k)) {
        // console.log('binding', k);
        key(k, scope, handler);
        addedHandlers.push(k);
      }
    };
  }

  function sequenceHandler(sequence, method, evt, handler) {
    // console.log('handler', handler.shortcut, this[0]);
    var curTarget
      , lastEvt;

    if (null === sequence._working) {
      resetSequence(sequence);
    }

    clearTimeout(sequence._gc);
    sequence._gc = setTimeout(function() {
      resetSequence(sequence);
    }, timeout);

    curTarget = sequence._working[0];
    lastEvt = sequence.events[sequence.events.length - 1] || null;

    if (handler.shortcut == curTarget && (lastEvt === null || lastEvt === lastDocumentEvent)) {
      sequence._working.shift()
      sequence.events.push(evt);

      if (sequence._working.length == 0) {
        resetSequence(sequence);
        return method.call(this, evt, handler, sequence);
      }
    }
    else {
      resetSequence(sequence);
    }
  }

  function resetSequence(sequence) {
    sequence._working = sequence.keys.slice(0);
    sequence.events = [];
    if (null !== sequence._gc) {
      clearTimeout(sequence._gc);
      sequence._gc = null;
    }
  }

  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };


  var mods = [16, 18, 17, 91, 93, 224 ];
  addEvent(document, 'keydown', function(event) {
    // ignore modifier keys
    if (~mods.indexOf(event.keyCode)) return;
    lastDocumentEvent = event;
  });

  if (!!global.key && typeof global.key.isPressed == 'function') {
    global.key.sequence = keySequence;
  }
  else console.warn('keymaster-sequences.js could not found keymaster.js');
})(this);
