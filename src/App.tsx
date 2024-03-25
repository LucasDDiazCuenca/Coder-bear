import HelloWorld from "./components/HelloWorld";
import ScenarioExperience from "./components/ScenarioExperience";
import { Canvas } from "@react-three/fiber";

const App = (): React.ReactElement => {
	return (
		<>
			<div className="w-screen h-screen text-center text-3xl">
				<div className="h-5/6">
					<Canvas
						dpr={[1, 2]}
						shadows
						orthographic
						camera={{
							//fov: 80,
							zoom: 90,
							near: 0.1,
							far: 200,
							position: [8, 4, 8],
						}}
					>
						<ScenarioExperience />
					</Canvas>
				</div>
				<HelloWorld />
			</div>
		</>
	);
};

export default App;
