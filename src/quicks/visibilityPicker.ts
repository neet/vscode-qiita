import { window } from 'vscode';

const visibilities = [
  { label: '公開', description: '誰でも投稿を閲覧できます' },
  { label: '限定公開', description: '投稿のURLを知っている人だけが投稿を閲覧できます' },
];

const picker = window.createQuickPick();
picker.title = '投稿の公開範囲を選択してください';
picker.items = visibilities;

export const visibilityPicker = picker;
