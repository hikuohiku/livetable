-- AlterTable
ALTER TABLE `google_users` MODIFY `refresh_token` VARCHAR(512) NULL;

-- AlterTable
ALTER TABLE `streams` ADD COLUMN `end_at` DATETIME(3) NULL,
    ADD COLUMN `live_status` VARCHAR(191) NULL,
    MODIFY `start_at` DATETIME(3) NULL;
