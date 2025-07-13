-- CreateTable
CREATE TABLE "TransactionDetails" (
    "transactionId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" TEXT NOT NULL,
    "taxablSales" INTEGER NOT NULL,
    "totalValSales" INTEGER NOT NULL,
    "nonTaxableSales" INTEGER NOT NULL,
    "exemptSales" INTEGER NOT NULL,
    "netTotal" INTEGER NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "changeGiven" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "discountID" TEXT,

    CONSTRAINT "TransactionDetails_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "TransactionItems" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "vatStatus" TEXT NOT NULL,

    CONSTRAINT "TransactionItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionDetails_transactionId_key" ON "TransactionDetails"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionItems_id_key" ON "TransactionItems"("id");

-- AddForeignKey
ALTER TABLE "TransactionItems" ADD CONSTRAINT "TransactionItems_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "TransactionDetails"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;
