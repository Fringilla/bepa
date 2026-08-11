@echo off
cls

call npx prisma generate
call npx prisma db push --force-reset
call npx prisma db seed
REM call npx prisma studio

npm run dev
