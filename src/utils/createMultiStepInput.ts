import { InputBox, QuickPick } from 'vscode';
import { Middleware, Next } from './middleware';

export function createMultiStepInput <T> (inputs: (InputBox | QuickPick<any>)[]) {
  const composeStep = new Middleware<T>();

  const steps = inputs
    // ステップ数を追加
    .map((input, i) => {
      input.totalSteps = inputs.length;
      input.step       = i + 1;
      return input;
    })
    // Middlewareとしてラップ
    .map((input) => {
      return (_: T, next: Next) => {
        input.show();
        input.onDidAccept(() => next());
      };
    });

  steps.forEach((step) => {
    composeStep.use(step);
  });

  return composeStep;
}
