export function hasClass(el,className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

export function addClass(el,className) {
    if (hasClass(el,className)) {
        return 
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
// 获得点击的index
export function getData(el,name,val) {
    const prefix = 'data-'
        name = prefix + name
    if (val) {
        return el.setAttribute(name,val)
    }else{
        return el.getAttribute(name)
    }
}
/**
 * @author shingli
 * @description [使用JS给样式加前缀]
 */
let elementStyle = document.createElement('div').style 

let vendor = (()=> {
    let transformNames = {
        webkit:'webkitTransform',
        Moz:'MozTranfrom',
        O:'OTransform',
        ms:'msTransform',
        standard:'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== 'undefind') {
            return key
        }

        return false
    }
})()

export function prefixStyle(style) {
    if (vendor == false) {
        return false 
    }
    if (vendor =='standard') {
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}



