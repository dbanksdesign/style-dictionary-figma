# Style Dictionary Figma

This package shows how you can store your style dictionary in a Figma document and use the style dictionary build system.

Organize your Figma file just like you would a style dictionary,
with nested properties. Pages become the top level namespace, usually 'color', 'size', etc.
Then Frames are the next level down, then nested groups. This will go down the whole tree
of a Figma document, if the node has children, use the name of the node and continue down.
If there is a text child with a name of 'value', stop there and assign that to value, creating
a style dictionary property.

Example: https://www.figma.com/file/ekJQOrhrjvPh4sVlzQllyeJN/Style-Dictionary?node-id=8%3A0