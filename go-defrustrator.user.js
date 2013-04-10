// ==UserScript==
// @name        Go Defrustrator
// @namespace   http://github.com/programmiersportgruppe/go-defrustrator
// @downloadURL https://github.com/programmiersportgruppe/go-defrustrator/raw/master/go-defrustrator.user.js
// @description Greasemonkey script to defrustrate the ThoughtWorks Go user interface experience.
// @version     0.40
// @include     http://*:8153/go/*
// @grant       none
// @copyright   2013 Programmiersportgruppe
// ==/UserScript==

var buildConfigPairs = [
    ['tab/pipeline/history/*', 'admin/pipelines/*/materials'],
    ['pipelines/*/{latest}/*/{latest}(/*)?', 'admin/pipelines/*/stages/*/settings'],
    ['tab/build/detail/*/{latest}/*/{latest}/*', 'admin/pipelines/*/stages/*/job/*/tasks'],
];

function deriveLink(source, target, title) {
    var loc = window.location.pathname,
        i = 0;
    var modified = loc.replace(
        RegExp('^/go/' + source.replace(/\*/g, '([^/]+)').replace(/{[a-zA-Z]+}/g, '[^/]+') + '$'),
        '/go/' + target
            .split('*')
            .reduce(function (a, b) { return a + '$' + (++i) + b; })
            .replace(/[{}]/g, '')
            .replace(/\([^()]+\)\?/g, '')
    );
    return modified == loc ? null : '<a href="' + modified + '" style="margin-left: 1em; font-size: 1em">[' + title + ']</a>';
};

function addConfigLink() {
    var link = buildConfigPairs.reduce(function (value, pair) {
        return value || deriveLink(pair[0], pair[1], 'Edit Config') || deriveLink(pair[1], pair[0], 'See the Build');
    }, null);

    if (link)
        (document.getElementsByTagName("h1")[0] ||
         document.getElementsByTagName("h2")[0])
        .appendChild(document.createElement('a')).outerHTML = link;
};

function addColors(element) {
    var html = element.innerHTML;
    function applyRegex(pattern, replacement) {
        html = html.replace(pattern, replacement);
    };

    applyRegex(/\x1B\[(\d+);(\d+)m/g, "\x1B[$1m\x1B[$2m");
//    applyRegex(/\n(.*?LoadError.*?)\n/g, "\n<span style='color: red;'>$1</span>\n");
    applyRegex(/(\[go\].*?)\n/g, "<span style='color: gray;'>$1</span>\n");
//    applyRegex(element,/(Failures: [1-9].*?)\n/g, "<span style='color: red;'>$1</span>\n");
    applyRegex(/(\[?\bERROR\b.*?)\n/gi, "<span style='color: red;'>$1</span>\n");
    applyRegex(/(Failed tests.*?)\n/g, "<span style='color: red;'>$1</span>\n");
    applyRegex(/Exception/g, "<b>Exception</b>");

    // ANSI escape codes
    applyRegex(/\x1B\[1m([\s\S]*?)\x1B\[0m/g, "<span style='font-weight: bold'>$1</span>\x1B[0m");
    applyRegex(/\x1B\[31m([\s\S]*?)\x1B\[0m/g, "<span style='color: red;'>$1</span>\x1B[0m");
    applyRegex(/\x1B\[32m([\s\S]*?)\x1B\[0m/g, "<span style='color: green;'>$1</span>\x1B[0m");
    applyRegex(/\x1B\[33m([\s\S]*?)\x1B\[0m/g, "<span style='color: #999900;'>$1</span>\x1B[0m");
    applyRegex(/\x1B\[34m([\s\S]*?)\x1B\[0m/g, "<span style='color: blue;'>$1</span>\x1B[0m");
//    applyRegex(/\[.*35m([\s\S]*)\[0m/g, "<span style='color: red;'>$1</span>");
    applyRegex(/\x1B\[36m([\s\S]*?)\x1B\[0m/g, "<span style='color: #009999;'>$1</span>\x1B[0m");
    applyRegex(/\x1B\[41m([\s\S]*?)\x1B\[0m/g, "<span style='background-color: red;'>$1</span>\x1B[0m");
    applyRegex(/\n.*?\x1B\[2K/g, "");
    applyRegex(/\x1B\[0m/g, "");
    element.innerHTML = html;

    setTimeout(function () {
        var unhandled = html.match(/[^\n]*\x1B.*?\n/g);
        if (unhandled) {
            console.error("There are", unhandled.length, "lines with unhandled escapes:", unhandled);
            unhandled.forEach(function(l) {
                console.log(l);
            });
        }
    }, 0);
};

function coloriseOutput() {
    var topLevelPres = document.documentElement.getElementsByTagName('body')[0].getElementsByTagName('pre');
    for (var i = 0; i < topLevelPres.length; i++)
        addColors(topLevelPres[i]);
}

addConfigLink();
coloriseOutput();
