import { expect } from 'chai';
import { fake } from 'sinon';
import { QuickPick } from 'vscode';
import { createMultiStepInput } from '../../utils/createMultiStepInput';

describe('createMultiStepInput', () => {
  it('複数のQuickPick/InputBoxをラップして最初の1つを呼び出す関数を返す', () => {
    const onDidAccept = fake();
    const show        = fake();
    const quickPick   = { onDidAccept, show } as any as QuickPick<any>;

    createMultiStepInput([quickPick])();

    expect(show.calledOnce).to.be.ok;
  });
});
