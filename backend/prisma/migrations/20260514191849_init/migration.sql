-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ScoreStrategy" AS ENUM ('LATEST', 'MAX', 'MIN', 'CUMULATIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "currentScore" INTEGER NOT NULL DEFAULT 0,
    "bestScore" INTEGER NOT NULL DEFAULT 0,
    "worstScore" INTEGER,
    "lastScore" INTEGER NOT NULL DEFAULT 0,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreSubmission" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "strategyUsed" "ScoreStrategy" NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "clicksPerSecond" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSettings" (
    "id" UUID NOT NULL,
    "durationSeconds" INTEGER NOT NULL DEFAULT 10,
    "activeStrategy" "ScoreStrategy" NOT NULL DEFAULT 'LATEST',
    "maxClicksPerSecond" INTEGER NOT NULL DEFAULT 15,
    "isGameEnabled" BOOLEAN NOT NULL DEFAULT true,
    "updatedByAdminId" UUID,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_userId_key" ON "LeaderboardEntry"("userId");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_currentScore_idx" ON "LeaderboardEntry"("currentScore");

-- CreateIndex
CREATE INDEX "ScoreSubmission_userId_createdAt_idx" ON "ScoreSubmission"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreSubmission" ADD CONSTRAINT "ScoreSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSettings" ADD CONSTRAINT "GameSettings_updatedByAdminId_fkey" FOREIGN KEY ("updatedByAdminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
