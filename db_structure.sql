BEGIN;

-- NextAuth Schema --

CREATE TABLE "verification_token" (
  "identifier" TEXT NOT NULL,
  "expires" TIMESTAMPTZ NOT NULL,
  "token" TEXT NOT NULL,
 
  PRIMARY KEY ("identifier", "token")
);
 
CREATE TABLE "accounts" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "type" VARCHAR(255) NOT NULL,
  "provider" VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" BIGINT,
  "id_token" TEXT,
  "scope" TEXT,
  "session_state" TEXT,
  "token_type" TEXT
);
 
CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "expires" TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL
);
 
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "email" VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  "image" TEXT
);

-- End NextAuth Schema --


-- Conversant Schema --
CREATE TABLE "lesson_completions" (
  "id" SERIAL PRIMARY KEY,
  "user" int NOT NULL,
  "lesson" int NOT NULL,

  UNIQUE ("user",lesson)
);

CREATE TYPE LESSON_PART_TYPE AS ENUM('proceed', 'yesNo', 'endOfLesson', 'multipleChoice');

CREATE TABLE "lesson_parts" (
  "id" SERIAL PRIMARY KEY,
  "lesson" int NOT NULL,
  "content" text NOT NULL,
  "pause" int NOT NULL DEFAULT '0',
  "type" LESSON_PART_TYPE DEFAULT 'proceed',
  "proceedTo" int DEFAULT NULL,
  "onYes" int DEFAULT NULL,
  "onNo" int DEFAULT NULL,
  "onA" int DEFAULT NULL,
  "onB" int DEFAULT NULL,
  "onC" int DEFAULT NULL,
  "onD" int DEFAULT NULL,
  "onUndecided" int DEFAULT NULL
);

CREATE TABLE "lessons" (
  "id" SERIAL PRIMARY KEY,
  "topic" varchar(255) DEFAULT '',
  "title" varchar(255) NOT NULL,
  "description" text,
  "firstPart" int DEFAULT NULL,
  "nextLesson" int DEFAULT NULL
);


CREATE TABLE "topics" (
  "id" varchar(255) NOT NULL PRIMARY KEY,
  "label" varchar(255) NOT NULL,
  "description" text,
  "firstLesson" int DEFAULT NULL
);

ALTER TABLE "lesson_completions" ADD FOREIGN KEY ("user") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_completions" ADD FOREIGN KEY ("lesson") REFERENCES "lessons" ("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE;

ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("lesson") REFERENCES "lessons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("proceedTo") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("onYes") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("onNo") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("onA") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("onB") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("onC") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("onD") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lesson_parts" ADD FOREIGN KEY ("onUndecided") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;

ALTER TABLE "lessons" ADD FOREIGN KEY ("topic") REFERENCES "topics" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lessons" ADD FOREIGN KEY ("firstPart") REFERENCES "lesson_parts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;
ALTER TABLE "lessons" ADD FOREIGN KEY ("nextLesson") REFERENCES "lessons" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;

ALTER TABLE "topics" ADD FOREIGN KEY ("firstLesson") REFERENCES "lessons" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE;

-- End Conversant Schema --

COMMIT;
