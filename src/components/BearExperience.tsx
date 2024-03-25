import { useGLTF, useAnimations, meshBounds } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame, ObjectMap } from "@react-three/fiber";
import * as THREE from "three";
import { type GLTF } from "three-stdlib";

interface BearExperienceProps {
	floor: React.RefObject<THREE.Mesh | null>;
	scale: number;
}

export const BearExperience: React.FC<BearExperienceProps> = (props) => {
	const { floor } = props;
	const group = useRef<THREE.Group>(null);
	const targetPosition = useRef<THREE.Vector3>();
	const { nodes, materials }: GLTF & ObjectMap = useGLTF("bear/Bear.gltf");
	const animations: GLTF & ObjectMap = useGLTF("bear/Bear_Animations.gltf");
	const { actions } = useAnimations(animations.animations, group);
	const speed = 0.01;

	useEffect(() => {
		if (actions["Idle"]) {
			actions["Idle"].setEffectiveTimeScale(0.3); // 30% of the original speed
			actions["Idle"].play();
		}

		const interval = setInterval(setRandomTargetPosition, 5000);

		return () => clearInterval(interval);
	});

	useFrame(() => {
		if (group.current && targetPosition.current) {
			const direction = targetPosition.current.clone().sub(group.current.position).normalize();

			const distance = targetPosition.current.distanceTo(group.current.position);

			if (distance > speed) {
				animateBearWalk();
				group.current.position.add(direction.multiplyScalar(speed));
			} else {
				animateBearIdle();
			}
		}
	});

	const setRandomTargetPosition = (): void => {
		if (floor.current) {
			const geometry = floor.current.geometry;
			const positionAttribute = geometry.getAttribute("position");
			const positions = positionAttribute.array;

			let minX = Infinity,
				maxX = -Infinity;
			let minY = Infinity,
				maxY = -Infinity;
			let minZ = Infinity,
				maxZ = -Infinity;

			for (let i = 0; i < positions.length; i += 3) {
				const x = positions[i];
				const y = positions[i + 1];
				const z = positions[i + 2];

				minX = Math.min(minX, x);
				maxX = Math.max(maxX, x);
				minY = Math.min(minY, y);
				maxY = Math.max(maxY, y);
				minZ = Math.min(minZ, z);
				maxZ = Math.max(maxZ, z);
			}

			const width = maxX - minX;
			const height = maxY - minY;
			// const depth = maxZ - minZ;

			targetPosition.current = new THREE.Vector3(
				Math.random() * width - (width / 2) * 0.5,
				0,
				Math.random() * height - (height / 2) * 0.5
			);
		}
	};
	const animateBearIdle = (): void => {
		if (actions["Walk"] && actions["Clicked"] && actions["Idle"]) {
			actions["Walk"].stop();
			actions["Clicked"].stop();
			actions["Idle"].setEffectiveTimeScale(0.3);
			actions["Idle"].play();
		}
	};
	const animateBearWalk = (): void => {
		if (actions["Idle"] && actions["Clicked"] && actions["Walk"]) {
			actions["Idle"].stop();
			actions["Clicked"].stop();
			actions["Walk"].setEffectiveTimeScale(0.5);
			actions["Walk"].play();
		}
	};
	const animateBearClicked = (): void => {
		if (actions["Walk"] && actions["Idle"] && actions["Clicked"]) {
			actions["Walk"].stop();
			actions["Idle"].stop();
			actions["Clicked"].setEffectiveTimeScale(0.6);
			actions["Clicked"].play();
		}
	};
	const handleHoverEnter = (): void => {
		document.body.style.cursor = "pointer";
	};
	const handleHoverLeaves = (): void => {
		document.body.style.cursor = "default";
	};
	const handleBearClicked = (): void => {
		animateBearClicked();
	};

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			onClick={handleBearClicked}
			onPointerEnter={handleHoverEnter}
			onPointerLeave={handleHoverLeaves}
			raycast={meshBounds}
		>
			{["Bear_LOD0", "Bear_LOD1", "Bear_LOD2", "Bear_LOD3"].map((name) => {
				const node = nodes[name];
				if (node instanceof THREE.SkinnedMesh) {
					return (
						<skinnedMesh
							key={name}
							castShadow
							geometry={node.geometry}
							material={materials.Mat_Bear}
							skeleton={node.skeleton}
						/>
					);
				}
			})}
			<primitive object={nodes.root} />
		</group>
	);
};

useGLTF.preload("/Bear.gltf");
