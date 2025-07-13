/*
  Warnings:

  - The `referenceId` column on the `TransactionDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TransactionDetails" DROP COLUMN "referenceId",
ADD COLUMN     "referenceId" BIGINT NOT NULL DEFAULT 0;
