CREATE TABLE "ahh" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "province" TEXT NOT NULL,
  "gender" TEXT NOT NULL CHECK(gender IN ('man', 'woman')),
  "age" REAL NOT NULL
);
