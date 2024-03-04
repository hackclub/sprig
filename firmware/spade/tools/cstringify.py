#!/usr/bin/env python3

import sys
fp = sys.argv[1]

with open(fp) as f:
  for line in f:
    print('"' + line.strip('\n').replace('\\', '\\\\').replace('"', '\\"') + '\\n"');
