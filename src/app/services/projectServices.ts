import { plainToClass } from "class-transformer";
import { projects } from "../entities/projects";
import { ProjectRepository } from "../repository/projectRepository";

export class ProjectService {
    constructor(
        private projectRepository: ProjectRepository
    ){}



    public async createProject(projectInput: any){
        const projectData = plainToClass(projects, {
            "name": projectInput.name,
            description: "KeyValue 123"
        });
        const savedDetails = await this.projectRepository.createProject(projectData);
        return savedDetails;
    } 
}
