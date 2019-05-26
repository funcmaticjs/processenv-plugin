
class ProcessEnvPlugin {

  constructor(options) {
    options = options || { }
    this.prefix = options.prefix || null
  }

  async env(ctx, next) {
    let vars = { }
    for (let key in process.env) {
      if (!this.prefix || key.startsWith(this.prefix)) {
        vars[key] = process.env[key]
      }
    }
    Object.assign(ctx.env, vars)
    ctx.logger.debug(`Imported ${Object.keys(vars).length} matching variables from process.env (prefix=${this.prefix})`)
    ctx.logger.debug(JSON.stringify(vars, null, 2))
    await next()
  }
}

module.exports = ProcessEnvPlugin