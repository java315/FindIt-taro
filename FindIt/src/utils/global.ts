const globalData = {
    state:"unchecked",
    listTag:"" // index 跳转到 list页面传入的参数
}

export function setGlobalData (key, val) {
    globalData[key] = val
}

export function getGlobalData (key) {
    return globalData[key]
}