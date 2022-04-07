import APP_CONSTANTS from "../constants";
import { AbstractController } from "../util/rest/controller";
import { ProjectService } from "../services/projectServices";
import RequestWithUser from "../util/rest/request";
import { NextFunction, Router, Response } from "express";
import { Any } from "typeorm";


class ProjectsController extends AbstractController {

    constructor(
      private projectService: ProjectService
    ) {
      super(`${APP_CONSTANTS.apiPrefix}/projects`);
      this.initializeRoutes();
    }

    protected initializeRoutes = (): void => {
      this.router.post(
        `${this.path}`,
        this.createProject
      );
    }

    public createProject = async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      const data = await this.projectService.createProject(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    }

  }

export default ProjectsController;