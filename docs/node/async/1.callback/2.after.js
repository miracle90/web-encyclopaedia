// lodash debounce throttle
function after(times, cb) {
  return function () {
    console.log(times)
    if (--times === 0) {
      cb()
    }
  }
}

let newFn = after(3, function () {
  console.log('after')
})

newFn()
newFn()
newFn()
newFn()