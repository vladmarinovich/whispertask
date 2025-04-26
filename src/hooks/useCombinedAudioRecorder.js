import { useState, useRef } from "react";

export function useCombinedAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();

      const micSource = audioContext.createMediaStreamSource(micStream);
      const screenSource = audioContext.createMediaStreamSource(screenStream);

      micSource.connect(destination);
      screenSource.connect(destination);

      const combinedStream = destination.stream;

      const mediaRecorder = new MediaRecorder(combinedStream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        console.log("🎧 URL generada:", url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error al iniciar la grabación híbrida:", error);
      alert("Error accediendo a micrófono o pantalla. Verifica los permisos.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
  };
}