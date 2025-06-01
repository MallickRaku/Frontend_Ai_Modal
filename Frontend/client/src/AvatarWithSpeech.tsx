import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import classroom from "../src/assets/claasroom3.png"; // Make sure this path is correct

interface AvatarProps {
  isSpeaking: boolean;
  mouthOpen: number;
}

const Avatar: React.FC<AvatarProps> = ({ isSpeaking, mouthOpen }) => {
  const gltf = useGLTF("https://models.readyplayer.me/6803554d79474b7a6cc83604.glb");
  const avatarRef = useRef<THREE.Group>(null);
  const [headMesh, setHeadMesh] = useState<THREE.Mesh | null>(null);
  const [leftEye, setLeftEye] = useState<THREE.Mesh | null>(null);
  const [rightEye, setRightEye] = useState<THREE.Mesh | null>(null);

  useEffect(() => {
    gltf.scene.traverse((obj: THREE.Object3D) => {
      if (obj.name === "Wolf3D_Head" && (obj as THREE.Mesh).morphTargetDictionary) {
        setHeadMesh(obj as THREE.Mesh);
      }
      if (obj.name.includes("LeftEye")) setLeftEye(obj as THREE.Mesh);
      if (obj.name.includes("RightEye")) setRightEye(obj as THREE.Mesh);
    });

    gltf.scene.traverse((child: any) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Mouth animation
    if (headMesh?.morphTargetDictionary && headMesh.morphTargetInfluences) {
      const mouthIndex = headMesh.morphTargetDictionary["mouthOpen"];
      if (mouthIndex !== undefined) {
        const current = headMesh.morphTargetInfluences[mouthIndex] || 0;
        const target = isSpeaking ? mouthOpen : 0;
        headMesh.morphTargetInfluences[mouthIndex] = THREE.MathUtils.lerp(current, target, 0.2);
      }
    }

    // Blinking effect
    const blinkSpeed = 500;
    const blinkFrequency = 6;
    const blinkValue = Math.pow(Math.sin((t * Math.PI) / blinkFrequency), blinkSpeed);
    const blinkScale = 1 - blinkValue * 0.9;

    if (leftEye && rightEye) {
      leftEye.scale.y = Math.max(0.1, blinkScale);
      rightEye.scale.y = Math.max(0.1, blinkScale);
    }

    // Idle animation
    if (avatarRef.current && !isSpeaking) {
      avatarRef.current.position.y = Math.sin(t * 0.5) * 0.01 - 5.8;
      avatarRef.current.rotation.y = Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={avatarRef} position={[0, -5.8, 2]} scale={5.5}>
      <primitive object={gltf.scene} />
      {/* Soft circular shadow under avatar */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="black" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

const AvatarWithSpeech: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(0);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setMouthOpen(0);
    };

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const openAmount = Math.random() * 0.5 + 0.4;
        setMouthOpen(openAmount);
        setTimeout(() => setMouthOpen(0.1), 100 + Math.random() * 100);
      }
    };

    speechSynthesis.speak(utterance);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        backgroundImage: `url(${classroom})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas shadows camera={{ position: [0, 3, 10], near: 0.1, far: 1000 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Avatar isSpeaking={isSpeaking} mouthOpen={mouthOpen} />
        <OrbitControls />
      </Canvas>

      <button
        onClick={() =>
          speak(
            "Hi there! I'm your virtual assistant, here to help with whatever you need. Whether you're building something exciting or just exploring new ideas, I'm always ready to jump in. You can ask me questions, test animations like this one, or simply have a conversation. Isn't it fascinating how technology keeps evolving? Let's keep learning together—one step at a time."
          )
        }
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Speak
      </button>
    </div>
  );
};

export default AvatarWithSpeech;
