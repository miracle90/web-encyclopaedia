class Router {
  constructor() {
    this.middlewares = []
  }
  get(path, handler) {
    this.middlewares.push({
      path,
      handler
    })
  }
  compose(middlewares, ctx, next) {
    // koa中间件原理
    // reduce promise next方法都可以实现
    async function dispatch(index) {
      if (index === middlewares.length) return next()
      let route = middlewares[index].handler
      route(ctx, () => dispatch(index + 1))
    }
    dispatch(0)
  }
  routes() {
    return async (ctx, next) => {
      let path = ctx.path
      let middlewares = this.middlewares.filter(route => route.path === path)
      this.compose(middlewares, ctx, next)
    }
  }
}

module.exports = Router