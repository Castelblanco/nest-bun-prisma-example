export type TWrappers<TDom, TDal> = {
    dalToDom: (item: TDal) => TDom;
    domToDal: (item: TDom) => TDal;
};
