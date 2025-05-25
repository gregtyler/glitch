function htmlToArray(html) {
  const $_ = document.createElement('div');
  $_.innerHTML = html;
  
  // Find the table with the most rows
  const $table = Array
    .from($_.querySelectorAll('table.wikitable'))
    .sort((a, b) => b.querySelectorAll('tr').length - a.querySelectorAll('tr').length)
    [0]
  
  const headers = [];
  const data = [];
  
  $table.querySelectorAll('tr').forEach($row => {
    const cells = Array.from($row.children).map($cell => $cell.innerText.trim());
    
    if ($row.children[0].tagName === 'TH') {
      if (headers.length) return;
      
      cells.forEach(header => {
        headers.push(header);
      });
    } else {
      data.push(cells);
    }
  });
  
  if (data.length < 5) {
    throw new Error('Not enough data');
  }
  
  return { headers, data };
}