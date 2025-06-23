type Props = Readonly<{
	className: string;
}>;

export function ArrowLeft(props: Props) {
	return (
		<svg
			className={props.className}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>arrow left</title>
			<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
