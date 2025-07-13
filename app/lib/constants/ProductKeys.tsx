import { ProductProps } from "../models/productModel"




export const ProductKeys = {
   discountEnabled: "discountEnabled",
   promotionalDiscount: "promotionalDiscount",
   name: "name",
   description: "description",
   categoryID: "categoryID",
   sellingPrice: "sellingPrice",
   costPrice: "costPrice",
   tax: "tax",
   bulkEnabled: "bulkEnabled",
   bulkTier: "bulkTier",
   stock: "stock",
   lowStock: "lowStock",
   variants: "variants",
   isActive: "isActive",
   coverImage: "coverImage",
   photoSnapshots: "photoSnapshots",
   hightlighs: "highlights",
   vatId: "vatId",
}

export const PromotionalDiscountKeys = {
   expirationDate: "expirationDate",
   discountRate: "discountRate",
   description: "description",
}

export const VariantKeys = {
   name: "name",
   price: "price",
   isPositive: "isPositive", // positive if price is increase and negative if decreease
   stock: "stock",
   imageUrl: "imageUrl",
   isArchived: "isArchived",
   details: "details",
}