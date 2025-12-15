let activeCategory = 'Semua';

const promptLibraryData = [
  {
    title: 'Ringkas Teks Panjang',
    category: 'Belajar',
    role: 'Kamu adalah asisten yang ahli dalam merangkum teks.',
    task: 'Ringkas teks berikut menjadi poin-poin utama.',
    context: 'Gunakan bahasa yang mudah dipahami.',
    output: 'Bullet point singkat'
  },
  {
    title: 'Buat Caption Instagram',
    category: 'Konten',
    role: 'Kamu adalah social media specialist.',
    task: 'Buat caption Instagram yang menarik berdasarkan deskripsi berikut.',
    context: 'Target audiens usia 18–35 tahun.',
    output: 'Caption + emoji secukupnya'
  },
  {
    title: 'Balas Email Profesional',
    category: 'Kerja',
    role: 'Kamu adalah asisten profesional.',
    task: 'Buat balasan email yang sopan dan profesional.',
    context: 'Gunakan bahasa formal.',
    output: 'Paragraf singkat'
  }
];

function getCategories() {
  const categories = promptLibraryData.map(p => p.category);
  return ['Semua', ...new Set(categories)];
}

function renderCategoryFilter() {
  const container = document.getElementById('categoryFilter');
  if (!container) return;

  container.innerHTML = '';

  getCategories().forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category;

    if (category === activeCategory) {
      btn.classList.add('active');
    }

    btn.onclick = () => {
      activeCategory = category;
      renderCategoryFilter();
      renderPromptLibrary();
    };

    container.appendChild(btn);
  });
}

function buildPrompt() {
  const role = document.getElementById('role').value.trim();
  const task = document.getElementById('task').value.trim();
  const context = document.getElementById('context').value.trim();
  const output = document.getElementById('output').value.trim();

  let prompt = '';

  if (role) {
    prompt += role + '.\n\n';
  }

  if (task) {
    prompt += 'Tugas:\n' + task + '\n\n';
  }

  if (context) {
    prompt += 'Konteks:\n' + context + '\n\n';
  }

  if (output) {
    prompt += 'Format Output:\n' + output;
  }

  document.getElementById('result').value =
    prompt || 'Silakan isi minimal bagian Tugas.';
}

function copyPrompt() {
  const textarea = document.getElementById('result');
  textarea.select();
  document.execCommand('copy');

  const status = document.getElementById('copyStatus');
  status.textContent = 'Prompt berhasil disalin ✅';

  setTimeout(() => {
    status.textContent = '';
  }, 2000);
}

// Dark / Light mode
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

function renderPromptLibrary() {
  const container = document.getElementById('promptLibrary');
  if (!container) return;

  container.innerHTML = '';

  const filtered = activeCategory === 'Semua'
    ? promptLibraryData
    : promptLibraryData.filter(p => p.category === activeCategory);

  if (filtered.length === 0) {
    container.innerHTML = '<p style="color:var(--muted)">Tidak ada prompt di kategori ini.</p>';
    return;
  }

  filtered.forEach((prompt, index) => {
    const div = document.createElement('div');
    div.className = 'prompt-item';
    div.innerHTML = `
      <h3>${prompt.title}</h3>
      <span>${prompt.category}</span>
    `;

    div.onclick = () => loadPrompt(
      promptLibraryData.indexOf(prompt)
    );

    container.appendChild(div);
  });
}

function loadPrompt(index) {
  const prompt = promptLibraryData[index];

  document.getElementById('role').value = prompt.role;
  document.getElementById('task').value = prompt.task;
  document.getElementById('context').value = prompt.context;
  document.getElementById('output').value = prompt.output;

  buildPrompt();

  document.getElementById('role').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

renderCategoryFilter();
renderPromptLibrary();



