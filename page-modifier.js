container_id = 'totk-btn-container'
btn_id = 'totkguessr'

forbidden_urls = [
    'https://hyruleguessr.com/createChallenge',
    'https://hyruleguessr.com/game',
    'https://hyruleguessr.com/suggestion'
]

const addButton = () => {
    // If there is already a addButton, check if it need to be disabled
    if (document.getElementById(container_id)) {
        disableButton()
        return
    }
    nav = document.getElementsByClassName('navbar-custom')[0]

    container = document.createElement('div')
    container.id = container_id
    container.classList.add("ml-auto", "mr-3", "navbar-text", "auth-text", "custom-control", "custom-switch")

    lb = document.createElement('label')
    lb.innerText = 'TOTK'
    lb.classList.add("custom-control-label")
    lb.setAttribute("for", btn_id);
    lb.style.cursor = "pointer"


    btn = document.createElement('input')
    btn.type='checkbox'
    btn.classList.add('custom-control-input')
    btn.id = btn_id
    btn.style.cursor = "pointer"

    checked = false
    if (localStorage.getItem('totk') != "false"){
        checked = true
    }
    btn.checked = checked

    btn.addEventListener("change", (e) => {
        if (canButtonBeUsed()){
            localStorage.setItem('totk', e.target.checked)
            changeBG()
        }
    });

    container.appendChild(btn)
    container.appendChild(lb)

    dark = document.getElementsByClassName('ml-auto')[0]
    dark.insertAdjacentElement("beforebegin", container) 
    dark.classList.remove("ml-auto")

    disableButton()
}

const disableButton = () => {
    if (!document.getElementById('totk-btn-container')) {
        return
    }
    document.getElementById(btn_id).disabled = !canButtonBeUsed()
}

const canButtonBeUsed = () => {
    for (let i = 0; i < forbidden_urls.length; i++) {
        if (window.location.href.startsWith(forbidden_urls[i])){
            return false
        }
    }
    return true
}

// refresh button stat on document.location.href change
window.addEventListener("load", () => {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(ms => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            addButton()
        }
    });
    observer.observe(body, { childList: true, subtree: true });
});

addButton()