/*
  Warnings:

  - You are about to drop the column `token` on the `google_users` table. All the data in the column will be lost.
  - Added the required column `access_token` to the `google_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `google_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `google_users` DROP COLUMN `token`,
    ADD COLUMN `access_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `refresh_token` VARCHAR(191) NOT NULL;
