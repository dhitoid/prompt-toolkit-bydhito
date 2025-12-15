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
  container.innerHTML = '';

  promptLibraryData.forEach((prompt, index) => {
    const div = document.createElement('div');
    div.className = 'prompt-item';
    div.innerHTML = `
      <h3>${prompt.title}</h3>
      <span>${prompt.category}</span>
    `;

    div.addEventListener('click', () => loadPrompt(index));
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

renderPromptLibrary();


