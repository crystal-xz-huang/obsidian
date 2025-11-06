
```base
filters:
  and:
    - file.hasTag("examples")
    - file.hasLink(this.file)
formulas:
  topic_tags: file.tags.filter(value.contains("topic"))
properties:
  file.name:
    displayName: Problem
  formula.topic_tags:
    displayName: Topics
views:
  - type: table
    name: Example Problems
    order:
      - file.name
      - formula.topic_tags
    columnSize:
      file.name: 200
```
