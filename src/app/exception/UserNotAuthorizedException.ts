import HttpException from "./HttpException";
import { ErrorCodes } from "../util/errorCode";


class UserNotAuthorizedException extends HttpException {
    
    constructor() {
        const errorDetail = ErrorCodes.UNAUTHORIZED;
        super(401, errorDetail.MESSAGE, errorDetail.CODE);
    }


}

export default UserNotAuthorizedException;