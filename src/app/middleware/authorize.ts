import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";


const authorize = () => {
 return async (
   req: RequestWithUser,
   res: express.Response,
   next: express.NextFunction
 ) => {
   try {
     const token = getTokenFromRequestHeader(req);
     jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
     return next();
   } catch (error) {
     return next(new UserNotAuthorizedException());
   }
 };
};

const authorizeGet = () => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const token = getTokenFromRequestHeader(req);
      jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
      const details = jsonwebtoken.decode(token);
      const roleValue = JSON.parse(JSON.stringify(details)).customRole;
      if(roleValue === 'admin' || roleValue === 'engineer'){
        return next();
      }
      else
      return next(new UserNotAuthorizedException());
      
    } catch (error) {
      return next(new UserNotAuthorizedException());
    }
  };
 };

 const authorizeEdit = () => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const token = getTokenFromRequestHeader(req);
      jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
      const details = jsonwebtoken.decode(token);
      const roleValue = JSON.parse(JSON.stringify(details)).customRole;
      console.log(roleValue);
      if(roleValue === 'admin'){
        return next();
      }
      else
      return next(new UserNotAuthorizedException());
      return next();
    } catch (error) {
      return next(new UserNotAuthorizedException());
    }
  };
 };


const getTokenFromRequestHeader = (req: RequestWithUser) => {
    const tokenWithBearerHeader = req.header(
      `${APP_CONSTANTS.authorizationHeader}`
    );
    if (tokenWithBearerHeader) {
      return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
    }
    return "";
   };


export {authorize,authorizeGet,authorizeEdit};