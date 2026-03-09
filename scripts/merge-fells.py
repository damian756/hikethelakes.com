#!/usr/bin/env python3
"""Merge generated fells into fells.ts."""
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
fells_path = os.path.join(project_root, "lib", "fells.ts")
generated_path = os.path.join(script_dir, "generated-fells-new.txt")

with open(fells_path, "r", encoding="utf-8") as f:
    fells_content = f.read()

with open(generated_path, "r", encoding="utf-8") as f:
    generated = f.read()

# Remove the comment line from generated
generated = generated.strip()
if generated.startswith("//"):
    first_newline = generated.find("\n")
    generated = generated[first_newline + 1 :].strip()

# Insert new fells before the closing ];
marker = "  },\n];"
if marker not in fells_content:
    print("ERROR: Marker not found in fells.ts")
    exit(1)

new_content = fells_content.replace(marker, "  },\n" + generated + "\n];")

with open(fells_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Merged 194 fells into fells.ts")
