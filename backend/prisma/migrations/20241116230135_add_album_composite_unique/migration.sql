/*
  Warnings:

  - A unique constraint covering the columns `[name,coupleId]` on the table `Album` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Album_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Album_name_coupleId_key" ON "Album"("name", "coupleId");
