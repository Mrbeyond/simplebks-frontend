/** User token saver */
export const saveTK=(tk)=>{
  if(!tk || !window) return;
  try {
    localStorage.UTK= btoa(btoa(JSON.stringify(tk)));
  } catch (error) {
    return;
  }
}


export const getTk=()=>{
  if(!window) return null;
  try {
    if(!localStorage.UTK) return null;
    let tk= JSON.parse(atob(atob(localStorage.UTK)));
    return tk;
  } catch (error) {
    return null;
  }
}

/** Parse out authorization toking from local storage */
export const hToken=()=>{
  if(!window) return null;
  let tk = getTk();
  if(!tk) return window.location.replace('/');
  return { Authorization: "Bearer "+ tk}
}