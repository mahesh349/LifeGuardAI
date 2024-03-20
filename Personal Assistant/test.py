import unittest
from unittest.mock import patch, MagicMock

from speach_to_text import Stt
from text_to_speach import Tts

from convert_audio import ConvertAudio

tts_model = Tts()
stt_model = Stt('small', '.en')


def test_text_to_audio(text):
    tts_model.convert_text_to_audio(text, 'test_audio')


def test_audio_to_text():
    audio_file = 'test_audio.wav'
    audio = ConvertAudio(audio_file)
    audio.change_sampling_rate(16000, 'test_audio')
    output = stt_model.convert_audio_file_to_text(audio_file)
    return (output[0])


class TextToAudioThenAudioToTextConversionTest(unittest.TestCase):
    def test_no_file(self):
        import os
        os.remove('test_audio.wav')
        with self.assertRaises(Exception):
            test_audio_to_text()

    def genral_text_to_audio(self):
        # Test with a simple input
        test_text = "This is a test."
        test_text_to_audio(test_text)
        audio = test_audio_to_text()
        self.assertEqual(audio, test_text)

    def test_text_to_audio_empty_input(self):
        # Test with an empty input
        test_text = ""
        test_text_to_audio(test_text)
        audio = test_audio_to_text()
        self.assertEqual(audio, test_text)

    def test_text_to_audio_patient_request(self):
        # Test with an empty input
        test_text = "My pain level has increased. Please inform the staff."
        test_text_to_audio(test_text)
        audio = test_audio_to_text()
        self.assertEqual(audio.lstrip(), test_text)

    def test_text_to_audio_patient_discomfert(self):
        # Test with an empty input
        test_text = "I'm feeling some discomfort. Can you help me?"
        test_text_to_audio(test_text)
        audio = test_audio_to_text()
        self.assertEqual(audio.lstrip(), test_text)


if __name__ == '__main__':
    unittest.main()
