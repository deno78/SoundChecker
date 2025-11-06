import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  soundLevel: number = 0;
  isListening: boolean = false;

  constructor() {}

  async startListening() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      microphone.connect(analyser);
      analyser.fftSize = 256;

      this.isListening = true;

      const detectSound = () => {
        if (!this.isListening) {
          stream.getTracks().forEach(track => track.stop());
          audioContext.close();
          return;
        }

        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        this.soundLevel = Math.round(average);

        requestAnimationFrame(detectSound);
      };

      detectSound();
    } catch (error) {
      console.error('マイクへのアクセスが拒否されました:', error);
      alert('マイクへのアクセスを許可してください');
    }
  }

  stopListening() {
    this.isListening = false;
    this.soundLevel = 0;
  }

  getSoundLevelColor(): string {
    if (this.soundLevel < 30) return 'success';
    if (this.soundLevel < 60) return 'warning';
    return 'danger';
  }

  getSoundLevelText(): string {
    if (this.soundLevel < 30) return '静か';
    if (this.soundLevel < 60) return '普通';
    return 'うるさい';
  }
}
