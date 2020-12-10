let request = {
  get url() {
    // 需要操作原生的req属性
    return this.req.url
  }
}

module.exports = request