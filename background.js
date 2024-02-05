is_totk = false

const replaceImages = async (e) => {
  if (!is_totk) { return {} }
  u = e.url.split('/');
  if (u[u.length - 1].includes("redirect=false")) { return {} }
  return {
    redirectUrl: "https://totk.flemmy.fr/" + u[u.length - 2] + "/" + u[u.length - 1],
  };
}
// const replaceBackground = async (e) => {
//   if (!is_totk) { return {} }
//   console.log('changing background')
//   return {
//     redirectUrl: "https://totk.flemmy.fr/bg.57438cfd58f00fef7ee1.jpg"
//   };
// }


const refreshTotk = async (e) => {
  browser.tabs.executeScript(e.tabId, { code: `localStorage['totk']` })
    .then((s) => {
      oldTotkState = is_totk
      if (s[0] == "true"){
        is_totk = true
      } else {
        is_totk = false
      }
      if (oldTotkState != is_totk){
        // console.log('change detected, clearing cache')
        // console.log('New state is : ' + is_totk)
        browser.browsingData.removeCache({hostnames: ["hyruleguessr.com"]}).then(() => {}, (e) => {console.log(e)})
      } else {
        // console.log('Cache remain the same : ' + is_totk)
      }
    }, (e) => {
      is_totk = false
      console.log('An error occured. Totk mode is now disabled')
      console.log(e)
    })
  return {
  };
}

browser.webRequest.onBeforeRequest.addListener(
  replaceImages,
  {urls: ["https://hyruleguessr.com/tiles/*", "https://hyruleguessr.com/screenshots/*"]},
  ["blocking"]
);
// browser.webRequest.onBeforeRequest.addListener(
//   replaceBackground,
//   {urls: ["https://hyruleguessr.com/bg.57438cfd58f00fef7ee1.jpg"]},
//   ["blocking"]
// );

browser.webRequest.onBeforeRequest.addListener(
  refreshTotk,
  {urls: ["https://hyruleguessr.com/", "https://hyruleguessr.com/game/*", "https://hyruleguessr.com/challenges*", "https://hyruleguessr.com/ranked*", "https://hyruleguessr.com/profile*", "https://hyruleguessr.com/about*", "https://hyruleguessr.com/api/Games/*", "https://hyruleguessr.com/api/Locations*", "https://hyruleguessr.com/createChallenge"]},
  ["blocking"]
);

// const missingImages = async (e) => {
//   // if (!is_totk) { return {} }
//   console.log('redirecting locations')
//   return {
//     redirectUrl: "https://totk.flemmy.fr/api/Locations"
//   };
// }

// browser.webRequest.onBeforeRequest.addListener(
//   missingImages,
//   {urls: ["https://hyruleguessr.com/api/Locations"]},
//   ["blocking"]
// );
