-- DropIndex
DROP INDEX "User_coupleId_key";

-- CreateIndex
CREATE INDEX "User_coupleId_idx" ON "User"("coupleId");
