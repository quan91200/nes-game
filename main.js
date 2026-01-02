const btnLoad = document.getElementById('btnLoad');
const btnControls = document.getElementById('btnControls');
const btnResetKeys = document.getElementById('btnResetKeys');
const btnSaveKeys = document.getElementById('btnSaveKeys');
const btnCloseControls = document.getElementById('btnCloseControls');
const statusDiv = document.getElementById('status');
const controlsPanel = document.getElementById('controlsPanel');
const controlsList = document.getElementById('controlsList');
const savedGamesPanel = document.getElementById('savedGamesPanel');
const savedGamesList = document.getElementById('savedGamesList');

const btnViewList = document.getElementById('btnViewList');
const btnViewGrid = document.getElementById('btnViewGrid');

let currentView = 'list'; // 'list' hoặc 'grid'

// Lưu và load view preference
function saveViewPreference(view) {
  localStorage.setItem('gamesViewMode', view);
}

function loadViewPreference() {
  const saved = localStorage.getItem('gamesViewMode');
  return saved || 'list';
}

// Cập nhật view
function setView(view) {
  currentView = view;
  savedGamesList.className = view === 'grid' ? 'grid-view' : 'list-view';

  // Cập nhật nút active
  btnViewList.classList.toggle('active', view === 'list');
  btnViewGrid.classList.toggle('active', view === 'grid');

  saveViewPreference(view);
}

let nostalgistInstance = null;
let listeningForKey = null;

// IndexedDB để lưu ROM
const DB_NAME = 'NESGameDB';
const DB_VERSION = 1;
const STORE_NAME = 'roms';

let db = null;

