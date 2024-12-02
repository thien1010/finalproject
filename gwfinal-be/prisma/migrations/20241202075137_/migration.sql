/*
  Warnings:

  - Made the column `like_date` on table `post_like` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `post_like` DROP FOREIGN KEY `post_like_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post_like` DROP FOREIGN KEY `post_like_ibfk_2`;

-- DropIndex
DROP INDEX `unique_like` ON `post_like`;

-- AlterTable
ALTER TABLE `post` MODIFY `created_at` DATE NULL;

-- AlterTable
ALTER TABLE `post_like` MODIFY `like_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `saved` (
    `saved_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,
    `saved_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `post_id`(`post_id`),
    UNIQUE INDEX `unique_saved`(`user_id`, `post_id`),
    PRIMARY KEY (`saved_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `saved` ADD CONSTRAINT `saved_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `saved` ADD CONSTRAINT `saved_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post`(`post_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `post` RENAME INDEX `fk_user_id` TO `user_id_create`;
