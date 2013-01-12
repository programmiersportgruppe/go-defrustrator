Go Defrustrator
===============

Greasemonkey script to defrustrate the ThoughtWorks Go user interface experience.

This script adds configuration deeplinks to go pages, to let you jump directly
to the configuration for whatever build you have open. It also adds color to the
build output, making it easier to see what's important.

Installation
------------

If you have
[Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
in Firefox or
[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
in Chrome, you can
[install by opening the script](https://github.com/programmiersportgruppe/go-defrustrator/raw/master/go-defrustrator.user.js)
in your browser.

By default the script will kick in on Go pages served over HTTP on Go's default
port 8153.
If you access Go over HTTPS or on a different port,
you'll have to configure the script to be active there by adding an appropriate
"include" (e.g., `https://go-server.example.com/go/*`) in the
Greasemonkey/Tampermonkey settings for the script.
