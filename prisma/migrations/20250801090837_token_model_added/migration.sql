-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exp_at" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_id_key" ON "Token"("id");
