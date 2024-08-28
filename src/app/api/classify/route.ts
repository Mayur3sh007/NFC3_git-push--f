import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import PipelineSingleton from './pipeline';

// Define the type for the classification result
type ClassificationResult = {
    label: string;
    score: number;
}[];

// Define the GET request handler with type safety
export async function GET(request: NextRequest): Promise<NextResponse> {
    const text = request.nextUrl.searchParams.get('text');

    if (!text) {
        return NextResponse.json({
            error: 'Missing text parameter',
        }, { status: 400 });
    }

    // Get the classification pipeline. When called for the first time,
    // this will load the pipeline and cache it for future use.
    const classifier = await PipelineSingleton.getInstance();

    // Perform the classification with type safety
    const result: ClassificationResult = await classifier(text);

    return NextResponse.json(result);
}