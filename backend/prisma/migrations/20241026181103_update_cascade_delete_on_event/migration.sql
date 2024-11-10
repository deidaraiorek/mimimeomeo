-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_coupleId_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE CASCADE ON UPDATE CASCADE;
