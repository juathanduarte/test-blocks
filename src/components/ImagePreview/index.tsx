import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
	FiDownload,
	FiRotateCw,
	FiX,
	FiZoomIn,
	FiZoomOut,
} from "react-icons/fi";

interface IImagePreview {
	open: boolean;
	onClose: () => void;
	imageUrl: string;
	imageAlt?: string;
}

export default function ImagePreview({
	open,
	onClose,
	imageUrl,
	imageAlt,
}: IImagePreview) {
	const [zoom, setZoom] = useState<number>(1);
	const [rotation, setRotation] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = "";
			};
		}
		document.body.style.overflow = "";
	}, [open]);

	const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
	const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
	const handleRotate = () => setRotation((r) => (r + 90) % 360);
	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = imageUrl.split("/").pop() || "imagem.jpg";
		link.click();
	};
	const handleWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		if (e.deltaY < 0) handleZoomIn();
		else handleZoomOut();
	};
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") onClose();
	};

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.18 }}
					onClick={onClose}
					tabIndex={-1}
					onKeyDown={handleKeyDown}
				>
					<motion.div
						className="relative flex flex-col items-center justify-center max-w-5xl w-full mx-4 p-0"
						initial={{ scale: 0.96, y: 40, opacity: 0 }}
						animate={{ scale: 1, y: 0, opacity: 1 }}
						exit={{ scale: 0.96, y: 40, opacity: 0 }}
						transition={{ type: "spring", stiffness: 260, damping: 22 }}
						onClick={(e) => e.stopPropagation()}
						ref={containerRef}
					>
						<div className="flex flex-row gap-5 absolute top-[-60px] left-1/2 -translate-x-1/2 z-20">
							<button
								onClick={handleZoomIn}
								className="bg-black/60 shadow-lg text-white rounded-full p-3 hover:bg-purple-700/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
								title="Zoom in"
								type="button"
							>
								<FiZoomIn size={22} />
							</button>
							<button
								onClick={handleZoomOut}
								className="bg-black/60 shadow-lg text-white rounded-full p-3 hover:bg-purple-700/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
								title="Zoom out"
								type="button"
							>
								<FiZoomOut size={22} />
							</button>
							<button
								onClick={handleRotate}
								className="bg-black/60 shadow-lg text-white rounded-full p-3 hover:bg-purple-700/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
								title="Girar"
								type="button"
							>
								<FiRotateCw size={22} />
							</button>
							<button
								onClick={handleDownload}
								className="bg-black/60 shadow-lg text-white rounded-full p-3 hover:bg-purple-700/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
								title="Download"
								type="button"
							>
								<FiDownload size={22} />
							</button>
							<button
								className="bg-black/60 shadow-lg text-white rounded-full p-3 hover:bg-red-600/80 transition-colors duration-200 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-red-400 z-20"
								onClick={onClose}
								aria-label="Fechar visualização"
								type="button"
							>
								<FiX size={24} />
							</button>
						</div>
						<div className="flex items-center justify-center w-full h-[70vh] relative">
							<motion.img
								src={imageUrl}
								alt={imageAlt || "Imagem"}
								style={{
									transform: `scale(${zoom}) rotate(${rotation}deg)`,
									maxHeight: "100%",
									maxWidth: "100%",
									transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
									borderRadius: "1rem",
								}}
								draggable={false}
								className="select-none cursor-grab"
								onWheel={handleWheel}
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
