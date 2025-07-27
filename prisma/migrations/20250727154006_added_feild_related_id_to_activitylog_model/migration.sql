/*
  Warnings:

  - You are about to drop the column `userID` on the `ActivityLogs` table. All the data in the column will be lost.
  - Added the required column `relatedId` to the `ActivityLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ActivityLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLogs" DROP COLUMN "userID",
ADD COLUMN     "relatedId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
