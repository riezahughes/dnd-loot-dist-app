# Migration `20201112134703-party-field-rename`

This migration has been generated by DESKTOP-VN1U2BM\Dan at 11/12/2020, 1:47:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201112122753-adding-relations..20201112134703-party-field-rename
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
@@ -14,9 +14,9 @@
   id          Int      @default(autoincrement()) @id
   createdAt   DateTime @default(now())
   party_name  String?
   players     Player[]
-  loot        LootPool[]
+  lootpools   LootPool[]
 }
 model Player {
   id           Int @default(autoincrement()) @id
```

