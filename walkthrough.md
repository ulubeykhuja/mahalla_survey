# Mahalla Loyalty System - Walkthrough

Tizim muvaffaqiyatli yaratildi! Bu yerda uni qanday ishlatish bo'yicha qo'llanma.

## 1. Ishga tushirish

Terminalda quyidagi buyruqni bering:

```bash
cd mahalla_bot
npm run dev
```

Keyin brauzerda oching:
- **Foydalanuvchi (Mini App):** [http://localhost:3000](http://localhost:3000)
- **Admin Panel:** [http://localhost:3000/admin/users](http://localhost:3000/admin/users)

## 2. Admin Panel Imkoniyatlari

### Foydalanuvchilarni Boshqarish (`/admin/users`)
- Ro'yxatdan o'tgan barcha foydalanuvchilarni ko'rish.
- **Ball berish:** Har bir foydalanuvchi yonidagi tugma orqali qo'lda 5 ball berish mumkin (Kobo'da tekshirgandan keyin).

### So'rovnomalar (`/admin/surveys`)
- Yangi KoboToolbox havolasini qo'shish.
- Sarlavha va Link kiritiladi.
- Aktiv/Deaktiv qilish mumkin.

### Sozlamalar (`/admin/settings`)
- Ro'yxatdan o'tish formasiga yangi savollar qo'shish (masalan, "Yashash manzili", "Yoshi").

## 3. Foydalanuvchi (Mini App) Oqimi

1. **Kirish:** Birinchi marta kirganda "Ro'yxatdan o'tish" oynasi chiqadi.
2. **Ro'yxatdan o'tish:** Ism, Telefon va Admin qo'shgan boshqa savollarga javob beradi.
   - **Mukofot:** Avtomatik 5 ball beriladi.
3. **Bosh sahifa:**
   - **Balans:** Joriy ball va so'mdagi qiymati.
   - **Progress:** 50 ballgacha qancha qolgani.
   - **So'rovnomalar:** Aktiv Kobo linklar ro'yxati.
4. **Pul yechish:** 50 ball bo'lganda "Pulni yechib olish" tugmasi chiqadi.

## 4. Keyingi qadamlar (Deploy)
Loyiha Vercel yoki o'zingizning serveringizga joylashga tayyor.
- Database: Hozir SQLite ishlatilmoqda. Serverga qo'yganda Postgres (masalan, Neon yoki Supabase) ga o'tkazish tavsiya etiladi.
