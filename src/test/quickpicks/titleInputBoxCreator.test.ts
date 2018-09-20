import { expect } from 'chai';
import {
  titleInputBoxCreator,
  validateTitleInputBox,
} from '../../quickpicks/titleInputBox';

describe('titleInputBoxCreator', () => {
  it('デフォルトの値を指定してInputBoxを作成', () => {
    const inputBox = titleInputBoxCreator('タイトルです');
    expect(inputBox.value).to.be.equal('タイトルです');
  });

  it('0文字の際にバリデーションエラー', () => {
    const inputBox = titleInputBoxCreator('');
    const result = validateTitleInputBox(inputBox);
    expect(result).to.be.false;
  });

  it('255文字以上の際にバリデーションエラー', () => {
    const inputBox = titleInputBoxCreator('0123456789'.repeat(26));
    const result = validateTitleInputBox(inputBox);
    expect(result).to.be.false;
  });
});
