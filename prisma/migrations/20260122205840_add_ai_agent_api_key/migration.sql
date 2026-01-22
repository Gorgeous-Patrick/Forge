-- CreateTable
CREATE TABLE "AIAgentApiKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AIAgentApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "AIAgentApiKey_userId_idx" ON "AIAgentApiKey"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AIAgentApiKey_userId_provider_key" ON "AIAgentApiKey"("userId", "provider");
