-- CreateTable
CREATE TABLE `CategoriaDespesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NOT NULL,

    UNIQUE INDEX `CategoriaDespesa_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Despesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NOT NULL,
    `valor` INTEGER NOT NULL,
    `dataDespesa` DATE NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    UNIQUE INDEX `Despesa_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Receita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `valor` INTEGER NOT NULL,
    `dataReceita` DATE NOT NULL,

    UNIQUE INDEX `Receita_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `CategoriaDespesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
