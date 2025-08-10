import { prisma } from "@/app/lib/utils/db/prisma";
import { getIpAddress } from "../ip/getIpAddress";
import { NextRequest, NextResponse, userAgent } from "next/server";


export async function handleAccountManagement(req: NextRequest): Promise<NextResponse | undefined> {

    try {
        const ip = await getIpAddress(req);
        const user_agent = JSON.stringify(userAgent(req));
        const limit = 5;

        const userAccountManagement = await prisma.accountManagement.findUnique({
            where: {
                ip,
                user_agent,
            },
            select: {
                account_creation_attempts: true,
                reset_at: true,
                id: true,
            }
        });

        const newExpDate = new Date();
        newExpDate.setHours(newExpDate.getHours() + 24);


        if (userAccountManagement) {
            /**check if the current record is expired */
            const recordExpDate = new Date(userAccountManagement.reset_at);
            const now = new Date();

            const isExpired = recordExpDate < now;

            if (isExpired) {
                /** reset the attempts to 0 */
                await prisma.accountManagement.update({
                    where: { id: userAccountManagement.id },
                    data: {
                        account_creation_attempts: 0,
                        reset_at: newExpDate,
                    }
                })
            }

            if (userAccountManagement.account_creation_attempts >= limit
                && !isExpired) return NextResponse.json(
                    { error: "Failed to continue limit reached, Please try again later" },
                    { status: 401 }
                )

            // if not expired yet, just incrment the attempts
            else {
                await prisma.accountManagement.update({
                    where: { id: userAccountManagement.id },
                    data: {
                        account_creation_attempts: {
                            increment: 1,
                        }
                    }
                })
            }
        } else {
            // create new record for this request if no record is existing
            await prisma.accountManagement.create({
                data: {
                    ip,
                    user_agent,
                    account_creation_attempts: 1,
                    reset_at: newExpDate,
                }
            })
        }

    } catch (e) {
        return NextResponse.json(
            { error: "Account managemet function error" },
            { status: 500 }
        )
    }
}