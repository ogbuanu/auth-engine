-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `business_name` VARCHAR(191) NULL,
    `legal_business_name` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `account_type` ENUM('BUSINESS', 'INDIVIDUAL') NOT NULL DEFAULT 'INDIVIDUAL',
    `account_mode` ENUM('GUEST', 'REGISTERED') NOT NULL DEFAULT 'GUEST',
    `logo` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TokenVerification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `token_for` ENUM('EMAIL_VERIFICATION', 'PASSWORD_RESET') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
