import parsePrompt from './parsePrompt';

describe('parsePrompt', () => {
  test('parses plain text', () => {
    expect(parsePrompt('Hello ')).toBe('Hello ');
  });

  describe('special characters', () => {
    // %%
    // A ‘%’.
    test('parses %% as %', () => {
      expect(parsePrompt('%% ')).toBe('% ');
    });

    // %)
    // A ‘)’.
    test('parses %) as )', () => {
      expect(parsePrompt('(Hello%) ')).toBe('(Hello) ');
    });
  });

  describe('Login information', () => {
    // %l
    // The line (tty) the user is logged in on, without ‘/dev/’ prefix. If the name starts with ‘/dev/tty’, that prefix is stripped.
    test('parses %l as s001', () => {
      expect(parsePrompt('%l > ')).toBe('s001 > ');
    });

    // %M
    // The full machine hostname.
    test('parses %M as your-machine.gnu.ai.mit.edu', () => {
      expect(parsePrompt('%M > ')).toBe('your-machine.gnu.ai.mit.edu > ');
    });

    // %m
    // The hostname up to the first ‘.’. An integer may follow the ‘%’ to specify how many components of the hostname are desired. With a negative integer, trailing components of the hostname are shown.
    test('parses %m as your-machine', () => {
      expect(parsePrompt('%m > ')).toBe('your-machine > ');
    });
    test.todo('parses %2m as your-machine.gnu');
    test.todo('parses %-2m as mit.edu');

    // %n
    // $USERNAME.
    test('parses %n as username', () => {
      expect(parsePrompt('%n # ')).toBe('username # ');
    });

    // %y
    // The line (tty) the user is logged in on, without ‘/dev/’ prefix. This does not treat ‘/dev/tty’ names specially.
    test('parses %y as ttys001', () => {
      expect(parsePrompt('%y > ')).toBe('ttys001 > ');
    });
  });
});
