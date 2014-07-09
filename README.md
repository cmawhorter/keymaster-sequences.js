# keymaster-sequences.js

[![Build Status](https://secure.travis-ci.org/cmawhorter/keymaster-sequences.js.png?branch=master)](http://travis-ci.org/cmawhorter/keymaster-sequences.js)

Do you use keymaster.js? Do you want support for key sequences?  (Like gmail...)  Then you've come to the right place!

This script plugs into keymaster to provide you with support for chaining keypresses together.

Demo: http://jsfiddle.net/ggZxB/

## An example

```javascript
script[src=keymaster.js]
script[src=keymaster-sequences.js]

...

key.sequence('s i', function(evt, handler, sequence) {
  console.log('You pressed s then i.  If this were gmail, we would take you to your inbox.');
});

key.sequence('ctrl+c ctrl+v', function(evt, handler, sequence) {
  console.log('You just copied and pasted... on windows... maybe... probably not...');
});

// obligatory konami code
key.sequence('up up down down left right left right b a', function(evt, handler, sequence) {
  console.log('Works much better here than it did in contra.');
});
```

## How does it work

Pretty much identically to keymaster.  `key.sequence(shortcut, [, scope] handler)`.  As with keymaster, scope defaults to 'all'.

The handler is passed the event and "handler" object that keymaster passes, along with a new sequence object.  Though... the only thing useful in the sequence object is an array of all the keydown events.


## Caveats / Gotchas

Injects itself into keymaster's `window.key` object.  If you need to use noConflict, include sequences before you call noConflict.

Modifier keys can't be used on their own.  This means you can't do `key.sequence('b shift')`.

Only single shortcuts are currently supported.  You can't do `key.sequence('ctrl+a b,command+a b')` or `key.sequence(['ctrl+a b','command+a b'])`.  Support for adding this is pretty trivial, but I just haven't done it.

No unbinding... but when was the last time you cleaned up your event handlers?  Workaround: You can use either `key.deleteScope(scope)` or `key.unbind(shortcut)` on all the individual shortcuts.

Timeout between shortcuts is currently hardcoded to 1000ms.

I've only run the tests on Chrome as of this minute.  YMMV.


## Tests

Includes two test files.  The first is the standard keymaster tests, but with sequences inserted. 

The second are a few sequences tests.  More could definitely be added.


## The MIT License (MIT)

Copyright (c) 2014 Cory Mawhorter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
