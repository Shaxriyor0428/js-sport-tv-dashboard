import { Block } from "@/components/modal/news-step-modal/NewsModal";
import { INewsData } from "@/types";
export function replaceImageUrls(element: INewsData) {
    if (!element.content || !element.content_images) return;

    let blocks;
    try {
        blocks = JSON.parse(element.content);
        console.log(blocks);
    } catch (error) {
        console.error("Invalid JSON in fullDescription", error);
        return;
    }

    if (!blocks.blocks || !Array.isArray(blocks.blocks)) return;

    const imageUrls = element.content_images.map((img: string) => img);
    // const api = `http://localhost:4000/`;
    const api = `https://api.vollebol.uz/`;
    let imageIndex = 0;

    blocks.blocks.forEach((block: Block) => {
        if (block.type === "image" && block.data.file.url.startsWith("blob:")) {
            if (imageUrls[imageIndex]) {
                block.data.file.url = `${api}${imageUrls[imageIndex]}`;
                imageIndex++;
            }
        }
    });
    return (element.content = JSON.stringify(blocks));
}