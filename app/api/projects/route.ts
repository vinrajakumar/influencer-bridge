import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, budget, businessId } = body;

        // Validate input logic here...

        const project = await prisma.project.create({
            data: {
                title,
                description,
                budget: parseFloat(budget),
                businessId: businessId, // In real app, get from session
                status: 'OPEN'
            }
        });

        // Also create an empty Escrow record linked to it? Or later when influencer selected.
        // Requirement: "receive payment through an escrow accound... business owner deposit the total fee"
        // Usually Escrow is created when Proposal accepted.

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const includeCount = searchParams.get("includeCount") === "true";

    const projects = await prisma.project.findMany({
        where: { status: 'OPEN' },
        include: {
            business: { select: { name: true } },
            _count: includeCount ? { select: { proposals: true } } : false
        },
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
}
