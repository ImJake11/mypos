-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "userID" TEXT NOT NULL DEFAULT 'tempo';

-- CreateTable
CREATE TABLE "ActivityLogs" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "ActivityLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivityLogs_id_key" ON "ActivityLogs"("id");
