/*
  Warnings:

  - You are about to drop the column `status` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Invitation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Invitation_status_idx";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "status",
DROP COLUMN "updatedAt";
