/*
  Warnings:

  - You are about to drop the column `score` on the `QuizResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN "canonical" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "category" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "dcCreator" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "dcDescription" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "dcLanguage" TEXT DEFAULT 'de-DE';
ALTER TABLE "BlogPost" ADD COLUMN "dcTitle" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "keywords" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "ogDescription" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "ogImage" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "ogTitle" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "robots" TEXT DEFAULT 'index,follow';
ALTER TABLE "BlogPost" ADD COLUMN "schemaJson" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "seoDescription" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "seoTitle" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "twitterCard" TEXT DEFAULT 'summary_large_image';

-- AlterTable
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "canonical" TEXT,
    "robots" TEXT DEFAULT 'index,follow',
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "twitterCard" TEXT DEFAULT 'summary_large_image',
    "dcTitle" TEXT,
    "dcDescription" TEXT,
    "dcCreator" TEXT,
    "dcLanguage" TEXT DEFAULT 'de-DE',
    "schemaJson" TEXT
);

-- CreateTable
CREATE TABLE "ProductPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "priceDisplay" TEXT,
    "stripePriceId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "canonical" TEXT,
    "robots" TEXT DEFAULT 'index,follow',
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "twitterCard" TEXT DEFAULT 'summary_large_image',
    "dcTitle" TEXT,
    "dcDescription" TEXT,
    "dcCreator" TEXT,
    "dcLanguage" TEXT DEFAULT 'de-DE',
    "schemaJson" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lookbook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fileUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "kibbeType" TEXT,
    "freeForType" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Lookbook" ("createdAt", "description", "fileUrl", "id", "thumbnailUrl", "title", "updatedAt") SELECT "createdAt", "description", "fileUrl", "id", "thumbnailUrl", "title", "updatedAt" FROM "Lookbook";
DROP TABLE "Lookbook";
ALTER TABLE "new_Lookbook" RENAME TO "Lookbook";
CREATE TABLE "new_QuizResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "resultType" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    "scores" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuizResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_QuizResult" ("answers", "createdAt", "id", "resultType", "userId") SELECT "answers", "createdAt", "id", "resultType", "userId" FROM "QuizResult";
DROP TABLE "QuizResult";
ALTER TABLE "new_QuizResult" RENAME TO "QuizResult";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPage_slug_key" ON "ProductPage"("slug");
