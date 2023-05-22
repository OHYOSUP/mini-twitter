/*
  Warnings:

  - Added the required column `userId` to the `Twitt` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Twitt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "twitt" TEXT NOT NULL,
    CONSTRAINT "Twitt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Twitt" ("createdAt", "id", "title", "twitt") SELECT "createdAt", "id", "title", "twitt" FROM "Twitt";
DROP TABLE "Twitt";
ALTER TABLE "new_Twitt" RENAME TO "Twitt";
CREATE INDEX "Twitt_userId_idx" ON "Twitt"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
