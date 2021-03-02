const defaults = {
  loadPath: "/locales/{{lng}}/{{ns}}.json",
  addPath: "/locales/add/{{lng}}/{{ns}}",
  multiSeparator: "+",
  allowMultiLoading: false,
  parse: JSON.parse,
  stringify: JSON.stringify,
  fetch,
  fxn: () => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },

  requestOptions: {}
};

const arrify = val => (Array.isArray(val) ? val : [val]);
const normalize = (funcOrVal, ...args) =>
  typeof funcOrVal === "function" ? funcOrVal(...args) : funcOrVal;

class BackendError extends Error {
  retry = null;

  constructor(message, retry = false) {
    super(message);

    this.retry = retry;
  }
}

class Backend {
  constructor(services, options) {
    this.init(services, options);
  }

  static type = "backend";

  init(services, options = {}) {
    this.services = services;

    this.options = {
      ...defaults,
      ...options
    };
  }

  getLoadPath(languages, namespaces) {
    const browserlang = window.navigator.language.split("-")[0];

    return normalize(this.options.loadPath, [browserlang], namespaces);
  }

  read(language, ns, callback) {
    // return this.loadUrl(this.getLoadPath(), callback);
    return this.execFxn(language, callback);
  }

  readMulti(language, ns, callback) {
    // return this.loadUrl(this.getLoadPath(), callback);
    return this.execFxn(language, callback);
  }

  execFxn(language, callback) {
    const { fxn, parse } = this.options;

    return fxn(language)
      .then(
        response => {
          const { ok, status } = response;

          if (!ok) {
            const retry = status >= 500 && status < 600; // don't retry for 4xx codes
            throw new BackendError(`failed loading `, retry);
          }

          return response.text();
        },
        () => {
          throw new BackendError(`failed loading `);
        }
      )
      .then(data => {
        console.log("got data, parsing it!");
        console.log(callback);
        try {
          return callback(null, parse(data));
        } catch (e) {
          throw new BackendError(`failed parsing to json`, false);
        }
      })
      .catch(e => {
        if (e instanceof BackendError) {
          callback(e.message, e.retry);
        }
      });
  }

  loadUrl(url, callback) {
    console.log("loadurl");
    const { fetch, requestOptions, parse } = this.options;

    fetch(url, requestOptions)
      .then(
        response => {
          const { ok, status } = response;

          if (!ok) {
            const retry = status >= 500 && status < 600; // don't retry for 4xx codes

            throw new BackendError(`failed loading ${url}`, retry);
          }

          return response.text();
        },
        () => {
          throw new BackendError(`failed loading ${url}`);
        }
      )
      .then(data => {
        try {
          return callback(null, parse(data, url));
        } catch (e) {
          throw new BackendError(`failed parsing ${url} to json`, false);
        }
      })
      .catch(e => {
        if (e instanceof BackendError) {
          callback(e.message, e.retry);
        }
      });
  }

  create(languages, namespace, key, fallbackValue) {
    const payload = {
      [key]: fallbackValue || ""
    };

    arrify(languages).forEach(lng => {
      const { addPath, requestOptions, fetch, stringify } = this.options;

      const url = this.services.interpolator.interpolate(addPath, { lng, ns: namespace });

      try {
        fetch(url, {
          method: "POST",
          body: stringify(payload),
          ...requestOptions
        });
      } catch (ex) {
        console.error(ex); // eslint-disable-line no-console
      }
    });
  }
}

export default Backend;
