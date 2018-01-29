import { UnmaskNumberPipe } from './unmask-number.pipe';

describe('UnmaskNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new UnmaskNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
