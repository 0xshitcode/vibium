"""Async browser launcher."""

from typing import Optional

from .client import BiDiClient
from .binary import VibiumProcess
from .vibe import Vibe


class browser:
    """Async browser launcher.

    Usage:
        vibe = await browser.launch()
        await vibe.go("https://example.com")
        await vibe.quit()
    """

    @staticmethod
    async def launch(
        headless: bool = False,
        port: Optional[int] = None,
        executable_path: Optional[str] = None,
    ) -> Vibe:
        """Launch a new browser instance.

        Args:
            headless: Run browser in headless mode (default: visible).
            port: WebSocket port (default: auto-assigned).
            executable_path: Path to vibium binary (default: auto-detect).

        Returns:
            A Vibe instance for browser automation.
        """
        process = await VibiumProcess.start(
            headless=headless,
            port=port,
            executable_path=executable_path,
        )

        client = await BiDiClient.connect(f"ws://localhost:{process.port}")

        return Vibe(client, process)
