import { GetFormById } from "@/actions/api";
import { NextResponse } from "next/server";
export async function GET(request:any,response:any) {
  try {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get('formId')||'';
    const form= await GetFormById(formId);
    return NextResponse.json({ form });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
