---
<%*
  let title = tp.file.title
  if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("File Title") ?? "Untitled";
    title = tp.user.case_convert.toTitleCase(title);
    await tp.file.rename(title);
  }
-%>
categories:
  - "[[Divide and Conquer]]"
tags: [examples, topic/divide-and-conquer]
status: open
---

# <%* tR += title %>

<% tp.file.cursor(1) %>

## Related Problems

![[Related.base]]

## Further Reading & Resources
