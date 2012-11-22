/*global require, $, debug*/
var start = new Date();
require.config({
	paths: {
		'jquery': 'external/jquery-1.7.2',
		'jquery-mobile': 'external/jquery.mobile-1.2.0.min',
		'multiview': 'external/multiview',
		'pageparams': 'external/jquery.mobile.page.params',
		'jquery-router': 'external/jquery.mobile.router',
		'order': 'external/order-1.0.0',
		'ba-debug': 'external/ba-debug',
		'bible': '../data/bible',
		'english': '../data/kjvdwyer4',
		'hebrew': '../data/hebrew5',
		'greek': '../data/greek4',
		'strongsDictionary': '../data/strongsDictionary',
		'strongObjectRoots': '../data/strongsObjectRoots',
		'morphology': '../data/morphology'
	},
	priority: ['jquery'],
	waitSeconds: 20000
});
require({
	baseUrl: 'js',
	urlArgs: "bust=" +  (new Date()).getTime()
}, [
	'jquery',
	'ba-debug',
	'jquery-router',
	'order!jquery-mobile',
	'order!src/bookControl',
	'order!external/jquery.scrollTo'
], function () { //first get the useful libraries
	"use strict";
	debug.debug('Jquery mobile loading time: ' + (new Date() - start) + ' miliseconds');
	setTimeout(function () { //to give the framework a chance to load
		$.mobile.showPageLoadingMsg('a', 'Loading bible'); //messages could be more specific
		require(['bible', 'english', 'hebrew', 'greek', 'strongsDictionary', 'strongObjectRoots'], function (bible) {
			$.mobile.hidePageLoadingMsg();
			require([
				'src/router',
				'order!src/chapter',
				'order!src/focusFirstInput',
				'order!src/keyboardShortcuts',
				'order!src/reference',
				'order!src/stickyPanel',
				'order!src/word',
				'order!src/wordDetails'
			], function (router) { //now build the menu and show the first reference
				debug.debug('Total loading time: ' + (new Date() - start) + ' miliseconds');
				var reference = router.getParams(window.location.hash),
					bookNumber,
					chapterNumber,
					numberOfVerses,
					verseNumber;
				if (!reference || reference === undefined || reference[0] === undefined || reference[0].book === null) {
					reference = {};
					bookNumber = Math.floor(Math.random() * bible.Data.books.length);
					chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length);
					numberOfVerses = bible.Data.verses[bookNumber][chapterNumber];
					verseNumber = Math.floor(Math.random() * numberOfVerses);
					reference.book = bible.Data.books[bookNumber][0];
					reference.chapter = chapterNumber + 1;
					reference.verse = verseNumber + 1;
				}
				debug.debug(reference);
				$('#reference-panel').reference(reference);
			});
		});
	});
});