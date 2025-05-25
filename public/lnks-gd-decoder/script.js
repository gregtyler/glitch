const $input = document.querySelector('[data-id="input"]');
const $button = document.querySelector('[data-id="button"]');
const $target = document.querySelector('[data-id="target"]');

const URL_REGEX = /\/(ey[0-9A-Za-z]+\.ey[0-9A-Za-z]+\.[^/]+)\//

$button.addEventListener('click', () => {
  $target.innerHTML = '';
  
  const match = $input.value.match(URL_REGEX);
  const [, claimsObj, ] = match[1].split('.');
  
  const claims = JSON.parse(atob(claimsObj));
  
  const baseUrl = claims.url.match(/\/\/([^/]+)\//)[1]
  
  $target.innerHTML = `
    <p>
      <a href="${claims.url}"" class="your-link" rel="noreferrer">
        Untracked URL
        ${baseUrl ? `<br><small>(${baseUrl})</small>` : ''}
      </a>
    </p>
    <details>
      <summary>Decoded details</summary>
      
      <pre>${JSON.stringify(claims, null, 2)}</pre>
    </details>
  `
});