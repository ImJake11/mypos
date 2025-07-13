/*
  Warnings:

  - Added the required column `status` to the `TransactionDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartCache" ALTER COLUMN "vatStatus" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TransactionDetails" ADD COLUMN     "status" TEXT NOT NULL;
