
export const objectToQuery = (load={}) => {
  let searchParams = '?';
  for (let key in load) {
    searchParams += `${key}=${load[key]}&`;
  }
  if (searchParams.endsWith('&'))
    searchParams = searchParams.slice(0, - 1);
  return searchParams;
};

export const NairaUnit=(val)=>{
  if(!val) val = 0;
  return new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN'})
  .format(val);
}