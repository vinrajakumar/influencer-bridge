import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { projectId, influencerId, price, message } = body;

        const proposal = await prisma.proposal.create({
            data: {
                projectId,
                influencerId,
                price,
                message,
                status: 'PENDING'
            }
        });

        return NextResponse.json(proposal);
    } catch (error) {
        console.error('Error creating proposal:', error);
        return NextResponse.json({ error: 'Failed to submit proposal' }, { status: 500 });
    }
}

// Get proposals for a specific Influencer
// or for a project if queried by Business owner?
// For now, let's keep it simple: GET proposals by influencerId query param
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const influencerId = searchParams.get('influencerId');
    const projectId = searchParams.get('projectId');

    if (influencerId) {
        const proposals = await prisma.proposal.findMany({
            where: { influencerId },
            include: { project: { include: { business: true } } },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(proposals);
    }

    if (projectId) {
        const proposals = await prisma.proposal.findMany({
            where: { projectId },
            include: { influencer: { include: { influencerProfile: true } } },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(proposals);
    }

    return NextResponse.json([]);
}
