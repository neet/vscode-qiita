import { window } from 'vscode';
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

// 外のコンポーネントから結果値を利用するためエクスポート
export const publicLabel  = localize('quickpicks.visibilityQuickPick.public.label', '公開');
export const privateLabel = localize('quickpicks.visibilityQuickPick.private.label', '限定公開');

/**
 * 公開範囲を指定させるQuickPickを作成
 * @return QuickPick
 */
export function visibilityQuickPickCreator () {
  const quickPick = window.createQuickPick();
  quickPick.title = localize(
    'quickpicks.visibilityQuickPick.title',
    '投稿の公開範囲を選択してください',
  );

  quickPick.items = [
    {
      label: publicLabel,
      description: localize(
        'quickpicks.visibilityQuickPick.public.description',
        '誰でも投稿を閲覧できます',
      ),
    },
    {
      label: privateLabel,
      description: localize(
        'quickpicks.visibilityQuickPick.private.description',
        '投稿のURLを知っている人だけが投稿を閲覧できます',
      ),
    },
  ];

  return quickPick;
}
