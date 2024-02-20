-- AlterTable
ALTER TABLE `google_users` MODIFY `refresh_token` VARCHAR(512) NOT NULL,
    MODIFY `access_token` VARCHAR(2048) NOT NULL;
