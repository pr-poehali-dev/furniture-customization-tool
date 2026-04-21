// Утилиты защиты форм от ботов и накруток

// --- Валидация телефона ---

export function isPhoneValid(phone: string): { ok: boolean; error?: string } {
  const digits = phone.replace(/\D/g, "");

  if (digits.length !== 11) {
    return { ok: false, error: "Введите полный номер телефона" };
  }

  // Все цифры одинаковые: 77777777777, 11111111111 и т.д.
  const core = digits.slice(1);
  if (/^(\d)\1{9}$/.test(core)) {
    return { ok: false, error: "Введите настоящий номер телефона" };
  }

  // Последовательности: 1234567890, 0987654321
  const sequences = ["1234567890", "0987654321", "9876543210"];
  if (sequences.some((s) => core.includes(s) || s.includes(core))) {
    return { ok: false, error: "Введите настоящий номер телефона" };
  }

  // Известные тестовые номера
  const testPatterns = [/^7(9{10})$/, /^7(0{10})$/];
  if (testPatterns.some((p) => p.test(digits))) {
    return { ok: false, error: "Введите настоящий номер телефона" };
  }

  // Код оператора не может быть 000, 111..999 (три одинаковых) или нереальным
  const operatorCode = core.slice(0, 3);
  if (/^(\d)\1{2}$/.test(operatorCode)) {
    return { ok: false, error: "Введите настоящий номер телефона" };
  }

  return { ok: true };
}

// --- Защита от спама (rate limit на фронте) ---

const SUBMIT_KEY = "fg_submit_times";
const MAX_SUBMITS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 минут

export function canSubmit(): { ok: boolean; error?: string } {
  const now = Date.now();
  const raw = localStorage.getItem(SUBMIT_KEY);
  const times: number[] = raw ? JSON.parse(raw) : [];

  // Оставляем только те, что в пределах окна
  const recent = times.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_SUBMITS) {
    const waitSec = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000 / 60);
    return { ok: false, error: `Слишком много заявок. Подождите ${waitSec} мин.` };
  }

  recent.push(now);
  localStorage.setItem(SUBMIT_KEY, JSON.stringify(recent));
  return { ok: true };
}

// --- Honeypot: скрытое поле, которое боты заполняют ---
// Использование: добавить <input name="website" style={{display:'none'}} /> в форму
// и передавать значение в checkHoneypot()

export function checkHoneypot(value: string): boolean {
  return value.trim() === "";
}

// --- Проверка времени заполнения формы (боты слишком быстры) ---

const timers: Record<string, number> = {};

export function startFormTimer(formId: string) {
  timers[formId] = Date.now();
}

export function isHumanSpeed(formId: string, minMs = 2000): boolean {
  const start = timers[formId];
  if (!start) return true;
  return Date.now() - start >= minMs;
}

// --- Валидация имени ---

export function isNameValid(name: string): { ok: boolean; error?: string } {
  const trimmed = name.trim();
  if (trimmed.length < 2) return { ok: false, error: "Введите имя" };
  if (/^(.)\1+$/.test(trimmed)) return { ok: false, error: "Введите настоящее имя" };
  if (/^[^a-zA-Zа-яёА-ЯЁ]+$/.test(trimmed)) return { ok: false, error: "Введите настоящее имя" };
  return { ok: true };
}
