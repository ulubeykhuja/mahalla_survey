const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const survey = await prisma.surveyLink.create({
        data: {
            title: "Birinchi so'rovnoma",
            description: "Mahalla infratuzilmasi bo'yicha fikringizni bildiring.",
            koboUrl: "https://ee.kobotoolbox.org/x/svH5ywi2",
            pointsReward: 5,
            isActive: true,
        },
    });
    console.log('Survey added:', survey);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
