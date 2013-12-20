<<<<<<< HEAD
/*globals javascripture*/(function(e){function n(t){var n=t.book,i=t.chapter,s=t.verse,o=i-1,u=s-1,a=!1,f='<div class="reference frequencyAnalysis" data-book="'+n+'" data-chapter="'+i+'"><h1>'+n+" "+i+"</h1>";f+='<ol class="wrapper">';var l,c;if(javascripture.data.hebrew[n]){l=javascripture.data.hebrew;c="hebrew"}else{l=javascripture.data.greek;c="greek"}javascripture.data.english[n][o]&&e.each(javascripture.data.english[n][o],function(t,s){f+='<li id="'+n.replace(/ /gi,"_")+"_"+i+"_"+(t+1)+'" data-verse="'+(t+1)+'">';f+='<div class="wrapper"';t===u&&(f+=' id="current"');if(t===u-5){f+=' id="context"';a=!0}f+=">";f+='<div class="english">';e.each(javascripture.data.english[n][o][t],function(e,t){t&&(f+=r(t,c))});f+="</div>";if(l[n]&&l[n][o][t]){f+="<div class='original "+c+"'>";e.each(l[n][o][t],function(e,t){t&&(f+=r(t,c))});f+="</div>"}f+="</div>";f+="</li>"});f+="</ol>";f+="</div>";return f}function r(t,n){var r=this,i="",s=[];if(typeof t[1]=="undefined")return"<span>"+t[0]+"</span> ";lemma=t[1];if(lemma){lemmaArray=lemma.split(" ");e.each(lemmaArray,function(e,t){s.push(javascripture.modules.reference.getFamily(t))})}i+="<span";i+=' class="'+s.join(" ")+'"';i+=' title="'+lemma;t[2]&&(i+=" "+t[2]);i+='"';i+=' data-word="'+t[0]+'"';i+=' data-lemma="'+t[1]+'"';i+=' data-language="'+n+'"';i+=' data-range="verse"';i+=' data-family="'+s.join(" ")+'"';t[2]&&(i+=' data-morph="'+t[2]+'"');i+=">"+t[0]+"</span> ";return i}function i(t,n){var r=t.book,i=t.chapter,s={},o=parseInt(i,10)+n,u=o-1,a;if(javascripture.data.english[r]&&javascripture.data.english[r][u]!==undefined){s.book=r;s.chapter=o}else e.each(bible.Data.books,function(e,t){if(t[0]===r){a=e+n;if(bible.Data.books[a]!==undefined){s.book=bible.Data.books[a][0];n>0?s.chapter=1:s.chapter=bible.Data.verses[a].length}}});return s}var t=javascripture.data.english;e.fn.scrollStopped=function(t){e(this).scroll(function(){var n=this,r=e(n);r.data("scrollTimeout")&&clearTimeout(r.data("scrollTimeout"));r.data("scrollTimeout",setTimeout(t,250,n))})};javascripture.modules.reference={load:function(t){var r=t.book,s=t.chapter,o=t.verse;"undefined"==typeof o&&(t.verse=1);var u=r;typeof s!="undefined"&&(u+=" "+s);typeof o!="undefined"&&(u+=":"+o);e("head title").text(u);var a=e('<div class="three-references" />'),f=i(t,-1),l=i(t,1);if(f.book){a.data("prev",f);a.append(n(f))}a.append(n(t));if(l.book){a.data("next",l);a.append(n(l))}e.fn.waypoint&&e(".reference").waypoint("destroy");e("#verse").html(a);maintainState(r,s,o);return this},scrollToVerse:function(t,n){undefined===n&&(n=0);e("body").scrollTop(0);n-=e(".dock").height();t.length>0&&e("body").scrollTo(t,{offset:n});e(document).trigger("createWayPoint")},getAnchoringData:function(t){var n="#current",r=0,i=e("body").scrollTop(),s;if(t){t==="prev"&&(s=e(".reference:first-child ol.wrapper li:first-child"));t==="next"&&(s=e(".reference:last-child ol.wrapper li:last-child"));n="#"+s.attr("id");r=i-s.offset().top+e(".dock").height()}return[r,n]},anchorReference:function(t){var n=t[1],r=t[0],i=e(n);n===".current-verse"&&(verseHeight=i.height(),r=-e(window).height()/2+verseHeight);if(i.length===0){i=e("#"+jsonCollection.currentId);r=-e("[data-role=header]").height()}this.scrollToVerse(i,r)},getFamily:function(e){return javascripture.data.strongsObjectWithFamilies[e]?javascripture.data.strongsObjectWithFamilies[e].family:e},getReferenceFromUrl:function(){var e=window.location.hash.split("&"),t={};if(e.length>1){t.book=e[0].split("=")[1],t.chapter=parseInt(e[1].split("=")[1],10),t.verse=1;e[2]&&(t.verse=parseInt(e[2].split("=")[1],10))}return t},loadReferenceFromHash:function(){var t=window.location.hash;if(t.indexOf("search")>-1){var n=t.split("=")[1];searchByStrongsNumber(n)}else{var r=t.split("&");if(r.length>1){var i=r[0].split("=")[1],s=parseInt(r[1].split("=")[1],10),o=1;r[2]&&(o=parseInt(r[2].split("=")[1],10));javascripture.modules.reference.load({book:i,chapter:s,verse:o}).scrollToVerse(e("#current"))}}}};javascripture.modules.reference.loadReferenceFromHash();e(window).bind("hashchange",function(e){var t=new Date;javascripture.modules.reference.loadReferenceFromHash();var n=new Date;timer(t,n)});e(window).scrollStopped(function(){var t=e("body").scrollTop(),n=e(".referencePanel").height()-e(window).height()+e(".dock").height(),r;if(t<=0){console.log("prev");var i=e(".three-references").data("prev");r=javascripture.modules.reference.getAnchoringData("prev");javascripture.modules.reference.load(i).anchorReference(r)}if(t>=n){console.log("next");var s=e(".three-references").data("next");r=javascripture.modules.reference.getAnchoringData("next");javascripture.modules.reference.load(s).anchorReference(r)}});e(".goToReference").submit(function(t){t.preventDefault();console.log(e("#goToReference").val());var n=bible.parseReference(e("#goToReference").val()),r="book="+bible.Data.books[n.bookID-1][0]+"&chapter="+n.chapter+"&verse="+n.verse;console.log(r);window.location.hash=r;e(this).closest(".popup").popup("close");return!1})})(jQuery);
=======
/*globals javascripture*/(function(e){function n(t){var n=t.book,i=t.chapter,s=t.verse,o=i-1,u=s-1,a=!1,f='<div class="reference frequencyAnalysis" data-book="'+n+'" data-chapter="'+i+'"><h1>'+n+" "+i+"</h1>";f+='<ol class="wrapper">';var l,c;if(javascripture.data.hebrew[n]){l=javascripture.data.hebrew;c="hebrew"}else{l=javascripture.data.greek;c="greek"}javascripture.data.english[n][o]&&e.each(javascripture.data.english[n][o],function(t,s){f+='<li id="'+n.replace(/ /gi,"_")+"_"+i+"_"+(t+1)+'"';t===u&&(f+=' class="current"');f+='data-verse="'+(t+1)+'">';f+='<div class="wrapper"';t===u&&(f+=' id="current"');if(t===u-5){f+=' id="context"';a=!0}f+=">";f+='<div class="english">';e.each(javascripture.data.english[n][o][t],function(e,t){t&&(f+=r(t,c))});f+="</div>";if(l[n]&&l[n][o][t]){f+="<div class='original "+c+"'>";e.each(l[n][o][t],function(e,t){t&&(f+=r(t,c))});f+="</div>"}f+="</div>";f+="</li>"});f+="</ol>";f+="</div>";return f}function r(t,n){var r=this,i="",s=[];if(typeof t[1]=="undefined")return"<span>"+t[0]+"</span> ";lemma=t[1];if(lemma){lemmaArray=lemma.split(" ");e.each(lemmaArray,function(e,t){s.push(javascripture.modules.reference.getFamily(t))})}i+="<span";i+=' class="'+s.join(" ")+'"';i+=' title="'+lemma;t[2]&&(i+=" "+t[2]);i+='"';i+=' data-word="'+t[0]+'"';i+=' data-lemma="'+t[1]+'"';i+=' data-language="'+n+'"';i+=' data-range="verse"';i+=' data-family="'+s.join(" ")+'"';t[2]&&(i+=' data-morph="'+t[2]+'"');i+=">"+t[0]+"</span> ";return i}function i(t,n){var r=t.book,i=t.chapter,s={},o=parseInt(i,10)+n,u=o-1,a;if(javascripture.data.english[r]&&javascripture.data.english[r][u]!==undefined){s.book=r;s.chapter=o}else e.each(bible.Data.books,function(e,t){if(t[0]===r){a=e+n;if(bible.Data.books[a]!==undefined){s.book=bible.Data.books[a][0];n>0?s.chapter=1:s.chapter=bible.Data.verses[a].length}}});return s}var t=javascripture.data.english;e.fn.scrollStopped=function(t){e(this).scroll(function(){var n=this,r=e(n);r.data("scrollTimeout")&&clearTimeout(r.data("scrollTimeout"));r.data("scrollTimeout",setTimeout(t,250,n))})};javascripture.modules.reference={load:function(t){var r=t.book,s=t.chapter,o=t.verse;"undefined"==typeof o&&(t.verse=1);var u=r;typeof s!="undefined"&&(u+=" "+s);typeof o!="undefined"&&(u+=":"+o);e("head title").text(u);var a=e('<div class="three-references" />'),f=i(t,-1),l=i(t,1);if(f.book){a.data("prev",f);a.append(n(f))}a.append(n(t));if(l.book){a.data("next",l);a.append(n(l))}e.fn.waypoint&&e(".reference").waypoint("destroy");e("#verse").html(a);maintainState(r,s,o);return this},scrollToVerse:function(t,n){undefined===n&&(n=0);e(document).scrollTop(0);n-=e(".dock").height();t.length>0&&e(document).scrollTo(t,{offset:n});e(document).trigger("createWayPoint")},getAnchoringData:function(t){var n="#current",r=0,i=e(document).scrollTop(),s;if(t){t==="prev"&&(s=e(".reference:first-child ol.wrapper li:first-child"));t==="next"&&(s=e(".reference:last-child ol.wrapper li:last-child"));n="#"+s.attr("id");r=i-s.offset().top+e(".dock").height()}return[r,n]},anchorReference:function(t){var n=t[1],r=t[0],i=e(n);n===".current-verse"&&(verseHeight=i.height(),r=-e(window).height()/2+verseHeight);if(i.length===0){i=e("#"+jsonCollection.currentId);r=-e("[data-role=header]").height()}this.scrollToVerse(i,r)},getFamily:function(e){return javascripture.data.strongsObjectWithFamilies[e]?javascripture.data.strongsObjectWithFamilies[e].family:e},getReferenceFromUrl:function(){var e=window.location.hash.split("&"),t={};if(e.length>1){t.book=e[0].split("=")[1],t.chapter=parseInt(e[1].split("=")[1],10),t.verse=1;e[2]&&(t.verse=parseInt(e[2].split("=")[1],10))}return t},loadReferenceFromHash:function(){var t=window.location.hash;if(t.indexOf("search")>-1){var n=t.split("=")[1];setTimeout(function(){createSearchReferencesPanel({lemma:n})})}else{var r=t.split("&");if(r.length>1){var i=r[0].split("=")[1],s=parseInt(r[1].split("=")[1],10),o=1;r[2]&&(o=parseInt(r[2].split("=")[1],10));javascripture.modules.reference.load({book:i,chapter:s,verse:o}).scrollToVerse(e("#current"))}}}};javascripture.modules.reference.loadReferenceFromHash();e(window).bind("hashchange",function(e){var t=new Date;javascripture.modules.reference.loadReferenceFromHash();var n=new Date;timer(t,n)});e(window).scrollStopped(function(){var t=e(document).scrollTop(),n=e(".referencePanel").height()-e(window).height(),r;console.log(n);console.log(t);if(t<=0){console.log("prev");var i=e(".three-references").data("prev");r=javascripture.modules.reference.getAnchoringData("prev");javascripture.modules.reference.load(i).anchorReference(r)}if(t>=n){console.log("next");var s=e(".three-references").data("next");r=javascripture.modules.reference.getAnchoringData("next");javascripture.modules.reference.load(s).anchorReference(r)}});e(".goToReference").submit(function(t){t.preventDefault();console.log(e("#goToReference").val());var n=bible.parseReference(e("#goToReference").val()),r="book="+bible.Data.books[n.bookID-1][0]+"&chapter="+n.chapter+"&verse="+n.verse;console.log(r);window.location.hash=r;e(this).closest(".popup").popup("close");return!1})})(jQuery);
>>>>>>> gh-pages
