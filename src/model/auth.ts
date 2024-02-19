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

export type Auth = {
    id: number;
    roles: IRoles
    expired_at: number;
}