import { NextResponse } from "next/server";
import { use } from "react";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request, context) {
    const params = await context.params
    const id = parseInt(params.id)

    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    })

    return NextResponse.json({
        success: true,
        message: 'detail data post',
        data: post,
    },
        {
            status: 200,
        }
    )
}

export async function PATCH(request, context) {
    const params = await context.params
    const id = parseInt(params.id)

    const { title, content } = await request.json();

    const post = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title: title,
            content: content,
            updatedAt: new Date(),
        }
    })

    return NextResponse.json({
        success: true,
        message: 'data post updated',
        data: post,
    },
        {
            status: 200,
        }
    )
}

export async function DELETE(request, context) {
    const params = await context.params
    const id = parseInt(params.id)

    await prisma.post.delete({
        where: {
            id,
        },
    })

    return NextResponse.json({
        success: true,
        message: 'data post deleted',
    },
        {
            status: 200,
        }
    )
}