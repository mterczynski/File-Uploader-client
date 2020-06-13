import { FileSizePipe } from './file-size.pipe';

describe('FileSize Pipe', () => {
  const pipe = new FileSizePipe();

  it(`transforms 2048 to '2 KB'`, () => {
    expect(pipe.transform(2048)).toEqual('2 KB');
  });

  it(`transforms 513 to '513 B'`, () => {
    expect(pipe.transform(513)).toEqual('513 B');
  });

  it(`transforms 256 to '256 B'`, () => {
    expect(pipe.transform(256)).toEqual('256 B');
  });
});
