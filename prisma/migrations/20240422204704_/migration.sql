/*
  Warnings:

  - You are about to drop the column `dateRecipe` on the `tbl_fixedrecipe` table. All the data in the column will be lost.
  - Added the required column `recipeDate` to the `tbl_fixedRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_fixedrecipe` DROP COLUMN `dateRecipe`,
    ADD COLUMN `finalDate` DATETIME(3) NULL,
    ADD COLUMN `recipeDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `tbl_recipe` ADD COLUMN `finalDate` DATETIME(3) NULL;
