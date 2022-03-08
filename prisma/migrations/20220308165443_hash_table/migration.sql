-- CreateTable
CREATE TABLE "Hash" (
    "id" SERIAL NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Hash_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hash" ADD CONSTRAINT "Hash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
