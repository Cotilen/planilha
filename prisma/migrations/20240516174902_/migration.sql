/*
  Warnings:

  - You are about to drop the column `finalDate` on the `tbl_recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tbl_fixedexpense` ADD COLUMN `finalDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `tbl_recipe` DROP COLUMN `finalDate`;
