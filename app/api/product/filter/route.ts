import { FilterModel } from "@/app/lib/models/filterModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    try {
        const searchParams = req.nextUrl.searchParams;

        const filters: FilterModel = {};

        // category params
        const categoryParam = searchParams.get("category_id");
        if(categoryParam){
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

        const withDiscountParam = searchParams.get("with_discount");
        if (withDiscountParam === 'true') {
            filters.withDiscount = true;
        } else if (withDiscountParam === 'false') {
            filters.withDiscount = false;
        }

        const withBulkPricingParam = searchParams.get("with_bulk");
        if (withBulkPricingParam === 'true') {
            filters.withBulkPricing = true;
        } else if (withBulkPricingParam === 'false') {
            filters.withBulkPricing = false;
        }


        const whereConditions: any = {};

        // Name filter
        if (filters.name) {
            whereConditions.name = {
                contains: filters.name,
                mode: "insensitive",
            };
        }

        // Category ID filter
        if (filters.categoryID) {
            whereConditions.categoryID = filters.categoryID;
        }

        // Stock filters
        if (filters.minStock || filters.maxStock) {
            whereConditions.stock = {};
            if (filters.minStock) {
                whereConditions.stock.gte = filters.minStock;
            }
            if (filters.maxStock) {
                whereConditions.stock.lte = filters.maxStock;
            }
        }

        // Bulk pricing filter
        // If 'withBulkPricing' is true, filter for products where bulkEnabled is true.
        // If 'withBulkPricing' is false, filter for products where bulkEnabled is false.
        // If 'withBulkPricing' is undefined, don't filter by bulkEnabled.
        if (filters.withBulkPricing !== undefined) {
            whereConditions.bulkEnabled = filters.withBulkPricing;
        }


        // Discount filter
        // If withDiscount is true, find products with a promotionalDiscount where discountRate > 0.
        // If withDiscount is false, find products WITHOUT a promotionalDiscount where discountRate > 0.
        // If withDiscount is undefined, don't filter by discount.
        if (filters.withDiscount === true) {
            whereConditions.promotionalDiscount = {
                discountRate: { gt: 0 }
            };
        } else if (filters.withDiscount === false) {
            whereConditions.promotionalDiscount = null; // No linked promotionalDiscount record
        }


        // Variant price filters
        // Use 'some' for "at least one variant matches the price range"
        // Use 'every' for "ALL variants must match the price range" 
        if (filters.minPrice || filters.maxPrice) {
            whereConditions.variants = {
                some: {
                    price: {
                        ...(filters.minPrice && { gte: filters.minPrice }),
                        ...(filters.maxPrice && { lte: filters.maxPrice }),
                    }
                }
            };
        }


        // 3. Execute Prisma Query 
        const products = await prisma.product.findMany({
            where: whereConditions,
            include: {
                variants: true,
                bulkTier: true,
                category: true,
                promotionalDiscount: true,
            }
        });

        console.log("FETCHED DATA",products);

        return NextResponse.json({ products }, { status: 200 });


    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}