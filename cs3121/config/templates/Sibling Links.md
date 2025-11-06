<%*
  let useCallout = await tp.system.suggester(
    ['[✓]  Yes', '[✕]  No, insert as list'],
    [true, false],
    false,
    `Insert sibling links as a callout?`
  );
  const config = {
    callout: useCallout ?? false,
  };
  tR += await tp.user.generateSiblingLinks(tp, config);
-%>