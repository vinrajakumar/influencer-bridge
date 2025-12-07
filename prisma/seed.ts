import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create Business User
    const business = await prisma.user.upsert({
        where: { email: 'business@acme.com' },
        update: {},
        create: {
            id: 'biz-123',
            email: 'business@acme.com',
            name: 'Acme Corp',
            role: 'BUSINESS',
            avatarUrl: 'https://ui-avatars.com/api/?name=Acme+Corp',
        },
    })

    // Create Influencer User
    const influencer = await prisma.user.upsert({
        where: { email: 'alice@social.com' },
        update: {},
        create: {
            id: 'inf-456',
            email: 'alice@social.com',
            name: 'Alice Influencer',
            role: 'INFLUENCER',
            avatarUrl: 'https://ui-avatars.com/api/?name=Alice+Inspire',
            influencerProfile: {
                create: {
                    bio: "Lifestyle and Tech enthusiast.",
                    followers: 150000,
                    instagram: "@alice.inst",
                    youtube: "AliceTech"
                }
            }
        },
    })

    console.log({ business, influencer })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
