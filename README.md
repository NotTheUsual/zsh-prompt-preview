# zsh prompt preview

Look, I'll be honest - I though the only existing way to check the results of a formatter was to update your profile and reload the terminal. Which is boring. Turns out you can just update the `PROMPT` variable and that'll change things instantly for the current session, but revert to your chosen setting in the nest sesion. And that's exactly what I wanted! But, hey, had already started thinking about this, and it's been a nice little TDD exercise to do in front of the TV.

Anyway, with the caveat that you shouldn't use this, it's simple enough. Stick the prompt config in the input on the left and see the result in the preview on the right. Below that you can see the pretend system settings I'm using (the dates/times are currently just the current date/time). The obvious caveat is that I haven't implemented all the rules. So, you know, again, don't use this.

Things what I should do
- put the implemented (...and non-implemented) rules on screen
- implement all the rules!
- have buttons next to the on-screen rules to add them to the prompt
- make more things configurable
  - inputs (custom dates? machine details? etc)
  - outputs (terminal colours/fonts/etc)
- style and that

But, yeah, just update the `PROMPT` variable locally, you'll have a much better time.
