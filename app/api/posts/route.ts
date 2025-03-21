import { NextResponse } from "next/server";

import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export async function GET() {
    const posts = await prisma.post.findMany();

    return NextResponse.json(
        {
            success: true,
            message: 'list data posts',
            data:posts,
        },
        {
            status: 200,
        }
    );
}

export async function POST(request:any) {
    const { title, content} = await request.json()

    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
        }
    })
    return NextResponse.json(
        {
            success: true,
            message: 'post created successfully',
            data:post,
        },
        {
            status: 201,
        }
    )
}