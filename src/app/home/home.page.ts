import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  soundLevel: number = 0;
  isListening: boolean = false;

  // 音量レベルの閾値定数
  private readonly SOUND_THRESHOLD = 30;  // 音が検知されたと判断する閾値
  private readonly LOUD_THRESHOLD = 60;   // うるさいと判断する閾値

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
    if (this.soundLevel < this.SOUND_THRESHOLD) return 'success';
    if (this.soundLevel < this.LOUD_THRESHOLD) return 'warning';
    return 'danger';
  }

  getSoundLevelText(): string {
    if (!this.isListening) return '待機中';
    if (this.soundLevel < this.SOUND_THRESHOLD) return '静か';
    if (this.soundLevel < this.LOUD_THRESHOLD) return '普通';
    return 'うるさい';
  }

  // 円の色クラスを取得（青色→暖色）
  getCircleColorClass(): string {
    if (!this.isListening) return 'circle-blue'; // 待機中は青色
    // リアルタイムの音量レベルに応じて色を変化
    if (this.soundLevel < this.SOUND_THRESHOLD) return 'circle-blue'; // 音量が低い場合は青色
    if (this.soundLevel < this.LOUD_THRESHOLD) return 'circle-warm'; // 普通の音量は暖色（オレンジ）
    return 'circle-hot'; // うるさい場合は赤色
  }
}
