function a() {
  console.log('a')
  function b() {
    console.log('b')
    function c() {
      console.log('c')
    }
    c()
  }
  b()
}
a()