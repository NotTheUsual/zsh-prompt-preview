import parsePrompt from './parsePrompt';

// Test cases sourced from:
// http://zsh.sourceforge.net/Doc/Release/Prompt-Expansion.html#Prompt-Expansion
// ...and trying things out in my own terminal

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

  describe('Shell state', () => {
    // %#
    // A ‘#’ if the shell is running with privileges, a ‘%’ if not. Equivalent to ‘%(!.#.%%)’. The definition of ‘privileged’, for these purposes, is that either the effective user ID is zero, or, if POSIX.1e capabilities are supported, that at least one capability is raised in either the Effective or Inheritable capability vectors.
    test('parses %# as # with privileges', () => {
      expect(parsePrompt('%# ', { withPrivileges: true })).toBe('# ');
    });

    test('parses %# as % without privileges', () => {
      expect(parsePrompt('%# ', { withPrivileges: false })).toBe('% ');
    });

    // %?
    // The return status of the last command executed just before the prompt.
    test('parses %? as 0 when previous command was successful', () => {
      expect(parsePrompt('%? > ', { lastCommandSuccessful: true })).toBe('0 > ');
    });

    test('parses %? as 1 when previous command was unsuccessful', () => {
      expect(parsePrompt('%? > ', { lastCommandSuccessful: false })).toBe('1 > ');
    });

    // %_
    // The status of the parser, i.e. the shell constructs (like ‘if’ and ‘for’) that have been started on the command line. If given an integer number that many strings will be printed; zero or negative or no integer means print as many as there are. This is most useful in prompts PS2 for continuation lines and PS4 for debugging with the XTRACE option; in the latter case it will also work non-interactively.

    // %^
    // The status of the parser in reverse. This is the same as ‘%_’ other than the order of strings. It is often used in RPS2.

    // %d
    // %/
    // Current working directory. If an integer follows the ‘%’, it specifies a number of trailing components of the current working directory to show; zero means the whole path. A negative integer specifies leading components, i.e. %-1d specifies the first component.
    test('parses %d as /Users/username/Projects/zsh-prompt', () => {
      expect(parsePrompt('%d > ')).toBe('/Users/username/Projects/zsh-prompt > ');
    });
    test('parses %/ as /Users/username/Projects/zsh-prompt', () => {
      expect(parsePrompt('%/ > ')).toBe('/Users/username/Projects/zsh-prompt > ');
    });

    test('parses %2d as Projects/zsh-prompt', () => {
      expect(parsePrompt('%2d > ')).toBe('Projects/zsh-prompt > ');
    });
    test('parses %3/ as username/Projects/zsh-prompt', () => {
      expect(parsePrompt('%3/ > ')).toBe('username/Projects/zsh-prompt > ');
    });

    // %~
    // As %d and %/, but if the current working directory starts with $HOME, that part is replaced by a ‘~’. Furthermore, if it has a named directory as its prefix, that part is replaced by a ‘~’ followed by the name of the directory, but only if the result is shorter than the full path; Filename Expansion.
    test('parses %~ as ~/Projects/zsh-prompt', () => {
      expect(parsePrompt('%~ > ')).toBe('~/Projects/zsh-prompt > ');
    });

    // %e
    // Evaluation depth of the current sourced file, shell function, or eval. This is incremented or decremented every time the value of %N is set or reverted to a previous value, respectively. This is most useful for debugging as part of $PS4.

    // %h
    // %!
    // Current history event number.

    // %i
    // The line number currently being executed in the script, sourced file, or shell function given by %N. This is most useful for debugging as part of $PS4.

    // %I
    // The line number currently being executed in the file %x. This is similar to %i, but the line number is always a line number in the file where the code was defined, even if the code is a shell function.

    // %j
    // The number of jobs.

    // %L
    // The current value of $SHLVL.

    // %N
    // The name of the script, sourced file, or shell function that zsh is currently executing, whichever was started most recently. If there is none, this is equivalent to the parameter $0. An integer may follow the ‘%’ to specify a number of trailing path components to show; zero means the full path. A negative integer specifies leading components.

    // %x
    // The name of the file containing the source code currently being executed. This behaves as %N except that function and eval command names are not shown, instead the file where they were defined.

    // %c
    // %.
    // %C
    // Trailing component of the current working directory. An integer may follow the ‘%’ to get more than one component. Unless ‘%C’ is used, tilde contraction is performed first. These are deprecated as %c and %C are equivalent to %1~ and %1/, respectively, while explicit positive integers have the same effect as for the latter two sequences.
  });

  describe('Date and time', () => {
    const realDate = Date.now;

    beforeAll(() => {
      global.Date.now = jest.fn(() => new Date('2019-04-07T14:20:30').getTime());
    });

    afterAll(() => {
      global.Date.now = realDate;
    });

    // %D
    // The date in yy-mm-dd format.
    test('parses %D as 19-04-07', () => {
      expect(parsePrompt('%D > ')).toBe('19-04-07 > ');
    });

    // %T
    // Current time of day, in 24-hour format.
    test('parses %T as 14:20', () => {
      expect(parsePrompt('%T > ')).toBe('14:20 > ');
    });

    // %t
    // %@
    // Current time of day, in 12-hour, am/pm format.
    test('parses %t as 2:20pm', () => {
      expect(parsePrompt('%t > ')).toBe('2:20pm > ');
    });
    test('parses %@ as 2:20pm', () => {
      expect(parsePrompt('%@ > ')).toBe('2:20pm > ');
    });

    // %*
    // Current time of day in 24-hour format, with seconds.
    test('parses %* as 14:20:30', () => {
      expect(parsePrompt('%* > ')).toBe('14:20:30 > ');
    });

    // %w
    // The date in day-dd format.

    // %W
    // The date in mm/dd/yy format.

    // %D{string}
    // string is formatted using the strftime function. See man page strftime(3) for more details. Various zsh extensions provide numbers with no leading zero or space if the number is a single digit:

    // %f
    // a day of the month

    // %K
    // the hour of the day on the 24-hour clock

    // %L
    // the hour of the day on the 12-hour clock

    // In addition, if the system supports the POSIX gettimeofday system call, %. provides decimal fractions of a second since the epoch with leading zeroes. By default three decimal places are provided, but a number of digits up to 9 may be given following the %; hence %6. outputs microseconds, and %9. outputs nanoseconds. (The latter requires a nanosecond-precision clock_gettime; systems lacking this will return a value multiplied by the appropriate power of 10.) A typical example of this is the format ‘%D{%H:%M:%S.%.}’.

    // The GNU extension %N is handled as a synonym for %9..

    // Additionally, the GNU extension that a ‘-’ between the % and the format character causes a leading zero or space to be stripped is handled directly by the shell for the format characters d, f, H, k, l, m, M, S and y; any other format characters are provided to the system’s strftime(3) with any leading ‘-’ present, so the handling is system dependent. Further GNU (or other) extensions are also passed to strftime(3) and may work if the system supports them.
  });
});
