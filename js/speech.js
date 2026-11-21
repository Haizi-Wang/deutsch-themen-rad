export function canRecord() {
  return Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

export function canRecognize() {
  return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}

export function speak(text, { rate = 1, onend } = {}) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const de = voices.find((v) => v.lang.startsWith("de"));
  if (de) u.voice = de;
  if (onend) u.onend = onend;
  window.speechSynthesis.speak(u);
}

export function stopSpeak() {
  window.speechSynthesis.cancel();
}

export function createRecognizer({ onresult, onend, onerror }) {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "de-DE";
  rec.continuous = true;
  rec.interimResults = true;
  rec.onresult = (ev) => {
    let interim = "";
    let finalText = "";
    for (let i = ev.resultIndex; i < ev.results.length; i += 1) {
      const chunk = ev.results[i][0].transcript;
      if (ev.results[i].isFinal) finalText += chunk;
      else interim += chunk;
    }
    onresult({ interim, finalText });
  };
  rec.onend = onend;
  rec.onerror = onerror;
  return rec;
}

export async function startRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ? "audio/webm;codecs=opus"
    : "audio/webm";
  const rec = new MediaRecorder(stream, { mimeType: mime });
  const chunks = [];
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };
  const done = new Promise((resolve) => {
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
      resolve(blob);
    };
  });
  rec.start();
  return {
    stop() {
      if (rec.state !== "inactive") rec.stop();
      return done;
    },
  };
}
