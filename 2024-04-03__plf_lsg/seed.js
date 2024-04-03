const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function main() {
    await prisma.abteilung.deleteMany();
    await prisma.zoo.deleteMany();
    await prisma.tier.deleteMany();
    await prisma.mitarbeiter.deleteMany();
    // ZOOs erzeugen
    for (let i = 0; i < 5; i++) {
        await prisma.zoo.create({
            data: {
                land: faker.location.country(),
                stadt: faker.location.city(),
                adresse: faker.location.streetAddress(),
                baujahr: faker.date.past(),
            },
        });
    }
    const zooIds = (await prisma.zoo.findMany({ select: { id: true } })).map(
        (_) => _.id
    );

    function getRndZooid() {
        return zooIds[Math.floor(Math.random() * zooIds.length)];
    }

    // ABT erzeugen
    for (let i = 0; i < zooIds.length; i++) {
        // zooId[i] == zooId
        const abtNamen = new Set();
        Array.from(new Array(100)).forEach((_) => {
            abtNamen.add(faker.animal.type());
        });
        abtArray = Array.from(abtNamen);
        const count = faker.number.int({ min: 2, max: 7 });
        for (let j = 0; j < count; j++) {
            await prisma.abteilung.create({
                data: {
                    zooId: zooIds[i],
                    name: abtArray.pop(),
                },
            });
        }
    }
    function getDepartment() {
        let tracker = 0;
        for (let i = 0; i < zooIds.length; i++) {
            let abc = Math.floor(Math.random() * 7);
            tracker = tracker + abc;
        }
        return tracker;
    }

    function getAbteilungid() {
        let len = Math.floor(Math.random() * AbteilungIds.length);
        let abt = zooIds[len];
        return abt;
    }

    const AbteilungIds = (
        await prisma.Abteilung.findMany({ select: { cuid: true } })
    ).map((_) => _.id);
    for (let i = 0; i < Math.floor(Math.random() * 21); i++) {
        const tier = {
            Art: faker.animal.type(),
            Name: faker.person.firstName(),
            Abteilung: getAbteilungid(),
        };
        const prismaTier = await prisma.Tier.create({
            data: tier,
        });
    }
    const TierIds = (
        await prisma.Tier.findMany({ select: { cuid: true } })
    ).map((_) => _.id);

    for (let i = 0; i < 100; i++) {
        const aaaaaa = {
            Name: faker.person.fullName(),
        };
        const prismaMitarbeiter = await prisma.Mitarbeiter.create({
            data: aaaaaa,
        });
    }

    const MitarbeiterIds = (
        await prisma.Mitarbeiter.findMany({ select: { cuid: true } })
    ).map((_) => _.id);

    console.log(zooIds.length + ' Zoos created');
    console.log(AbteilungIds.length + ' Abteilungen created');
    console.log(TierIds.length + ' Tiere created');
    console.log(MitarbeiterIds.length + ' Mitarbeiter created');
}

main()
    .then(() => {
        prisma.$disconnect();
        console.log('done');
    })
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
    });
