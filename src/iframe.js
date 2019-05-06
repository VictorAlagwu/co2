window.onload = function() {
    var widgetSnippet = document.getElementById('widgetSnippet');
    if (widgetSnippet) {
        var doc = widgetSnippet.contentDocument? widgetSnippet.contentDocument: widgetSnippet.contentWindow.document;
        var form = doc.getElementById('widgetButton');
         form.style.display = 'none';
        console.log('Worked');
    }
    console.log('Hello, not working');
}