// Khởi tạo IndexedDB
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Lưu ROM vào IndexedDB
async function saveROM(file) {
  const arrayBuffer = await file.arrayBuffer();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  await store.add({
    name: file.name,
    data: arrayBuffer,
    savedAt: new Date().toISOString()
  });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

// Lấy tất cả ROM đã lưu
async function getAllROMs() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Lấy ROM theo ID
async function getROMById(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Xóa ROM theo ID
async function deleteROM(id) {
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.delete(id);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

// Format ngày giờ
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Hiển thị danh sách game đã lưu
async function displaySavedGames() {
  try {
    const games = await getAllROMs();

    if (games.length === 0) {
      savedGamesPanel.style.display = 'none';
      return;
    }

    savedGamesPanel.style.display = 'block';

    // Set view class
    savedGamesList.className = currentView === 'grid' ? 'grid-view' : 'list-view';

    savedGamesList.innerHTML = games.map(game => `
      <div class="saved-game-item">
        <div style="flex: 1;">
          <div class="saved-game-name">🎮 ${game.name}</div>
          <div class="saved-game-date">Lưu lúc: ${formatDate(game.savedAt)}</div>
        </div>
        <div class="saved-game-buttons">
          <button class="btn btn-small" onclick="playGame(${game.id})">▶️ Chơi</button>
          <button class="btn btn-small btn-secondary" onclick="deleteGame(${game.id})">🗑️</button>
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error displaying saved games:', error);
  }
}

// Chơi game theo ID
window.playGame = async function (id) {
  try {
    showStatus('Đang tải game...', 'info');
    const saved = await getROMById(id);

    if (!saved) {
      showStatus('Không tìm thấy game', 'error');
      return;
    }

    // Tạo File object từ ArrayBuffer
    const blob = new Blob([saved.data], { type: 'application/x-nes-rom' });
    const file = new File([blob], saved.name, { type: 'application/x-nes-rom' });

    // Chạy game
    nostalgistInstance = await Nostalgist.nes(file, {
      respondToGlobalEvents: true
    });

    showStatus(`✓ Đang chơi: ${saved.name}`, 'success');
    btnLoad.style.display = 'none';
    btnControls.style.display = 'inline-block';
    savedGamesPanel.style.display = 'none';

  } catch (error) {
    showStatus(`Lỗi: ${error.message}`, 'error');
    console.error('Error loading game:', error);
  }
};

// Xóa game theo ID
window.deleteGame = async function (id) {
  if (confirm('Bạn có chắc muốn xóa game này?')) {
    try {
      await deleteROM(id);
      showStatus('✓ Đã xóa game', 'success');
      await displaySavedGames();
    } catch (error) {
      showStatus(`Lỗi: ${error.message}`, 'error');
      console.error('Error deleting game:', error);
    }
  }
};

// Phím mặc định cho NES
const defaultKeys = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  a: 'KeyZ',
  b: 'KeyX',
  start: 'Enter',
  select: 'ShiftRight',
  exit: 'Escape',
};

// Load phím đã lưu hoặc dùng mặc định
let currentKeys = { ...defaultKeys };

function loadSavedKeys() {
  const saved = localStorage.getItem('nesControlKeys');
  if (saved) {
    try {
      currentKeys = JSON.parse(saved);
      showStatus('✓ Đã tải cài đặt phím đã lưu', 'success');
    } catch (e) {
      console.error('Error loading keys:', e);
    }
  }
}

function saveKeys() {
  localStorage.setItem('nesControlKeys', JSON.stringify(currentKeys));
  showStatus('✓ Đã lưu cài đặt phím', 'success');
}

function resetKeys() {
  currentKeys = { ...defaultKeys };
  saveKeys();
  renderControls();
  showStatus('✓ Đã reset phím về mặc định', 'success');
}

function getKeyName(code) {
  const keyNames = {
    'ArrowUp': '↑',
    'ArrowDown': '↓',
    'ArrowLeft': '←',
    'ArrowRight': '→',
    'Enter': 'Enter',
    'Space': 'Space',
    'ShiftLeft': 'Shift L',
    'ShiftRight': 'Shift R',
    'ControlLeft': 'Ctrl L',
    'ControlRight': 'Ctrl R',
    'AltLeft': 'Alt L',
    'AltRight': 'Alt R',
    'Escape': 'Esc'
  };

  if (keyNames[code]) return keyNames[code];
  if (code.startsWith('Key')) return code.replace('Key', '');
  if (code.startsWith('Digit')) return code.replace('Digit', '');
  return code;
}

function renderControls() {
  const buttonLabels = {
    up: '🔼 Lên',
    down: '🔽 Xuống',
    left: '◀️ Trái',
    right: '▶️ Phải',
    a: '🅰️ Nút A',
    b: '🅱️ Nút B',
    start: '▶️ Start',
    select: '⏸️ Select',
    exit: '🚪 Thoát game',
  };

  controlsList.innerHTML = Object.keys(currentKeys).map(action => `
    <div class="control-row">
      <span class="control-label">${buttonLabels[action]}</span>
      <span class="key-display" id="key-${action}">${getKeyName(currentKeys[action])}</span>
      <button class="btn btn-small" onclick="startListening('${action}')">Đổi phím</button>
    </div>
  `).join('');
}

window.startListening = function (action) {
  if (listeningForKey) {
    document.getElementById(`key-${listeningForKey}`).classList.remove('listening');
  }

  listeningForKey = action;
  const keyDisplay = document.getElementById(`key-${action}`);
  keyDisplay.classList.add('listening');
  keyDisplay.textContent = 'Nhấn phím...';
  showStatus(`Nhấn phím bạn muốn dùng cho ${action.toUpperCase()}`, 'info');
};

function showStatus(message, type = 'info') {
  statusDiv.textContent = message;
  statusDiv.className = type;
}

// Lắng nghe phím
document.addEventListener('keydown', (e) => {
  if (listeningForKey) {
    e.preventDefault();

    // Không cho phím F5
    if (e.code === 'F5') {
      showStatus('Không thể dùng phím này', 'error');
      return;
    }

    currentKeys[listeningForKey] = e.code;
    renderControls();
    showStatus(`✓ Đã đổi phím ${listeningForKey.toUpperCase()} thành ${getKeyName(e.code)}`, 'success');
    listeningForKey = null;
  } else if (nostalgistInstance && e.code === currentKeys.exit) {
    // Thoát game về sảnh
    e.preventDefault();
    if (confirm('Bạn có muốn thoát game và quay về sảnh chọn game?')) {
      nostalgistInstance.exit();
      nostalgistInstance = null;
      btnLoad.style.display = 'inline-block';
      controlsPanel.classList.remove('active');
      savedGamesPanel.style.display = 'block';
      showStatus('✓ Đã thoát game', 'success');
    }
  }
});

btnLoad.addEventListener('click', async () => {
  try {
    if (!window.showOpenFilePicker) {
      showStatus('Trình duyệt của bạn không hỗ trợ File Picker API. Vui lòng dùng Chrome/Edge mới nhất.', 'error');
      return;
    }

    showStatus('Đang chọn file...', 'info');

    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: 'NES ROM Files',
        accept: {
          'application/x-nes-rom': ['.nes']
        }
      }],
      multiple: false
    });

    const file = await fileHandle.getFile();
    showStatus(`Đang lưu và tải game: ${file.name}...`, 'info');

    // Lưu ROM vào IndexedDB
    await saveROM(file);

    // Chạy game
    nostalgistInstance = await Nostalgist.nes(file, {
      respondToGlobalEvents: true
    });

    showStatus(`✓ Game đã lưu và tải thành công: ${file.name}`, 'success');

    btnLoad.style.display = 'none';
    btnControls.style.display = 'inline-block';
    savedGamesPanel.style.display = 'none';

    // Cập nhật danh sách game
    await displaySavedGames();

  } catch (error) {
    if (error.name === 'AbortError') {
      showStatus('Đã hủy chọn file', 'info');
    } else {
      showStatus(`Lỗi: ${error.message}`, 'error');
      console.error('Error:', error);
    }
  }
});

btnControls.addEventListener('click', () => {
  controlsPanel.classList.add('active');
  renderControls();
  showStatus('Cấu hình phím điều khiển của bạn', 'info');
});

btnCloseControls.addEventListener('click', () => {
  controlsPanel.classList.remove('active');
  listeningForKey = null;
  showStatus('', 'info');
});

btnResetKeys.addEventListener('click', resetKeys);
btnSaveKeys.addEventListener('click', saveKeys);

// Chuyển đổi view
btnViewList.addEventListener('click', () => setView('list'));
btnViewGrid.addEventListener('click', () => setView('grid'));

// Khởi tạo khi load trang
initDB().then(() => {
  currentView = loadViewPreference();
  setView(currentView);

  displaySavedGames();
  loadSavedKeys();
}).catch(error => {
  console.error('Error initializing DB:', error);
  loadSavedKeys();
});
