import { FilterModel } from "@/app/lib/models/filterModel";
import { ProductProps } from "@/app/lib/models/productModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



// Assuming necessary imports and prisma client are available

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;

        // Use a more specific type for filters, or define FilterModel
        // For now, I'll assume it's like this:
        interface FilterModel {
            categoryID?: string;
            name?: string;
            maxPrice?: number;
            minPrice?: number;
            minStock?: number;
            maxStock?: number;
            withDiscount?: boolean;
            withBulkPricing?: boolean;
        }

        const filters: FilterModel = {};

        // category params
        const categoryParam = searchParams.get("category_id");
        if (categoryParam) {
            filters.categoryID = categoryParam;
        }

        // filter name check if its string or not
        const nameParam = searchParams.get("name");
        if (typeof nameParam === "string" && nameParam.length > 0) {
            filters.name = nameParam;
        }

        // filter max price
        const maxPriceParam = searchParams.get("max_price");
        const parseMaxPriceParam = maxPriceParam ? parseFloat(maxPriceParam) : NaN;
        if (!isNaN(parseMaxPriceParam)) {
            filters.maxPrice = parseMaxPriceParam;
        }

        // filtered min price
        const minPriceParam = searchParams.get("min_price");
        const parseMinPriceParam = minPriceParam ? parseFloat(minPriceParam) : NaN;
        if (!isNaN(parseMinPriceParam)) {
            filters.minPrice = parseMinPriceParam;
        }

        const minStockParam = searchParams.get("min_stock");
        const parsedMinStock = minStockParam ? parseInt(minStockParam, 10) : NaN;
        if (!isNaN(parsedMinStock)) {
            filters.minStock = parsedMinStock;
        }

        const maxStockParam = searchParams.get("max_stock");
        const parsedMaxStock = maxStockParam ? parseInt(maxStockParam, 10) : NaN;
        if (!isNaN(parsedMaxStock)) {
            filters.maxStock = parsedMaxStock;
        }

        // CORRECTED: withDiscount handling
        const withDiscountParam = searchParams.get("with_discounts");
        if (withDiscountParam === 'true') {
            filters.withDiscount = true;
        } else if (withDiscountParam === 'false') {
            filters.withDiscount = false;
        }
        // If withDiscountParam is null or anything else, filters.withDiscount remains undefined, which is correct.

        // CORRECTED: withBulkPricing handling (similar to withDiscount)
        const withBulkPricingParam = searchParams.get("with_bulk");
        if (withBulkPricingParam === 'true') {
            filters.withBulkPricing = true;
        } else if (withBulkPricingParam === 'false') {
            filters.withBulkPricing = false;
        }
        // If withBulkPricingParam is null or anything else, filters.withBulkPricing remains undefined.


        // Build the Prisma 'where' clause dynamically
        const whereClause: any = {}; // Use Prisma.ProductWhereInput if you import Prisma

        if (filters.name) {
            whereClause.name = {
                contains: filters.name,
                mode: "insensitive",
            };
        }

        if (filters.categoryID) {
            whereClause.categoryID = {
                equals: filters.categoryID,
            };
        }

        // Promotional Discount Logic (based on your confirmation it's REQUIRED and 0 means no discount)
        if (filters.withDiscount === true) {
            whereClause.promotionalDiscount = {
                discountRate: {
                    not: 0, // Products with a discount (rate is not 0)
                },
            };
        } else if (filters.withDiscount === false) {
            whereClause.promotionalDiscount = {
                discountRate: 0, // Products without a discount (rate is exactly 0)
            };
        }
        // If filters.withDiscount is undefined, no condition is added for promotionalDiscount,
        // meaning both discounted and non-discounted products are returned.


        // Bulk Pricing Logic (similar to promotionalDiscount)
        if (filters.withBulkPricing === true) {
            whereClause.bulkEnabled = true; // Or { equals: true }
        } else if (filters.withBulkPricing === false) {
            whereClause.bulkEnabled = false; // Or { equals: false }
        }
        // If filters.withBulkPricing is undefined, no condition is added for bulkEnabled.


        if (filters.minStock !== undefined) {
            whereClause.stock = {
                ...whereClause.stock, // Preserve existing stock conditions if any
                gte: filters.minStock,
            };
        }
        if (filters.maxStock !== undefined) {
            whereClause.stock = {
                ...whereClause.stock, // Preserve existing stock conditions if any
                lte: filters.maxStock,
            };
        }

        if (filters.minPrice !== undefined) {
            whereClause.sellingPrice = {
                ...whereClause.sellingPrice, // Preserve existing sellingPrice conditions if any
                gte: filters.minPrice,
            };
        }
        if (filters.maxPrice !== undefined) {
            whereClause.sellingPrice = {
                ...whereClause.sellingPrice, // Preserve existing sellingPrice conditions if any
                lte: filters.maxPrice,
            };
        }


        // Execute Prisma Query
        const products = await prisma.product.findMany({
            where: whereClause, // Use the dynamically built whereClause
            include: {
                variants: true,
                bulkTier: true,
                category: true,
                promotionalDiscount: true,
            }
        });

        return NextResponse.json({ products }, { status: 200 });

    } catch (e: any) { // Catch the error to log it for debugging
        console.error("Error in GET /api/product/filter:", e);
        return NextResponse.json({ error: "Internal Server Error", details: e.message }, { status: 500 });
    }
}