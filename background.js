is_totk = false

const refreshTotk = async (e) => {
  browser.scripting.executeScript({
    target: {
      tabId: e.tabId,
    },
    func: () => {
      return localStorage['totk']
    },
  }, (e) => {
    oldTotkState = is_totk
    if (e[0].result == "true"){
      is_totk = true
      console.log('enabling redirect')
      browser.declarativeNetRequest.updateEnabledRulesets(
        { enableRulesetIds: ["redirectImagesRule"] },
        () => {}
      );
    } else {
      is_totk = false
      console.log('disabling redirect')
      browser.declarativeNetRequest.updateEnabledRulesets(
        { disableRulesetIds: ["redirectImagesRule"] },
        () => {}
      );
    }
    if (oldTotkState != is_totk){
      browser.browsingData.removeCache({hostnames: ["hyruleguessr.com"]}).then((e) => {console.log("cache cleaned")}, (e) => {console.log("Error while cleaning cache : " + e)})
    }
  })
  return {
  };
}

browser.webRequest.onBeforeRequest.addListener(
  refreshTotk,
  {urls: ["https://hyruleguessr.com/", "https://hyruleguessr.com/game/*", "https://hyruleguessr.com/challenges*", "https://hyruleguessr.com/ranked*", "https://hyruleguessr.com/about*", "https://hyruleguessr.com/api/Games/*", "https://hyruleguessr.com/api/Locations*", "https://hyruleguessr.com/createChallenge"]}
);
