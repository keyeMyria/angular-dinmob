import { NumberToYesNoPipe } from './number-to-yes-no.pipe';

describe('NumberToYesNoPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToYesNoPipe();
    expect(pipe).toBeTruthy();
  });
});
