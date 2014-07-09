# keymaster-sequences.js

[![Build Status](https://secure.travis-ci.org/cmawhorter/keymaster-sequences.js.png?branch=master)](http://travis-ci.org/cmawhorter/keymaster-sequences.js)

Add keyboard sequence support to the awesome keymaster.js


Caveats: Modifier keys can't be used on their own.  That is.. you can't do `key.sequence('b shift a')`.  You must do `key.sequence('b shift+a')`.
