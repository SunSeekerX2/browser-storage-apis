/** 
 * @name Private utils 
 * @author SunSeekerX
 * @time 2019年6月27日16点21分
 * @description 浏览器数据持久化存储，工具方法封装
*/

/**
 * @name 将 data数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 * @param {String} key 本地缓存中的指定的 key
 * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param {Boolean} local 是否存储在localStorage true/false
 * @returns {Boolean} 是否保存成功
 * @description 使用时可能会抛出错误，建议请使用trycatch处理
 */
export function setStorageSync(key, data, local) {
    // Check environment support
    if (window.localStorage) {
        const keyType = typeof key
        if (keyType === 'string') {
            // Storage data
            const dataType = typeof data
            if (local) {
                return localStorage.setItem(key, JSON.stringify({
                    dataType,
                    data
                }))
            } else {
                return sessionStorage.setItem(key, JSON.stringify({
                    dataType,
                    data
                }))
            }
        } else {
            throw new Error(`The key data type should be string instead of ${keyType}`)
        }
    } else {
        throw new Error('The runtime environment does not support local storage')
    }
}

/**
 * @name 从本地缓存中同步获取指定key对应的内容。
 * @param {String} key 本地缓存中的指定的key
 * @param {Boolean} local 是否存储在localStorage true/false
 * @returns {Any} 返回通过key值查询到的data信息
 * @description 使用时可能会抛出错误，建议请使用trycatch处理
 */
export function getStorageSync(key, local) {
    // Check environment support
    if (window.localStorage) {
        const keyType = typeof key
        if (keyType === 'string') {
            // Find data
            let data = null
            if (local) {
                data = JSON.parse(localStorage.getItem(key))
            } else {
                data = JSON.parse(sessionStorage.getItem(key))
            }
            return (data && data.dataType) ?  data.data :  `Data with the name is ${key} could not be found`
        } else {
            throw new Error(`The key data type should be string instead of ${keyType}`)
        }
    } else {
        throw new Error('The runtime environment does not support local storage')
    }
}

/**
 * @name 从本地缓存中同步移除指定key
 * @param {String} key 本地缓存中的指定的key
 * @param {Boolean} local 是否存储在localStorage true/false
 * @returns {Void}
 * @description 使用时可能会抛出错误，建议请使用trycatch处理
 */
export function removeStorageSync(key, local) {
    // Check environment support
    if (window.localStorage) {
        const keyType = typeof key
        if (keyType === 'string') {
            // Remove data
            if (local) {
                return localStorage.removeItem(key)
            } else {
                return sessionStorage.removeItem(key)
            }
        } else {
            throw new Error(`The key data type should be string instead of ${keyType}`)
        }
    } else {
        throw new Error('The runtime environment does not support local storage')
    }
}

/**
 * @name 同步清理本地数据缓存
 * @param {Boolean} local 是否存储在localStorage true/false
 * @returns {Void}
 * @description 使用时可能会抛出错误，建议请使用trycatch处理
 */
export function clearStorageSync(local) {
    // Check environment support
    if (window.localStorage) {
        // Remove data
        if (local) {
            return localStorage.clear()
        } else {
            return sessionStorage.clear()
        }
    } else {
        throw new Error('The runtime environment does not support local storage')
    }
}

