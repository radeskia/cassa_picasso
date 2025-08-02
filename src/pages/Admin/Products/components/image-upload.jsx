import { useRef } from "react";
import { handleFetch } from "../../../../lib/handleFetch";
import { queryClient } from "../../../../App";
import { toast } from "sonner";

export const ImageUpload = ({ productId, productSlug }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("images", file);

        try {
            await handleFetch({
                url: `image/add`,
                method: "POST",
                body: formData,
            });

            await queryClient.invalidateQueries({
                queryKey: [`product-details-${productSlug}`],
            });
            toast.success("Image uploaded!");
        } catch {
            toast.error("Image upload failed!");
        }
    };

    return (
        <div className="relative flex items-center justify-center bg-slate-700/30 rounded-lg p-6 w-[200px]">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                className="btn btn-ghost font-semibold w-full"
                type="button"
                onClick={handleButtonClick}
            >
                Add Image
            </button>
        </div>
    );
};
