const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Bazani tozalash boshlandi...');

    // Delete all transactions first (because of foreign key)
    const deletedTransactions = await prisma.transaction.deleteMany({});
    console.log(`✅ ${deletedTransactions.count} ta tranzaksiya o'chirildi`);

    // Delete all users
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`✅ ${deletedUsers.count} ta foydalanuvchi o'chirildi`);

    // Delete all registration fields
    const deletedFields = await prisma.registrationField.deleteMany({});
    console.log(`✅ ${deletedFields.count} ta ro'yxatdan o'tish maydoni o'chirildi`);

    console.log('\n🎉 Baza tozalandi! So\'rovnomalar saqlanib qoldi.');
}

main()
    .catch((e) => {
        console.error('Xatolik:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
