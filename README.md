# Window localStorage api封装

## 关于

> 最近开发公司后台管理项目需要将数据持久化，利用H5的localStorage去保存但是原生的api接口非常不好用，因此对其进行了封装，api风格借鉴了uni-app的[数据接口风格](https://uniapp.dcloud.io/api/storage/storage?id=setstoragesync)

## 源码

```javascript
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


```



## 接口文档

#### setStorageSync(KEY,DATA,LOCAL)

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**参数说明**

| 参数  | 类型    | 必填 | 默认值 | 说明                                                         |
| :---- | :------ | :--- | ------ | :----------------------------------------------------------- |
| key   | String  | 是   |        | 本地缓存中的指定的 key                                       |
| data  | Any     | 是   |        | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |
| local | Boolean | 否   | false  | 是否保存到localStorage                                       |

```javascript
try {
    setStorageSync('storage_key', 'hello',false);
} catch (error) {
    console.log(error.message)
}
```





#### getStorageSync(KEY,LOCAL)

从本地缓存中同步获取指定key对应的内容

**参数说明**

| 参数  | 类型    | 必填 | 默认值 | 说明                       |
| :---- | :------ | :--- | ------ | :------------------------- |
| key   | String  | 是   |        | 本地缓存中的指定的 key     |
| local | Boolean | 否   | 否     | 是否从localStorage获取数据 |

```javascript
try {
    const value = getStorageSync('storage_key',false);
    if (value) {
        console.log(value);
    }
} catch (error) {
    console.log(error.message)
}
```





#### removeStorageSync(KEY,LOCAL)

从本地缓存中同步移除指定 key。

**参数说明**

| 参数  | 类型    | 必填 | 默认值 | 说明                       |
| :---- | :------ | :--- | ------ | :------------------------- |
| key   | String  | 是   |        | 本地缓存中的指定的 key     |
| local | Boolean | 否   | 否     | 是否从localStorage移除数据 |

```javascript
try {
    removeStorageSync('storage_key');
} catch (error) {
    console.log(error.message)
}
```





#### clearStorageSync(LOCAL)

同步清理本地数据缓存。

**参数说明**

| 参数  | 类型    | 必填 | 默认值 | 说明                       |
| :---- | :------ | :--- | ------ | :------------------------- |
| local | Boolean | 否   | 否     | 是否从localStorage清除数据 |

```javascript
try {
    clearStorageSync();
} catch (error) {
    console.log(error.message)
}
```





## 使用

### 引入模块，挂载工具全局对象

`app/src/main.js`

```javascript
import * as util from '@/utils/ssx-utils'
Vue.prototype.$util = util
```

### 页面使用

`app/src/views/dashboard/index.vue`

```vue
<template>
  <div class="content">
    <div>
      <el-button type="primary" @click="storageData('data', 999)">存入数字数据</el-button>
    </div>
    <div>
      <el-button type="primary" @click="storageData('data', false)">存入布尔数据</el-button>
    </div>
    <div>
      <el-button type="success" @click="storageData('data', '我是字符串')">存入字符串数据</el-button>
    </div>
    <div>
      <el-button type="info" @click="storageData('data', [1,2,3, '123'])">存入数组数据</el-button>
    </div>
    <div>
      <el-button type="info" @click="storageData('data', {name: 'libai',age: 18})">存入对象数据</el-button>
    </div>
    <div>
      <el-button type="warning" @click="getData('data')">获取数据</el-button>
    </div>
    <div>
      <el-button type="danger" @click="removeData('data')">移除单个数据</el-button>
    </div>
    <div>
      <el-button type="danger" @click="clearData()">移除全部数据</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    storageData(name, data) {
      console.log(`存取数据名：${name}，数据为：${data}`)
      this.$util.setStorageSync(name, data, true)
    },
    getData(name) {
      try {
        console.log(
          `获取数据名为：${name},数据为：`,
          this.$util.getStorageSync(name, true)
        )
      } catch (error) {
        console.log(error.message)
      }
    },
    removeData(name) {
      console.log(`移除数据名为：${name}`)
      this.$util.removeStorageSync(name, true)
    },
    clearData() {
      console.log(`清除所有数据`)
      this.$util.clearStorageSync(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 5%;
}
div {
  margin-bottom: 5px;
}
</style>

```



### 使用示例

![2.gif](assets/2.gif)