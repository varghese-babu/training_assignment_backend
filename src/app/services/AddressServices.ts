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
import { Address } from "../entities/address";
import { AddressRepository } from "../repository/AddressRepository";


export class AddressService {
    constructor(
        private addressRepository: AddressRepository
    ) {}
    public async getAllAddress() {
        return this.addressRepository.getAllAddress();
    }

    public async getAddressById(addressId: string) {
        return this.addressRepository.getAddressById(addressId);
    }

    public async createAddress(addressDetails: any) {
        try {
            const newAddress = plainToClass(Address, {
                
                placeName: addressDetails.placeName,
                city: addressDetails.city,
                district: addressDetails.district,
                state: addressDetails.state,
                pincode: addressDetails.pincode,
                mobileNumber: addressDetails.mobileNumber,
                emailId: addressDetails.emailId        
            });
            const save = await this.addressRepository.saveAddressDetails(newAddress);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create address");
        }
    }

    public async updateAddress(addressId: string, addressDetails: any) {
        // Approach 1
        const updatedAddress = await this.addressRepository.updateAddressDetails(addressId, addressDetails);
        // const updatedEmployee = await this.employeeRepository.
        //                         updateEmployeeDetailsQueryBuilder(employeeId, employeeDetails);
        return updatedAddress;

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

    public async deleteAddress(addressId: string) {
        return this.addressRepository.softDeleteAddressById(addressId);
        // return this.employeeRepository.hardDeleteEmployeeById(employeeId);

        // // Hard Remove ( Fetches the entity then deletes it )
        // const employeeDetails = await this.employeeRepository.getEmployeeById(employeeId);
        // return this.employeeRepository.hardRemoveEmployee(employeeDetails);
    }
}
