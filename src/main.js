
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
        <div class="mb-2 font-bold">Headers</div>
        <pre class="bg-white text-black p-2 overflow-auto rounded">${JSON.stringify(req.headers, null, 2)}</pre>
        <div class="mt-4 mb-2 font-bold">Body</div>
        <pre class="bg-white text-black p-2 overflow-auto rounded">${JSON.stringify(req.body, null, 2)}</pre>
        <button onclick="copyDetail()" class="mt-4 bg-ral3031 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">Kopieer alles</button>
      `;
    };
    list.appendChild(item);
  });
}

function copyDetail() {
  if (selected) {
    navigator.clipboard.writeText(JSON.stringify(selected, null, 2));
    alert('Inhoud gekopieerd!');
  }
}

window.onload = () => {
  fetchData();
  setInterval(fetchData, 5000);
};
