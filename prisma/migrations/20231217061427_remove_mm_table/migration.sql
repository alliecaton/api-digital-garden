/*
  Warnings:

  - You are about to drop the `BookmarkTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookmarkTags" DROP CONSTRAINT "BookmarkTags_bookmarkId_fkey";

-- DropForeignKey
ALTER TABLE "BookmarkTags" DROP CONSTRAINT "BookmarkTags_tagId_fkey";

-- DropTable
DROP TABLE "BookmarkTags";

-- CreateTable
CREATE TABLE "_BookmarksToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookmarksToTags_AB_unique" ON "_BookmarksToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_BookmarksToTags_B_index" ON "_BookmarksToTags"("B");

-- AddForeignKey
ALTER TABLE "_BookmarksToTags" ADD CONSTRAINT "_BookmarksToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Bookmarks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarksToTags" ADD CONSTRAINT "_BookmarksToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
