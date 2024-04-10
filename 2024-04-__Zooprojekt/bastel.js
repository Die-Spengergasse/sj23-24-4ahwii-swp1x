const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query'] });

async function main() {
    const ma = await prisma.mitarbeiter.findFirst({
        where: {
            name: 'Dianne Kassulke',
        },
        include: {
            abteilungen: {
                include: {
                    _count: {
                        select: {
                            tiere: true,
                        },
                    },
                    zoo: {
                        select: {
                            land: true,
                            stadt: true,
                            id: true,
                        },
                    },
                },
            },
        },
    });
    console.log(JSON.stringify(ma, null, 2));
}
main().then((_) => {
    prisma.$disconnect();
});
