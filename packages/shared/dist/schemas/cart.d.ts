import { z } from "zod";
export declare const cartItemAddonSchema: any;
export declare const cartItemSchema: any;
export declare const addToCartSchema: any;
export declare const cartSchema: any;
export type CartItemAddon = z.infer<typeof cartItemAddonSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
