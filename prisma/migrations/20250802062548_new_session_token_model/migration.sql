/*
  Warnings:

  - You are about to drop the column `tokenID` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_tokenID_fkey";

-- DropIndex
DROP INDEX "Users_tokenID_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "tokenID";

-- DropTable
DROP TABLE "Token";

-- CreateTable
CREATE TABLE "ValidationToken" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exp_at" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ValidationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionToken" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exp_at" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "SessionToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidationToken_id_key" ON "ValidationToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ValidationToken_email_key" ON "ValidationToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SessionToken_id_key" ON "SessionToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SessionToken_email_key" ON "SessionToken"("email");
