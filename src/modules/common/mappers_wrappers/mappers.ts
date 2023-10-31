export type TMappers<TDom, TApi> = {
    apiToDom: (item: TApi) => TDom;
    domToApi: (item: TDom) => TApi;
};
