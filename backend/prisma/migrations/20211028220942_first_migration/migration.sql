-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "begins_at" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "description" TEXT,
    "module_id" TEXT NOT NULL,
    CONSTRAINT "classes_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
