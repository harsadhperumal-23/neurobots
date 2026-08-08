import sys
import os

# Add server directory and project root directory to sys.path
_server_dir = os.path.dirname(os.path.abspath(__file__))
_parent_dir = os.path.dirname(_server_dir)

if _server_dir not in sys.path:
    sys.path.insert(0, _server_dir)
if _parent_dir not in sys.path:
    sys.path.insert(1, _parent_dir)
