/*
  Warnings:

  - You are about to drop the `categoriadespesa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `despesa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `receita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `despesa` DROP FOREIGN KEY `Despesa_id_categoria_fkey`;

-- DropForeignKey
ALTER TABLE `despesa` DROP FOREIGN KEY `Despesa_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `receita` DROP FOREIGN KEY `Receita_id_usuario_fkey`;

-- DropTable
DROP TABLE `categoriadespesa`;

-- DropTable
DROP TABLE `despesa`;

-- DropTable
DROP TABLE `receita`;

-- DropTable
DROP TABLE `usuario`;

-- CreateTable
CREATE TABLE `tbl_categoryExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `tbl_categoryExpense_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_expense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `value` INTEGER NOT NULL,
    `dateExpense` DATETIME(3) NOT NULL,
    `id_category` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_expense_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_recipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `value` INTEGER NOT NULL,
    `dateRecipe` DATETIME(3) NOT NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_recipe_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` TEXT NOT NULL,

    UNIQUE INDEX `tbl_users_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_expense` ADD CONSTRAINT `tbl_expense_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `tbl_categoryExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_expense` ADD CONSTRAINT `tbl_expense_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tbl_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_recipe` ADD CONSTRAINT `tbl_recipe_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tbl_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
