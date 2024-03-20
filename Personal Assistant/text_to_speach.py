class Tts():
    def __init__(self):
        import pyttsx3
        self.audio = pyttsx3.init()

    def convert_text_to_audio(self, text: str, path: str):
        ''' Converts the Text to audio file and saves it to path 

        Parameters
        ----------
        text : str
            Text to be converted to audio file 
        path : str
            Path of the output audio file 

        Returns
        -------
        None
        '''
        self.audio.save_to_file(text, f'{path}.wav')
        self.audio.runAndWait()


if __name__ == "__main__":
    model = Tts()
    op = model.convert_text_to_audio(
        'hello hi how are you ', 'output')
