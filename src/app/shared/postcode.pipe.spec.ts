import {PostcodePipe} from './postcode.pipe';

describe('PostcodePipe', () => {
  it('create an instance', () => {
    const pipe = new PostcodePipe();
    expect(pipe).toBeTruthy();
  });
});
