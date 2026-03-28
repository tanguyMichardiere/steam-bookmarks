import { LoadingSpinner } from "../../../components/loading-spinner";

export default function Loading() {
	return (
		<div className="hero h-full">
			<div className="hero-content text-center">
				<LoadingSpinner />
			</div>
		</div>
	);
}
