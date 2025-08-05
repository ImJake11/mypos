/*
  Warnings:

  - A unique constraint covering the columns `[tokenID]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_tokenID_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Users_tokenID_key" ON "Users"("tokenID");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_tokenID_fkey" FOREIGN KEY ("tokenID") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;
