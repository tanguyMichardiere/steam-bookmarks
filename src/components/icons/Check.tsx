type Props = Readonly<{
	className: string;
}>;

export function Check(props: Props) {
	return (
		<svg
			className={props.className}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>check</title>
			<path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
