import { EntityRepository, getConnection, Repository } from "typeorm";
import { Address } from "../entities/address";
import { EmployeeRoles } from "../entities/EmployeeRoles";

export class AddressRepository extends Repository<Address> {
    public async getAllAddress() {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.findAndCount();
    }

    public async getAddressById(id: string) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.findOne(id);
    }

    public async getAddressByUsername(username: string) {
        const addressRepo = getConnection().getRepository(Address);
        const addressDetail = await addressRepo.findOne({
            where: {username},
        });
        return addressDetail;
    }

    public async saveAddressDetails(addressDetails: Address) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.save(addressDetails);
    }

    public async updateAddressDetails(addressId: string, addressDetails: any) {
        const addressRepo = getConnection().getRepository(Address);
        const updateAddressDetails = await addressRepo.update({ addressId: addressId, deletedAt: null }, {
            placeName: addressDetails.placeName ? addressDetails.placeName : undefined,
        });
        return updateAddressDetails;
    }

    public async updateAddressDetailsQueryBuilder(addressId: string, addressDetails: any) {
        const addressRepo = getConnection().getRepository(Address);
        const updateAddressDetails = await addressRepo.createQueryBuilder("address").update(Address).set({
            placeName: addressDetails.placeName ? addressDetails.placeName : undefined,
        }).where({ addressId: addressId, deletedAt: null }).returning("*").execute();
        return updateAddressDetails;
    }

    public async softDeleteAddressById(addressId: string) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.softDelete({
            addressId
        });
    }

    public async hardDeleteAddressById(addressId: string) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.delete({
            addressId
        });
    }

    public async hardRemoveAddress(address: Address) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.remove(address);
    }

    public async softRemoveAddress(address: Address) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.softRemove(address);
    }
}
