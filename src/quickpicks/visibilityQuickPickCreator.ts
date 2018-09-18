import { window } from 'vscode';

/**
 * 公開範囲を指定させるQuickPickを作成
 * @return QuickPick
 */
export function visibilityQuickPickCreator () {
  const quickPick = window.createQuickPick();
  quickPick.title = '投稿の公開範囲を選択してください';
  quickPick.items = [
    {
      label: '公開',
      description: '誰でも投稿を閲覧できます',
    },
    {
      label: '限定公開',
      description: '投稿のURLを知っている人だけが投稿を閲覧できます',
    },
  ];

  return quickPick;
}
