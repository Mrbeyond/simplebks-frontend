
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


/**
 * @param current_page The current page. Optional, default is 1 
 * @param movement The offset movement when current page go up or down. Optional default is 3
 * @param range The range of displayed pages link e.g 1 2 3 >> or << 4 5 6 7 8 or << 4 5 6 7 >>.
 *  Optional, default is 5 
 * @param total_pages The initial length of estimated pages from server from offest and limit. Required.
 */
 export const pagePaginator=({total_pages, current_page=1, movement=3, range=5})=> {
  range= total_pages<range?total_pages:range;
  const range_array= Array(range).fill(1);
  let pages = range_array.map((page,index)=>page+index);
  // console.log(pages);
  let range_off_set = current_page-movement;
  if(range_off_set < 1){
    return pages.map((page,index)=>({
      text:(page),
      id:`${page}_${index}`
    }));
  }else{
    range_off_set= range_off_set+range > total_pages? total_pages-range: range_off_set;
    return pages.map((page,index)=>({
      text:(page+range_off_set),
      id:`${page}_${index}`
    }));
  }  
}


/**
 * @param offest The current page offset. Optional, default is 0 
 * @param movement The offset movement when current page go up or down. Optional default is 3
 * @param range The range of displayed pages link e.g 1 2 3 >> or << 4 5 6 7 8 or << 4 5 6 7 >>.
 *  Optional, default is 5 
 * @param total The total count of itmes from server.  Required.
 * @limit Per page limit. Optional, default is 20 
 */
export const offsetPaginator=({offset=0, total=0,limit=20, movement=3, range=5})=>{
  limit = Number(limit);
  total = Number(total);
  offset = Number(offset);
  if(isNaN(limit) || isNaN(total) || isNaN(offset) || !limit) return [];
  
  const total_pages = Math.ceil(total/limit);
  const current_page = Math.floor(offset/limit);

  if(!total_pages) return [];
  
  range= total_pages<range?total_pages:range;

  const range_array= Array(range).fill(1);

  /** fill page link template  with increment value of 1 to range */
  let pages = range_array.map((page,index)=>Number(page)+index);

  const current_count = ((current_page+1)*limit) > total?
     (total- (current_page*limit)): limit;
  
  let pagination=[];
  let meta={
    total,
    from: offset+1,
    current_count,
    to: offset+ current_count,
    total_pages,
    current_page: current_page+1, 
    limit, 
    show_first:false, 
    first_link: "",
    last_link: "",
    show_last:false
  };
    
  let range_off_set = current_page - movement;

  if(range_off_set < 1){
    pagination= pages.map((page,index)=>{
      const link_offset =  index * limit;
      const query = `?offset=${link_offset}&limit=${limit}`

      return { query, id: `${page}_${index}`, text: page }
    });
  }else{
    range_off_set= range_off_set+range > total_pages? total_pages-range: range_off_set;
    pagination = pages.map((page,index)=>{
      const link_offset = (index+range_off_set) * limit;
      // console.log({link_offset, page:index+range_off_set, index});
      const query = `?offset=${link_offset}&limit=${limit}`

      return { query, id: `${page}_${index}`, text: (page+range_off_set) }
    });
  }  

  // console.log({total_pages, current_page, range, movement});
  if(((total_pages - (current_page+1)) >= (range - movement)) && range >=5 ){
    meta.show_last = true;
    meta.last_link = `?offset=${(total_pages-1)*limit}&limit=${limit}`;
  }
  if((current_page+1) >= range  && range >=5){
    meta.show_first = true 
    meta.first_link = `?offset=0&limit=${limit}`;
  }

  return { pagination, meta};

}

export const extractPaginationQuery=({offset=0, limit=20, sort='', dir='DESC'})=>{
    return `?offset=${offset}&`+
            `limit=${limit}&`+
            `sort=${sort}&`+
            `dir=${dir}`;
}