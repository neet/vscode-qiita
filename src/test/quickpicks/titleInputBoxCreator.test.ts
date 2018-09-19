import { expect } from 'chai';
import { titleInputBoxCreator } from '../../quickpicks/titleInputBoxCreator';

describe('titleInputBoxCreator', () => {
  it('デフォルトの値を指定してInputBoxを作成', () => {
    const inputBox = titleInputBoxCreator('タイトルです');
    expect(inputBox.value).to.be.equal('タイトルです');
  });

  // 値を直接変更したらonDidChangeValueが呼ばれないみたいです >_<
  // it('255文字以上の際に警告を表示', () => {
  //   const inputBox = titleInputBoxCreator('0123456789'.repeat(26));
  //   expect(inputBox.validationMessage).to.be.a('string');
  // });
});
