import { BackendModule, Services, ReadCallback, InitOptions } from "i18next";

// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

export interface FetchOptions {
  loadPath: string;
  addPath: string;
  multiSeparator: string;
  allowMultiLoading: boolean;
  fetch: typeof fetch;
  fxn: function;
  parse: typeof JSON.parse;
  stringify: typeof JSON.stringify;
  requestOptions: RequestInit;
}
export class BackendError extends Error {}
export default class Backend implements BackendModule<FetchOptions> {
  type: "backend";
  static type: "backend";
  constructor(services: Services, options: FetchOptions);
  init(
    services: Services,
    backendOptions: FetchOptions,
    i18nextOptions: InitOptions
  ): void;
  create(
    languages: string[],
    namespace: string,
    key: string,
    fallbackValue: string
  ): void;

  read(language: string, namespace: string, callback: ReadCallback): void;

  readMulti(languages: string[], namespaces: string[], callback: ReadCallback): void;
}
