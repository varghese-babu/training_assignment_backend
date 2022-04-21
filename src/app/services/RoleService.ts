import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import { RoleRepository } from "../repository/RoleRepository";
import { EmployeeRoles } from "../entities/EmployeeRoles";


export class RoleService {
    constructor(
        private roleRepository: RoleRepository
    ) {}
    public async getAllRoles() {
        return this.roleRepository.getAllRoles();
    }

    public async getRoleById(roleId: string) {
        return this.roleRepository.getRoleById(roleId);
    }

    public async createRole(roleDetails: any) {
        try {
            const newRole = plainToClass(EmployeeRoles, {
                roleName: roleDetails.name,
                //roleId: roleDetails.id,
            });
            const save = await this.roleRepository.saveRoleDetails(newRole);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create role");
        }
    }

    public async updateRole(roleId: string, roleDetails: any) {
        // Approach 1
        const updatedRole = await this.roleRepository.updateRoleDetails(roleId, roleDetails);
        // const updatedEmployee = await this.employeeRepository.
        //                         updateEmployeeDetailsQueryBuilder(employeeId, employeeDetails);
        return updatedRole;

        // //Approach 2
        // const employee = await this.getEmployeeById(employeeId);
        // if (!employeeId) {
        //     throw new HttpException(400, `Employee not found`);
        // }

        // employee.name = (employeeDetails.name) ? employeeDetails.name : employee.name;
        // employee.age = (employeeDetails.age) ? employeeDetails.age : employee.age;

        // const updatedEmployee = await this.employeeRepository.saveEmployeeDetails(employee);
        // return updatedEmployee;
    }

    public async deleteRole(roleId: string) {
        return this.roleRepository.softDeleteRoleById(roleId);
        // return this.employeeRepository.hardDeleteEmployeeById(employeeId);

        // // Hard Remove ( Fetches the entity then deletes it )
        // const employeeDetails = await this.employeeRepository.getEmployeeById(employeeId);
        // return this.employeeRepository.hardRemoveEmployee(employeeDetails);
    }
}
