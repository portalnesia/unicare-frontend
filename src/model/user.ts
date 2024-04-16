import { IRoles } from "./auth";
import { PackageType } from "./package";


export type IUser = {
    id: number;
    name: string;
    email: string;
    roles: IRoles
}

export type ICustomer = {
    id: number;
    nik: string;
    bpjs_number: string;
    name: string;
    package: PackageType
}