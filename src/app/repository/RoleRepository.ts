import { EntityRepository, getConnection, Repository } from "typeorm";
import { EmployeeRoles } from "../entities/EmployeeRoles";

export class RoleRepository extends Repository<EmployeeRoles> {
    public async getAllRoles() {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        return roleRepo.findAndCount();
    }

    public async getRoleById(id: string) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        return roleRepo.findOne(id);
    }

    public async getRoleByUsername(username: string) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        const roleDetail = await roleRepo.findOne({
            where: {username},
        });
        return roleDetail;
    }

    public async saveRoleDetails(roleDetails: EmployeeRoles) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        return roleRepo.save(roleDetails);
    }

    public async updateRoleDetails(roleId: string, roleDetails: any) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        const updateRoleDetails = await roleRepo.update({ roleId: roleId, deletedAt: null }, {
            roleName: roleDetails.roleName ? roleDetails.roleName : undefined,
        });
        return updateRoleDetails;
    }

    public async updateRoleDetailsQueryBuilder(roleId: string, roleDetails: any) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        const updateRoleDetails = await roleRepo.createQueryBuilder("role").update(EmployeeRoles).set({
            roleName: roleDetails.roleName ? roleDetails.roleName : undefined,
        }).where({ roleId: roleId, deletedAt: null }).returning("*").execute();
        return updateRoleDetails;
    }

    public async softDeleteRoleById(roleId: string) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        return roleRepo.softDelete({
            roleId
        });
    }

    public async hardDeleteRoleById(roleId: string) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        return roleRepo.delete({
            roleId
        });
    }

    public async hardRemoveRole(role: EmployeeRoles) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        return roleRepo.remove(role);
    }

    public async softRemoveRole(role: EmployeeRoles) {
        const roleRepo = getConnection().getRepository(EmployeeRoles);
        return roleRepo.softRemove(role);
    }
}
