import soundfile
import librosa
import numpy as np


class ConvertAudio:
    def __init__(self, file_path: str):
        self.wavfile, self.samplerate = soundfile.read(file_path)

    def change_sampling_rate(self, target_sample_rate: int, file_name: str):
        self.target_sample_rate = target_sample_rate
        self.changed_sr = librosa.resample(
            self.wavfile, orig_sr=self.samplerate, target_sr=self.target_sample_rate)
        soundfile.write(f"{file_name}.wav", self.changed_sr,
                        self.target_sample_rate, subtype='PCM_16')


if __name__ == "__main__":
    audio_file = r"D:\GitHub\team-23-agile-avengers\Personal Assistant\output.wav"
    audio = ConvertAudio(audio_file)
    audio.change_sampling_rate(16000, 'converted_to_16000')
