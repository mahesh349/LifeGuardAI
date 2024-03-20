import soundfile
import os


class Stt:
    def __init__(self, model_size, model_type):
        self.processor, self.model = Stt.load_whisper_model(
            model_size, model_type)

    @staticmethod
    def load_whisper_model(model_size: str, model_type: str):
        """ Selects a Openai's whisper model (ref: https://huggingface.co/models?search=openai/whisper)

        Parameters
        ----------
        model_size : str
            Select the model size according to RAM on your computer

            Size of the models = {
            'small' : '967 MB'
            'medium' : '3.06 GB'
            }

        model_type : str
            Select if you want English-only or Multilingual model
            valid inputs:
            ''      : For Multilingual
            '.en'   : For English-only

        Returns
        -------
        Tuple
            a tuple of WhisperProcessor and WhisperForConditionalGeneration
        """

        valid_model_size = ('small', 'medium')
        if model_size not in valid_model_size:
            raise ValueError(f"model_size must be one of {valid_model_size}.")

        valid_model_type = ('.en', '')
        if model_type not in valid_model_type:
            raise ValueError(f"model_type must be one of {valid_model_type}.")

        from transformers import WhisperProcessor, WhisperForConditionalGeneration

        processor = WhisperProcessor.from_pretrained(
            f"openai/whisper-{model_size}{model_type}")
        model = WhisperForConditionalGeneration.from_pretrained(
            f"openai/whisper-{model_size}{model_type}")

        return processor, model

    def _read_wav_file(self, path: str):
        """ Reads a .wav file from path at 16000 sample rate

        Parameters
        ----------
        path : str
            Path of the audio file 

        """
        if os.path.isfile(path):
            self.wavfile, self.samplerate = soundfile.read(path)
        else:
            raise SystemError(f'{path} is not in directory')

    def convert_audio_file_to_text(self, path: str):
        """ Outputs transcribed text of the audio file provided

        Parameters
        ----------
        path : str
            Path of the audio file 
        Returns
        -------
        List
            A list of string of transcribed audio file provided
        """
        self._read_wav_file(path)

        if len(self.wavfile) > 0:
            input_features = self.processor(
                self.wavfile, sampling_rate=self.samplerate, return_tensors="pt").input_features
            predicted_ids = self.model.generate(input_features)
            transcription = self.processor.batch_decode(
                predicted_ids, skip_special_tokens=True)
            return transcription
        return ['']


if __name__ == "__main__":
    # audio_file = r"D:\GitHub\team-23-agile-avengers\Personal Assistant\converted_to_16000.wav"
    audio_file = r"test v1.wav"
    model = Stt('small', '.en')
    op = model.convert_audio_file_to_text(audio_file)
    print(op[0])
