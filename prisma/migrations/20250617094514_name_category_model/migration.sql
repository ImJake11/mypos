/*
  Warnings:

  - You are about to drop the `CategoryModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CategoryModel";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");
