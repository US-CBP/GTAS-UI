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
      resolve("No fxn property has set in backend options");
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

  type = "backend";
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
    return this.loadUrl(callback);
  }

  readMulti(language, ns, callback) {
    return this.loadUrl(callback);
  }

  loadUrl(callback) {
    return callback(null, this.options.parse());
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
