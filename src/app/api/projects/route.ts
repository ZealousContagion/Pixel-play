import { getAllProjects } from "@/lib/mdx"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await getAllProjects()
    const searchData = projects.map(p => ({
      slug: p.slug,
      title: p.meta.title
    }))
    return NextResponse.json(searchData)
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
