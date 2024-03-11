export enum IRoles {
    MASTER = "MASTER",
    ADMIN = "ADMIN",
    PROVIDER = "PROVIDER",
    CUSTOMER = "CUSTOMER",
}

export const rolesArray = [
    "MASTER",
    "ADMIN",
    "PROVIDER",
    "CUSTOMER"
]

export const adminRolesArray = Object.values(IRoles).filter(role => role !== IRoles.CUSTOMER).reverse();

export type Auth = {
    id: number;
    roles: IRoles
    expired_at: number;
}

export const getAdminRoleName = (iRole: IRoles) => {
    switch (iRole) {
        case IRoles.PROVIDER: return "Admin Provider";
        case IRoles.ADMIN: return "Super Admin";
        case IRoles.MASTER: return "Master 1";
        default: return "";
    }
}