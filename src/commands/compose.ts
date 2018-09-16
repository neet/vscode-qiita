import { tags } from '../quicks/tags';
import { title } from '../quicks/title';
import { visibilityPicker } from '../quicks/visibilityPicker';
import { createMultiStepInput } from '../utils/createMultiStepInput';

const getFilenameFromPath = (filename: string) => {
  const splitPath = filename.split('/');
  [filename] = splitPath[splitPath.length - 1].split('.');

  return filename;
};

export function compose (arg: object & { path: string }) {
  const fileName = getFilenameFromPath(arg.path);

  const steps = createMultiStepInput([
    title(fileName),
    tags(),
    visibilityPicker,
  ]);

  steps.handle({});
}
