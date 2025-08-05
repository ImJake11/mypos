/*
  Warnings:

  - You are about to drop the column `sessionToken` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `validationToken` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "type" SET DEFAULT 'session_token';

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "sessionToken",
DROP COLUMN "validationToken",
ADD COLUMN     "tokenID" TEXT,
ADD COLUMN     "validationTokenID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_tokenID_fkey" FOREIGN KEY ("tokenID") REFERENCES "Token"("token") ON DELETE SET NULL ON UPDATE CASCADE;
