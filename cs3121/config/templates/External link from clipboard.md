<%*
  const url = await tp.system.clipboard();
  let title = await tp.user.scraper.title(url);
  tR += `[${title}](${url})`;
-%>