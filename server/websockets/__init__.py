import sys
import os
import importlib.util

# Add site-packages websockets to package search path so submodules (datastructures, version, etc.) load seamlessly
for p in sys.path:
    if "site-packages" in p:
        sp_ws = os.path.join(p, "websockets")
        if os.path.isdir(sp_ws) and sp_ws not in __path__:
            __path__.insert(0, sp_ws)
            break

try:
    from websockets.version import version as __version__
except Exception:
    __version__ = "12.0"
