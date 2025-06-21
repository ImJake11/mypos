-- CreateTable
CREATE TABLE "CategoryModel" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryModel_id_key" ON "CategoryModel"("id");
