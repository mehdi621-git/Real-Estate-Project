export const error = (statuscode , message)=>{
    const err = new Error();
    err.statusCode = statuscode;
    err.message = message ;
     return err
} ;