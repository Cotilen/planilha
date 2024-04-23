/*
  Warnings:

  - Added the required column `dateExpense` to the `tbl_fixedExpense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateRecipe` to the `tbl_fixedRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_fixedexpense` ADD COLUMN `dateExpense` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `tbl_fixedrecipe` ADD COLUMN `dateRecipe` DATETIME(3) NOT NULL;
