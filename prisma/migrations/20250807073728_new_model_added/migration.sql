-- CreateTable
CREATE TABLE "AccountManagement" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "account_creation_attempts" INTEGER NOT NULL,
    "reset_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountManagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountManagement_id_key" ON "AccountManagement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AccountManagement_ip_key" ON "AccountManagement"("ip");
