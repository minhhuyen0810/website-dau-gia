export const trimParam = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj).replace(/\"\s+|\s+\"/g, '"'));
}