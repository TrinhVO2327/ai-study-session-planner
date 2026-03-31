/**
 * Export a DOM element to PDF by opening a print-friendly window.
 * Uses the browser's built-in print dialog — no extra libraries needed.
 */
export function exportToPdf(element, title = 'StudyFlow Plan') {
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export your study plan as PDF.');
    return;
  }

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'DM Sans', sans-serif;
      color: #1a1814;
      padding: 40px;
      line-height: 1.6;
    }
    h1, h2, h3 { font-family: 'Fraunces', serif; font-weight: 500; }
    @media print {
      body { padding: 20px; }
      .day-card { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1 style="color:#c05e3c;font-size:28px;margin-bottom:24px;">${title}</h1>
  ${element.innerHTML}
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 500);
    };
  </script>
</body>
</html>`);

  printWindow.document.close();
}
