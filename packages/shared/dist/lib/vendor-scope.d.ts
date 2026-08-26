export type StaffActor = {
    email: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    isVendor: boolean;
    /** Resolved server-side from vendor user emails — never from the request body. */
    vendorSlug?: string;
};
export declare function isGlobalAdmin(actor: StaffActor | null | undefined): boolean;
export declare function vendorScopeSlug(actor: StaffActor | null | undefined): string | undefined;
export declare function assertVendorOwnsVendorId(actor: StaffActor, vendorId: string): boolean;
export declare function orderVisibleToActor(order: {
    vendorSlugs?: string[];
    items?: Array<{
        vendorSlug?: string | null;
    }>;
}, actor: StaffActor): boolean;
export declare function productVisibleToActor(product: {
    vendorSlug?: string | null;
}, actor: StaffActor): boolean;
export declare function warehouseVisibleToActor(warehouse: {
    vendorId?: string | null;
    warehouseId: string;
}, actor: StaffActor, vendorWarehouseIds?: string[]): boolean;
export declare function redactOrderForVendor<T extends {
    items?: Array<{
        vendorSlug?: string | null;
    }>;
}>(order: T, vendorSlug: string): T;
export declare function defaultVendorSlugForNewProduct(actor: StaffActor): string;
