-- AlterTable
ALTER TABLE "TransactionDetails" ALTER COLUMN "referenceId" DROP NOT NULL,
ALTER COLUMN "referenceId" DROP DEFAULT,
ALTER COLUMN "referenceId" SET DATA TYPE TEXT;
