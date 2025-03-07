/*
  Warnings:

  - A unique constraint covering the columns `[mobileNo]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "address" TEXT,
ADD COLUMN     "mobileNo" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_mobileNo_key" ON "Admin"("mobileNo");
