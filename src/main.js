
import './main.css'

let selected = null;

async function fetchData() {
  const res = await fetch('/hook');
  const data = await res.json();
  const list = document.getElementById('list');
  const detail = document.getElementById('detail');

  list.innerHTML = '';
  data.forEach(req => {
    const item = document.createElement('div');
    item.className = "p-3 border-b border-white/10 hover:bg-ral3031 cursor-pointer";
    item.textContent = `${req.timestamp}`;
    item.onclick = () => {
      selected = req;
      detail.innerHTML = `
        <div class="flex items-center gap-2 mb-2">
          <input type="checkbox" id="toggleHeaders" class="accent-ral3031" onchange="toggleHeaders()" />
          <label for="toggleHeaders">Toon headers</label>
        </div>
        <div id="headersSection" class="hidden mb-4">
          <div class="font-bold">Headers</div>
          <pre id="headersOutput" class="bg-white text-black p-2 overflow-auto rounded">${JSON.stringify(req.headers, null, 2)}</pre>
        </div>
        <div class="font-bold mb-2">Body</div>
        <pre id="bodyOutput" class="bg-white text-black p-2 overflow-auto rounded">${formatBody(req.body)}</pre>
        <button onclick="copyDetail()" class="mt-4 bg-ral3031 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">Kopieer alles</button>
      `;
    };
    list.appendChild(item);
  });
}

function toggleHeaders() {
  const checkbox = document.getElementById('toggleHeaders');
  const section = document.getElementById('headersSection');
  section.classList.toggle('hidden', !checkbox.checked);
}

function copyDetail() {
  if (selected) {
    navigator.clipboard.writeText(JSON.stringify(selected, null, 2));
    alert('Inhoud gekopieerd!');
  }
}

function formatBody(body) {
  if (typeof body === 'string') {
    // Check if it's XML
    if (body.trim().startsWith('<')) {
      return body;
    }
    try {
      const json = JSON.parse(body);
      return JSON.stringify(json, null, 2);
    } catch {
      return body;
    }
  }
  return JSON.stringify(body, null, 2);
}

window.onload = () => {
  fetchData();
  setInterval(fetchData, 5000);
};
