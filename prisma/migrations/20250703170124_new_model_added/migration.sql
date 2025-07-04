-- CreateTable
CREATE TABLE "Vat" (
    "id" TEXT NOT NULL,
    "settingKey" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,

    CONSTRAINT "Vat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vat_id_key" ON "Vat"("id");
