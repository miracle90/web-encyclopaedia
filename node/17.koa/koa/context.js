let ctx = {}

// 公共代理的方法
function defineGetter(property, key) {
  //  取值时，相当于去property上取值
  ctx.__defineGetter__(key, function () {
    // console.log('defineGetter', property, key)
    return this[property[key]]
  })
}

function defineSetter(property, key) {
  ctx.__defineSetter__(key, function (value) {
    // console.log('defineSetter', property, key)
    this[property][key] = value
  })
}

defineGetter('request', 'url')
defineGetter('response', 'body')

defineSetter('response', 'body')

module.exports = ctx