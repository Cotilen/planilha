/*
  Warnings:

  - You are about to drop the column `recipeDate` on the `tbl_fixedrecipe` table. All the data in the column will be lost.
  - Added the required column `dateRecipe` to the `tbl_fixedRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_fixedrecipe` DROP COLUMN `recipeDate`,
    ADD COLUMN `dateRecipe` DATETIME(3) NOT NULL;
