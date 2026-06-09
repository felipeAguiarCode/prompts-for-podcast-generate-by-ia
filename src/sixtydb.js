// 60db Text-to-Speech (https://docs.60db.ai/api-reference/tts/text-to-speech)
//
// Turns the podcast script text into an audio file using the 60db TTS API.
// Zero dependencies — uses Node 18+ native fetch.
//
// Setup:
//   set SIXTYDB_API_KEY=your-api-key        (PowerShell: $env:SIXTYDB_API_KEY="your-api-key")
//
// Usage:
//   node src/sixtydb.js "Texto do roteiro aqui"
//   node src/sixtydb.js "Texto..." output/synthesized_audio.mp3
//   node src/sixtydb.js "Texto..." output/voz.mp3 <voice_id>

import { writeFile } from "node:fs/promises";

const API_URL = "https://api.60db.ai/tts-synthesize";

/**
 * Synthesize speech with 60db and return the raw audio bytes.
 * @param {string} text          Text to speak (max 5000 chars).
 * @param {object} [options]
 * @param {string} [options.apiKey]       60db API key (defaults to SIXTYDB_API_KEY env var).
 * @param {string} [options.voiceId]      Voice id (omit to use the account default).
 * @param {string} [options.outputFormat] mp3 | wav | ogg | flac (default mp3).
 * @param {number} [options.speed]        0.5–2.0 (default 1).
 * @param {number} [options.stability]    0–100, lower = more expressive (default 50).
 * @param {number} [options.similarity]   0–100 (default 75).
 * @param {boolean} [options.enhance]     Audio quality improvement (default true).
 * @returns {Promise<{audio: Buffer, sampleRate?: number, durationSeconds?: number, format: string}>}
 */
export async function synthesize(text, options = {}) {
  const apiKey = options.apiKey ?? process.env.SIXTYDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing 60db API key. Set SIXTYDB_API_KEY or pass { apiKey }.");
  }
  if (!text || !text.trim()) {
    throw new Error("`text` is required.");
  }
  if (text.length > 5000) {
    throw new Error(`Text is ${text.length} chars; 60db allows max 5000 per request.`);
  }

  const body = {
    text,
    output_format: options.outputFormat ?? "mp3",
  };
  if (options.voiceId) body.voice_id = options.voiceId;
  if (options.speed !== undefined) body.speed = options.speed;
  if (options.stability !== undefined) body.stability = options.stability;
  if (options.similarity !== undefined) body.similarity = options.similarity;
  if (options.enhance !== undefined) body.enhance = options.enhance;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`60db TTS failed (HTTP ${res.status}): ${raw}`);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`60db returned a non-JSON response: ${raw.slice(0, 300)}`);
  }

  if (!data.success || !data.audio_base64) {
    throw new Error(`60db TTS error: ${data.message ?? "no audio returned"}`);
  }

  return {
    audio: Buffer.from(data.audio_base64, "base64"),
    sampleRate: data.sample_rate,
    durationSeconds: data.duration_seconds,
    format: data.output_format ?? body.output_format,
  };
}

/**
 * Synthesize and write the audio straight to disk.
 * @returns {Promise<string>} the output path.
 */
export async function synthesizeToFile(text, outPath, options = {}) {
  const result = await synthesize(text, options);
  await writeFile(outPath, result.audio);
  return outPath;
}

// --- CLI ---------------------------------------------------------------
// Run only when invoked directly (not when imported).
const invokedDirectly =
  process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (invokedDirectly) {
  const [, , text, outPath = "output/synthesized_audio.mp3", voiceId] = process.argv;

  if (!text) {
    console.error('Usage: node src/sixtydb.js "texto do roteiro" [output.mp3] [voice_id]');
    process.exit(1);
  }

  try {
    const result = await synthesize(text, { voiceId });
    await writeFile(outPath, result.audio);
    const dur = result.durationSeconds ? ` (~${result.durationSeconds.toFixed(1)}s)` : "";
    console.log(`✅ Saved ${result.audio.length} bytes to ${outPath}${dur}`);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
}
