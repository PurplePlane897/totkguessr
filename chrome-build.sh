#!/bin/sh

MINIFIER_URL=https://www.toptal.com/developers/javascript-minifier/api/raw

mkdir -p firefox
cp background.js firefox/background.js
cp page-modifier.js firefox/page-modifier.js
cp manifest.json firefox/manifest.json
cp rules.json firefox/rules.json

mkdir -p chrome
sed 's/browser./chrome./g' background.js > chrome/background.js
sed -i 's/hostnames: \["hyruleguessr.com"\]//g' chrome/background.js
sed 's/browser./chrome./g' page-modifier.js > chrome/page-modifier.js
sed 's/"scripts": \["background.js"\]/"service_worker": "background.js"/g' manifest.json > chrome/manifest.json
cp rules.json chrome/rules.json

mkdir -p firefox-min
curl -X POST -s --data-urlencode 'input@firefox/background.js' $MINIFIER_URL > firefox-min/background.js
curl -X POST -s --data-urlencode 'input@firefox/page-modifier.js' $MINIFIER_URL > firefox-min/page-modifier.js
cp manifest.json firefox-min/manifest.json
cp rules.json firefox-min/rules.json

mkdir -p chrome-min
curl -X POST -s --data-urlencode 'input@chrome/background.js' $MINIFIER_URL > chrome-min/background.js
curl -X POST -s --data-urlencode 'input@chrome/page-modifier.js' $MINIFIER_URL > chrome-min/page-modifier.js
cp manifest.json chrome-min/manifest.json
cp rules.json chrome-min/rules.json

zip -r -FS totkguessr-firefox.zip firefox/*
zip -r -FS totkguessr-chrome.zip chrome/*
zip -r -FS totkguessr-firefox.min.zip firefox-min/*
zip -r -FS totkguessr-chrome.min.zip chrome-min/*