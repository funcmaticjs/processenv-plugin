const ProcessEnvPlugin = require('../lib/env')

describe('Tests', () => {
  let ctx = { }
  let noop = () => { }
  let plugin = null
  beforeEach(() => {
    ctx = {
      event: { },
      env: { },
      logger: console
    }
    plugin = new ProcessEnvPlugin()
  })
  it ('should copy all process.env to ctx.env', async () => {
    await plugin.env(ctx, noop)
    expect(ctx).toMatchObject({
      env: {
        'NODE_ENV': 'test'
      }
    })
  })
  it ('should overwrite existing env values', async () => {
    ctx.env = { 'NODE_ENV': 'will-be-overwritten' }
    await plugin.env(ctx, noop)
    expect(ctx).toMatchObject({
      env: { 
        'NODE_ENV': 'test' 
      }
    })
  })
  it ('should only copy keys with matching prefix', async () => {
    plugin = new ProcessEnvPlugin({ prefix: 'NODE_' })
    await plugin.env(ctx, noop)
    expect(ctx.env).toEqual({
      'NODE_ENV': 'test' 
    })
  })
})
