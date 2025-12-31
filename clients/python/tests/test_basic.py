"""Basic tests for the Vibium Python client."""

from vibium import browser_sync


def test_sync_api():
    """Test the synchronous API."""
    vibe = browser_sync.launch()
    try:
        vibe.go("https://example.com")

        # Test find and text
        link = vibe.find("a")
        text = link.text()
        assert text, f"Expected link text, got: {text}"

        # Test screenshot
        png = vibe.screenshot()
        assert len(png) > 1000, f"Screenshot too small: {len(png)} bytes"

        # Test click
        link.click()
    finally:
        vibe.quit()


if __name__ == "__main__":
    test_sync_api()
    print("Python client test passed!")
