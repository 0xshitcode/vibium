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

        # Test evaluate
        title = vibe.evaluate("document.title")
        assert title == "Example Domain", f"Expected 'Example Domain', got: {title}"

        # Test evaluate with number
        result = vibe.evaluate("2 + 2")
        assert result == 4, f"Expected 4, got: {result}"

        # Test evaluate with object access
        url = vibe.evaluate("window.location.href")
        assert "example.com" in url, f"Expected URL with 'example.com', got: {url}"

        # Test click
        link.click()
    finally:
        vibe.quit()


if __name__ == "__main__":
    test_sync_api()
    print("Python client test passed!")
