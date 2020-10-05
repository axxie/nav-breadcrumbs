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
        var array = [];

        while (tiddler)
        {
            var parent = tiddler.getFieldString("parent");
            if (array.includes(parent))
            {
                return "@@.tc-error\nError: infinite cycle of parent tiddlers detected!\n@@";
            }
            if (!parent)
            {
                break;
            }
            array.push(parent);
            tiddler = this.wiki.getTiddler(parent);
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
