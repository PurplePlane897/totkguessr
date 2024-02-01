is_totk = false

const replaceImages = async (e) => {
  if (!is_totk) { return {} }
  u = e.url.split('/');
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


const lul = async (e) => {
  browser.tabs.executeScript(e.tabId, { code: `localStorage['totk']` })
    .then((s) => {
      if (s[0] == "true"){
        is_totk = true
      } else {
        is_totk = false
      }
    }, (e) => {
      is_totk = false
      console.log('An error occured. Totk mode is now disabled')
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
  lul,
  {urls: ["https://hyruleguessr.com/", "https://hyruleguessr.com/game/*", "https://hyruleguessr.com/challenges*", "https://hyruleguessr.com/ranked*", "https://hyruleguessr.com/profile*", "https://hyruleguessr.com/about*", "https://hyruleguessr.com/api/Games/*"]},
  ["blocking"]
);
