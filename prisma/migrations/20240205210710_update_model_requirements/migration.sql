/*
  Warnings:

  - Made the column `title` on table `Bookmarks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `Bookmarks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Tags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bookmarks" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "url" SET NOT NULL;

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tags" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
