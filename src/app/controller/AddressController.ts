import { NextFunction, Response } from "express";
import multer from "multer";
import APP_CONSTANTS from "../constants";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import {authorize, authorizeGet,authorizeEdit} from "../middleware/authorize";
import validationMiddleware from "../middleware/validationMiddleware";
import { AddressService } from "../services/AddressServices";
import { EmployeeService } from "../services/EmployeeService";
import { RoleService } from "../services/RoleService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
/**
 * Implementation of the EmployeeController route.
 *
 */
class AddressController extends AbstractController {

  private upload = multer({ dest: "./public/uploads/"});
  constructor(
    private addressService: AddressService,
  ) {
    super(`${APP_CONSTANTS.apiPrefix}/address`);
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    this.router.get(
      `${this.path}`,
      authorizeGet(),
      this.asyncRouteHandler(this.getAllAddress)
    );
    this.router.get(
      `${this.path}/:addressId`,
      authorizeGet(),
      this.asyncRouteHandler(this.getAddressById)
    );
    this.router.post(
      `${this.path}`,
      // validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee)
     // authorizeEdit(),
  
      this.createAddress
    );
    this.router.put(
      `${this.path}/:addressId`,
     // authorizeEdit(),
      this.asyncRouteHandler(this.updateAddress)
    );
    this.router.delete(
      `${this.path}/:addressId`,
     // authorizeEdit(),
      this.asyncRouteHandler(this.deleteAddress)
    );

  }

  private getAllAddress = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const data = await this.addressService.getAllAddress();
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
    );
  }

  private getAddressById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const data = await this.addressService.getAddressById(request.params.id);
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
    );
  }

  private createAddress = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      //console.log("here");
      const data = await this.addressService.createAddress(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateAddress = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
      const data = await this.addressService.updateAddress(request.params.roleId, request.body);
      response.status(201).send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
  }

  private deleteAddress = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
      const data = await this.addressService.deleteAddress(request.params.roleId);
      response.status(201).send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
  }


}

export default AddressController;
