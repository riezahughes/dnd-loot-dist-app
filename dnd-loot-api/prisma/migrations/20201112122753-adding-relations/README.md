# Migration `20201112122753-adding-relations`

This migration has been generated by DESKTOP-VN1U2BM\Dan at 11/12/2020, 12:27:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Item" DROP CONSTRAINT "Item_lootPoolId_fkey"

ALTER TABLE "LootPool" DROP CONSTRAINT "LootPool_partyId_fkey"

ALTER TABLE "Player" DROP CONSTRAINT "Player_partyId_fkey"

ALTER TABLE "Item" DROP COLUMN "lootPoolId",
ADD COLUMN     "lootpool_id" INTEGER NOT NULL

ALTER TABLE "LootPool" DROP COLUMN "partyId",
ADD COLUMN     "party_id" INTEGER NOT NULL

ALTER TABLE "Player" DROP COLUMN "partyId",
ADD COLUMN     "party_id" INTEGER NOT NULL

ALTER TABLE "Item" ADD FOREIGN KEY("lootpool_id")REFERENCES "LootPool"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "LootPool" ADD FOREIGN KEY("party_id")REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Player" ADD FOREIGN KEY("party_id")REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201112022238-idchangeagain..20201112122753-adding-relations
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -22,21 +22,24 @@
   id           Int @default(autoincrement()) @id
   createdAt    DateTime @default(now())
   player_name  String?
   discord_id   String?
-  party        Party?
+  party        Party @relation(fields: [party_id], references: [id])
+  party_id     Int
 }
 model LootPool {
   id             Int      @default(autoincrement()) @id
   createdAt      DateTime @default(now())
   lootpool_name  String?
   items          Item[]
-  party          Party?
+  party          Party @relation(fields: [party_id], references: [id])
+  party_id       Int
 }
 model Item {
   id          Int      @default(autoincrement()) @id
   createdAt      DateTime @default(now())
   item_name   String?
   claimed_by  String
-  lootPool    LootPool?
+  lootpool       LootPool @relation(fields: [lootpool_id], references: [id])
+  lootpool_id    Int
 }
```


