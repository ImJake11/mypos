/*
  Warnings:

  - You are about to drop the column `validationTokenID` on the `Users` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "validationTokenID",
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "relateProviderID" TEXT;
