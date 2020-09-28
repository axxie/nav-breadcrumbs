/*\
title: $:/plugins/axxie/nav-breadcrumbs/crumbs.js
type: application/javascript
module-type: macro

Macro to produce breadcrumbs

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/


exports.name = "crumbs";

exports.params = [
];

/*
Run the macro
*/
exports.run = function() {
    var result = "";
    try {
        var title = this.getVariable("currentTiddler");
        var tiddler = !!title && this.wiki.getTiddler(title);
        if (!tiddler) {
            return "";
        }
        var array = [];
        tiddler = this.wiki.getTiddler(tiddler.getFieldString("parent"));
        while (tiddler)
        {
            if (array.includes(tiddler.fields.title))
            {
                return "@@.tc-error\nError: infinite cycle of parent tiddlers detected!\n@@";
            }

            array.push(tiddler.fields.title);
            tiddler = this.wiki.getTiddler(tiddler.getFieldString("parent"));
        }
        if (array.length == 0)
        {
            return "";
        }
        array.reverse();
        result = array.map(function(x) {
            return "[[" + x + "]]";
        }).join(" / ") + " / " + title;
    } catch (ex) {
        console.log("crumbs macro error: " + ex);
    }
    return result;
};


})();
