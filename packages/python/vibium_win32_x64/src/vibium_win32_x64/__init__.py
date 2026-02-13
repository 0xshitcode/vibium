"""Vibium binary for Windows x64."""

from pathlib import Path

__version__ = "0.1.8"

def get_binary_path() -> str:
    """Get the path to the vibium binary."""
    return str(Path(__file__).parent / "bin" / "vibium.exe")
