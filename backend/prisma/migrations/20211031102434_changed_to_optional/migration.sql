-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_modules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "creator_id" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_modules" ("creator_id", "description", "id", "name") SELECT "creator_id", "description", "id", "name" FROM "modules";
DROP TABLE "modules";
ALTER TABLE "new_modules" RENAME TO "modules";
CREATE TABLE "new_classes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "begins_at" TEXT,
    "creator_id" TEXT NOT NULL,
    "description" TEXT,
    "module_id" TEXT NOT NULL,
    CONSTRAINT "classes_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_classes" ("begins_at", "creator_id", "description", "id", "module_id", "name") SELECT "begins_at", "creator_id", "description", "id", "module_id", "name" FROM "classes";
DROP TABLE "classes";
ALTER TABLE "new_classes" RENAME TO "classes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
