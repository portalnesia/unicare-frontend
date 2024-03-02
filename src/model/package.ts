export type PackageType = "smart_health_plus" | "premium" | "diamond_plus"
export function getPackageTypeName(packageType: PackageType) {
    const formattedName = packageType
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return formattedName;
}