import {useRef} from "react";

const useDraggable = () => {
	const ref = useRef<HTMLDivElement>(null);
	const isDragging = useRef<boolean>(false);
	const startX = useRef<number>(0);
	const scrollLeft = useRef<number>(0);

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging.current = true;
		startX.current = e.pageX - (ref.current?.offsetLeft || 0);
		scrollLeft.current = ref.current?.scrollLeft || 0;
		ref.current?.classList.add("dragging");
	};

	const handleMouseLeave = () => {
		isDragging.current = false;
		ref.current?.classList.remove("dragging");
	};

	const handleMouseUp = () => {
		isDragging.current = false;
		ref.current?.classList.remove("dragging");
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging.current) return;
		e.preventDefault();
		const x = e.pageX - (ref.current?.offsetLeft || 0);
		const walk = (x - startX.current) * 2;
		if (ref.current) {
			ref.current.scrollLeft = scrollLeft.current - walk;
		}
	};

	return {
		ref,
		handleMouseDown,
		handleMouseLeave,
		handleMouseUp,
		handleMouseMove,
	};
};

export default useDraggable;
