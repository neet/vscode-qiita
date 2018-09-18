import { InputBox, QuickPick, QuickPickItem } from 'vscode';

/**
 * 複数のステップから成るQuickPick/InputBoxを生成します
 * @param steps QuickPickかInputBoxの配列
 * @return 0つめのステップのshow関数を呼び出す関数
 */
export function createMultiStepInput <T extends QuickPickItem> (steps: (InputBox | QuickPick<T>)[]) {
  const totalSteps = steps.length;

  steps.forEach((step, i) => {
    step.totalSteps = totalSteps;
    step.step       = i + 1;

    // Acceptされたときに次のstepをshowする
    step.onDidAccept(() => {
      steps[i + 1].show();
    });
  });

  // 0つめをshowする関数を返し、帰納的にすべて呼び出す
  return () => steps[0].show();
}
