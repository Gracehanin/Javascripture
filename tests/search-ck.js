/*global define, debug, module, test, ok*///define(['../api/search'], function (search) {
//	"use strict";
var search=javascripture.api.search,javascriptureTestHelper={referenceCount:function(e,t,n){equal(search.getReferences(e).length,t,n.replace(/EXPECTED/gi,t).replace(/TERM/gi,e.word).replace(/LANGUAGE/gi,e.language))}},parameters={language:"english",range:"verse"};module("search english");test("search",function(){ok(search,"the search object exists")});test("search for one term in a verse",function(){expect(4);stop();var t=search.getReferences({language:"english",word:"void",range:"verse"});t.done(function(){start();equal(n.references.length,32,'there are 32 verses that contain "void" in Englush')});var n=search.getReferences({language:"english",word:"cheese",range:"verse"});n.done(function(){start();equal(n.references.length,3,'there are 3 verses that contain "cheese" in English')});var r=search.getReferences({language:"english",word:"immanuel",range:"verse"});r.done(function(){start();equal(r.references.length,2,'there are 2 verses that contain "immanuel" in English.  Search is case insensitive.')});var i=search.getReferences({language:"english",word:"Immanuel",range:"verse"});i.done(function(){start();equal(i.references.length,2,'there are 2 verses that contain "Immanuel" in English.  Search is case insensitive.')})});