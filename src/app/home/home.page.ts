import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  soundLevel: number = 0;
  isListening: boolean = false;
  soundDetected: boolean = false; // 音が検知されたかどうか

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

        // 音量が一定以上（30以上）の場合は音が検知されたとする
        if (this.soundLevel >= 30) {
          this.soundDetected = true;
        }

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
    this.soundDetected = false;
  }

  getSoundLevelColor(): string {
    if (this.soundLevel < 30) return 'success';
    if (this.soundLevel < 60) return 'warning';
    return 'danger';
  }

  getSoundLevelText(): string {
    if (!this.isListening) return '待機中';
    if (this.soundLevel < 30) return '静か';
    if (this.soundLevel < 60) return '普通';
    return 'うるさい';
  }

  // 円の色クラスを取得（青色→暖色）
  getCircleColorClass(): string {
    if (!this.isListening) return 'circle-blue'; // 待機中は青色
    if (!this.soundDetected) return 'circle-blue'; // 音が検知されていない場合は青色
    // 音が検知されたら音量に応じて暖色に変化
    if (this.soundLevel < 60) return 'circle-warm'; // 普通の音量は暖色（オレンジ）
    return 'circle-hot'; // うるさい場合は赤色
  }
}
