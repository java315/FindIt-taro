const globalData = {
    BaseUrl : "http://localhost:8089/api/"
}

export function setGlobalData (key, val) {
    globalData[key] = val
}

export function getGlobalData (key) {
    return globalData[key]
}