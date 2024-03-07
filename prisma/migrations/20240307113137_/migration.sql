/*
  Warnings:

  - Added the required column `id_usuario` to the `Despesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `Receita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesa` ADD COLUMN `id_usuario` INTEGER NOT NULL,
    MODIFY `dataDespesa` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `receita` ADD COLUMN `id_usuario` INTEGER NOT NULL,
    MODIFY `dataReceita` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `Usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receita` ADD CONSTRAINT `Receita_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
