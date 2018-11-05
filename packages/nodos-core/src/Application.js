export default class Application {
  defaultRequestOptions = { headers: {}, params: null };

  commandBuilders = []

  generatorBuilders = []

  constructor({
    commandBuilders, fastify, config, router,
  }) {
    this.commandBuilders = commandBuilders;
    this.fastify = fastify;
    this.config = config;
    this.router = router;
  }

  listen(...args) {
    return this.fastify.listen(...args);
  }

  get = url => this.request('GET', url)

  post = (url, options = {}) => this.request('POST', url, options)

  put = (url, options = {}) => this.request('PUT', url, options)

  patch = (url, options = {}) => this.request('PATCH', url, options)

  delete = url => this.request('DELETE', url)

  request(method, url, options) {
    const { params, headers } = { ...this.defaultRequestOptions, ...options };

    return this.fastify.inject({
      method,
      url,
      headers,
      payload: params,
    });
  }
}
