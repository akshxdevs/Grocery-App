-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderPlacedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
