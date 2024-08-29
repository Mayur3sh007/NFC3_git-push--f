import { pipeline, Pipeline } from "@xenova/transformers";

// Define the type for the progress callback if it's used elsewhere
type ProgressCallback = (progress: number) => void;

const P = () => class PipelineSingleton {
    // Define static properties with their types
    static task: any = 'text-classification';
    static model: string = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static instance: any = null;

    // Method to get the pipeline instance with type safety
    static async getInstance(progress_callback: any | null = null): Promise<Pipeline> {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
};

// Declare the variable with type safety
let PipelineSingleton: ReturnType<typeof P>;

// Check the environment and assign the appropriate singleton instance
if (process.env.NODE_ENV !== 'production') {
    if (!(global as any).PipelineSingleton) {
        (global as any).PipelineSingleton = P();
    }
    PipelineSingleton = (global as any).PipelineSingleton;
} else {
    PipelineSingleton = P();
}

// Export the singleton with type safety
export default PipelineSingleton;