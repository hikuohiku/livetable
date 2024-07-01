-- AlterTable
ALTER TABLE `channels` ADD COLUMN `thumbnail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `google_users` ADD COLUMN `thumbnail` VARCHAR(191) NULL,
    MODIFY `access_token` VARCHAR(2048) NULL;

-- AlterTable
ALTER TABLE `streams` ADD COLUMN `thumbnail` VARCHAR(191) NULL;
