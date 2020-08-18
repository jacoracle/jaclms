/** Cantidad de atributos inicializados o definidos de un Objeto
 * En caso de 0 no tiene propiedades*/
export const cantidadAtributos = (obj: any): number => {
  return Object.keys(obj).length;
};
