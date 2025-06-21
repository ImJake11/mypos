import { NewProductProps } from "../models/newProductModel"




export const NewProductKeys = {
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
   coverImage: "coverImage",
   photoSnapshots: "photoSnapshots",
   hightlighs: "highlights",
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
}