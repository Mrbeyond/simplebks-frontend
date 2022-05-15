
export const errorStatus=(type=null)=>{
  if(type == "user")return{
    '400': "Unaccapted request, check the credentials",
    "401": "Unauthorized to perform this operation, login first",
    "403": "Account already exist",
    "404": "Invalid credentials, no matched details",
    "500": "Oops! Something went wrong, please retry"
  }
  else return{
    '400': "Unaccapted request, check the credentials",
    "401": "Unauthorized to perform this operation, login first",
    "403": "You are forbiddent to perform the operation",
    "404": "Resources not found",
    "500": "Oops! Something went wrong, please retry"
  }
}

/**
 * Get error message from http response
 * @err error object
 */
export const errorParser=(err, param={})=>{
  if(!err.isAxiosError) return err.toString();
  if(!err.response) return 'Oops! Something went wrong.';
  if(param.status && err.response && err.response.status){
    let errObj = param.user? errorStatus('user'): errorStatus();
    return errObj[err.response.status]
  }else if(param.message && err.response && err.response.data){
    return err.response.data.message?
      err.response.data.message:
      param.key?
      err.response.data[param.key]:
      "Oops! Something went wrong"
  }else{
    return "Oops! Something went wrong";
  }
}