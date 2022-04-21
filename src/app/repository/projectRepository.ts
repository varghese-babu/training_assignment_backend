import { getConnection, Repository } from "typeorm";
import { Department } from "../entities/Department";
import { projects } from "../entities/projects";

export class ProjectRepository extends Repository<projects> {
    public async createProject(projectDetails: projects) {
        const projectsConnection = getConnection().getRepository(projects);
        const savedDetails = await projectsConnection.save(projectDetails);
        return savedDetails;

    }
}
