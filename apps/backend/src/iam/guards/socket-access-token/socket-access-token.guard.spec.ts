import { SocketAccessTokenGuard } from './socket-access-token.guard';

describe('SocketAccessTokenGuard', () => {
  it('should be defined', () => {
    expect(new SocketAccessTokenGuard()).toBeDefined();
  });
});
