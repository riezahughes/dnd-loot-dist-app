describe('Checking for faults in commands', () => {
  test('able to read command', () => {
    const message = '$$createparty create party command';

    const messageArray = message.split(' ');

    expect(messageArray[0]).toBe('$$createparty');
  });
});
