-- CreateTable
CREATE TABLE `users` (
    `uuid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `google_users` (
    `user_id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channels` (
    `channel_id` VARCHAR(191) NOT NULL,
    `channel_name` VARCHAR(191) NULL,
    `handle` VARCHAR(191) NULL,

    PRIMARY KEY (`channel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `streams` (
    `video_id` VARCHAR(191) NOT NULL,
    `channel_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `start_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`video_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `user_id` VARCHAR(191) NOT NULL,
    `channel_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `channel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_schedules` (
    `user_id` VARCHAR(191) NOT NULL,
    `video_id` VARCHAR(191) NOT NULL,
    `is_noticed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`user_id`, `video_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `google_users` ADD CONSTRAINT `google_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `streams` ADD CONSTRAINT `streams_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`channel_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`channel_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_schedules` ADD CONSTRAINT `user_schedules_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_schedules` ADD CONSTRAINT `user_schedules_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `streams`(`video_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
