-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "receiverEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_senderEmail_key" ON "Invitation"("senderEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_receiverEmail_key" ON "Invitation"("receiverEmail");

-- CreateIndex
CREATE INDEX "Invitation_senderEmail_idx" ON "Invitation"("senderEmail");

-- CreateIndex
CREATE INDEX "Invitation_receiverEmail_idx" ON "Invitation"("receiverEmail");
