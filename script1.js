// Mengambil elemen form
var form = document.getElementById("formPendaftaran");

// Mengambil input
var nama = document.getElementById("nama");
var email = document.getElementById("email");
var password = document.getElementById("password");
var konfirmasi = document.getElementById("konfirmasi");
var ekskul = document.getElementById("ekskul");

// Mengambil tempat pesan error
var errorNama = document.getElementById("errorNama");
var errorEmail = document.getElementById("errorEmail");
var errorPassword = document.getElementById("errorPassword");
var errorKonfirmasi = document.getElementById("errorKonfirmasi");
var errorEkskul = document.getElementById("errorEkskul");

var pesanSukses = document.getElementById("pesanSukses");


// Fungsi validasi nama
function cekNama() {

    if (nama.value.trim() === "") {

        nama.classList.add("salah");
        nama.classList.remove("benar");

        errorNama.innerHTML = "Nama tidak boleh kosong.";
        return false;

    } else if (nama.value.trim().length < 3) {

        nama.classList.add("salah");
        nama.classList.remove("benar");

        errorNama.innerHTML = "Nama minimal 3 karakter.";
        return false;

    } else {

        nama.classList.add("benar");
        nama.classList.remove("salah");

        errorNama.innerHTML = "";
        return true;
    }
}


// Fungsi validasi email
function cekEmail() {

    var polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value === "") {

        email.classList.add("salah");
        email.classList.remove("benar");

        errorEmail.innerHTML = "Email tidak boleh kosong.";
        return false;

    } else if (!polaEmail.test(email.value)) {

        email.classList.add("salah");
        email.classList.remove("benar");

        errorEmail.innerHTML = "Format email tidak valid.";
        return false;

    } else {

        email.classList.add("benar");
        email.classList.remove("salah");

        errorEmail.innerHTML = "";
        return true;
    }
}


// Fungsi validasi password
function cekPassword() {

    if (password.value.length < 8) {

        password.classList.add("salah");
        password.classList.remove("benar");

        errorPassword.innerHTML = "Password minimal 8 karakter.";
        return false;

    } else {

        password.classList.add("benar");
        password.classList.remove("salah");

        errorPassword.innerHTML = "";
        return true;
    }
}


// Fungsi validasi konfirmasi password
function cekKonfirmasi() {

    if (konfirmasi.value === "") {

        konfirmasi.classList.add("salah");
        konfirmasi.classList.remove("benar");

        errorKonfirmasi.innerHTML = "Konfirmasi password tidak boleh kosong.";
        return false;

    } else if (konfirmasi.value !== password.value) {

        konfirmasi.classList.add("salah");
        konfirmasi.classList.remove("benar");

        errorKonfirmasi.innerHTML = "Password tidak sama.";
        return false;

    } else {

        konfirmasi.classList.add("benar");
        konfirmasi.classList.remove("salah");

        errorKonfirmasi.innerHTML = "";
        return true;
    }
}


// Fungsi validasi ekstrakurikuler
function cekEkskul() {

    if (ekskul.value === "") {

        ekskul.classList.add("salah");
        ekskul.classList.remove("benar");

        errorEkskul.innerHTML = "Silakan pilih ekstrakurikuler.";
        return false;

    } else {

        ekskul.classList.add("benar");
        ekskul.classList.remove("salah");

        errorEkskul.innerHTML = "";
        return true;
    }
}


// Validasi secara real-time
nama.addEventListener("input", cekNama);
email.addEventListener("input", cekEmail);
password.addEventListener("input", cekPassword);
konfirmasi.addEventListener("input", cekKonfirmasi);
ekskul.addEventListener("change", cekEkskul);


// Saat tombol Daftar ditekan
form.addEventListener("submit", function(event) {

    // Mencegah halaman refresh
    event.preventDefault();

    var namaValid = cekNama();
    var emailValid = cekEmail();
    var passwordValid = cekPassword();
    var konfirmasiValid = cekKonfirmasi();
    var ekskulValid = cekEkskul();

    if (
        namaValid &&
        emailValid &&
        passwordValid &&
        konfirmasiValid &&
        ekskulValid
    ) {

        pesanSukses.innerHTML = "Pendaftaran Berhasil! 🎉";

        // Mengosongkan form setelah berhasil
        form.reset();

        nama.classList.remove("benar");
        email.classList.remove("benar");
        password.classList.remove("benar");
        konfirmasi.classList.remove("benar");
        ekskul.classList.remove("benar");

    } else {

        pesanSukses.innerHTML = "";
    }

});

// SCRIPT CHATBOT 
(function () {
    var launcher = document.getElementById("chatLauncher");
    var panel = document.getElementById("chatPanel");
    var closeBtn = document.getElementById("chatClose");
    var body = document.getElementById("chatBody");
    var input = document.getElementById("chatInput");
    var sendBtn = document.getElementById("chatSend");
    var suggestionsBox = document.getElementById("chatSuggestions");

    var daftarEkskul = ["Pramuka", "PMR", "Paskibra", "OSIS", "MTQ", "Rohis", "Bahasa Jepang", "Rebana", "Voli", "Tari", "Pencak Silat", "Foster"];

    var konteksHalaman =
        "Kamu adalah asisten chatbot ramah di halaman web 'Pendaftaran Ekstrakurikuler'. " +
        "Formulir ini punya field: Nama Lengkap (minimal 3 karakter), Email (format valid), " +
        "Password (minimal 8 karakter), Konfirmasi Password (harus sama dengan password), " +
        "dan Pilihan Ekstrakurikuler dengan opsi: " + daftarEkskul.join(", ") + ". " +
        "Tugasmu membantu calon peserta yang mengisi form ini: menjawab pertanyaan tentang cara mendaftar, " +
        "syarat tiap field, rekomendasi ekstrakurikuler, atau pertanyaan umum lainnya. " +
        "Jawab dengan singkat, jelas, ramah, dan berbahasa Indonesia, kecuali diminta bahasa lain. " +
        "Jika ditanya hal yang tidak berkaitan dengan sekolah/pendaftaran, tetap jawab semampunya secara singkat.";

    var suggestionList = [
        "Syarat password apa saja?",
        "Rekomendasikan ekstrakurikuler",
        "Bagaimana cara daftar?",
        "Kenapa email saya ditolak?"
    ];

    var sampleFn = null;
    var chatHistory = [];
    var opened = false;

    function addMessage(text, who) {
        var el = document.createElement("div");
        el.className = "msg " + who;
        el.textContent = text;
        body.appendChild(el);
        body.scrollTop = body.scrollHeight;
        return el;
    }

    function addTyping() {
        var el = document.createElement("div");
        el.className = "msg bot typing";
        el.innerHTML = "<span></span><span></span><span></span>";
        body.appendChild(el);
        body.scrollTop = body.scrollHeight;
        return el;
    }

    function renderSuggestions() {
        suggestionsBox.innerHTML = "";
        suggestionList.forEach(function (s) {
            var chip = document.createElement("button");
            chip.className = "chip";
            chip.type = "button";
            chip.textContent = s;
            chip.addEventListener("click", function () {
                input.value = s;
                handleSend();
            });
            suggestionsBox.appendChild(chip);
        });
    }

    // Jawaban cadangan 
    function jawabanCadangan(pertanyaan) {
        var q = pertanyaan.toLowerCase();

        if (q.indexOf("password") !== -1 && q.indexOf("konfirmasi") === -1) {
            return "Password minimal harus 8 karakter. Semakin panjang dan bervariasi (huruf besar, kecil, angka) akan semakin aman.";
        }
        if (q.indexOf("konfirmasi") !== -1) {
            return "Konfirmasi Password harus persis sama dengan Password yang kamu masukkan di atas.";
        }
        if (q.indexOf("email") !== -1) {
            return "Email harus dalam format yang valid, contohnya nama@email.com. Pastikan ada '@' dan domain setelahnya.";
        }
        if (q.indexOf("nama") !== -1) {
            return "Nama Lengkap wajib diisi dan minimal 3 karakter, ya.";
        }
        if (q.indexOf("rekomend") !== -1 || q.indexOf("saran") !== -1 || q.indexOf("pilih ekskul") !== -1) {
            return "Beberapa pilihan yang populer: Paskibra dan Pencak Silat untuk yang suka fisik, Bahasa Jepang untuk yang suka bahasa & budaya, Tari dan Rebana untuk seni, atau OSIS/PMR kalau kamu suka berorganisasi dan membantu orang.";
        }
        if (q.indexOf("apa saja") !== -1 && q.indexOf("ekskul") !== -1) {
            return "Pilihan ekstrakurikulernya: " + daftarEkskul.join(", ") + ".";
        }
        if (q.indexOf("cara daftar") !== -1 || q.indexOf("bagaimana daftar") !== -1) {
            return "Isi Nama, Email, Password, Konfirmasi Password, lalu pilih ekstrakurikuler di dropdown, dan tekan tombol 'Daftar'.";
        }
        return "Aku belum menangkap maksudmu dengan pasti 🙏. Kamu bisa tanya soal cara mengisi form, syarat password/email, atau rekomendasi ekstrakurikuler.";
    }

    async function initSample() {
        try {
            if (window.claude && typeof window.claude.use === "function") {
                sampleFn = await window.claude.use("sample");
            }
        } catch (e) {
            sampleFn = null;
        }
    }

    async function handleSend() {
        var text = input.value.trim();
        if (!text) return;

        addMessage(text, "user");
        chatHistory.push({ role: "user", content: text });
        input.value = "";
        sendBtn.disabled = true;

        var typingEl = addTyping();

        var jawaban = null;

        if (sampleFn) {
            try {
                var messages = [{ role: "user", content: konteksHalaman }];
                var recent = chatHistory.slice(-6);
                recent.forEach(function (m) {
                    messages.push({ role: m.role, content: m.content });
                });

                var res = await sampleFn(messages, { modelTier: "quick" });
                if (res && res.text) {
                    jawaban = res.text.trim();
                }
            } catch (err) {
                jawaban = null;
            }
        }

        if (!jawaban) {
            jawaban = jawabanCadangan(text);
        }

        typingEl.remove();
        addMessage(jawaban, "bot");
        chatHistory.push({ role: "assistant", content: jawaban });
        sendBtn.disabled = false;
    }

    function openPanel() {
        panel.hidden = false;
        opened = true;
        if (body.children.length === 0) {
            addMessage("Hai! 👋 Aku asisten pendaftaran ekstrakurikuler. Ada yang bisa aku bantu seputar form ini?", "bot");
            renderSuggestions();
        }
        input.focus();
    }

    function closePanel() {
        panel.hidden = true;
    }

    launcher.addEventListener("click", function () {
        if (panel.hidden) {
            openPanel();
        } else {
            closePanel();
        }
    });
    closeBtn.addEventListener("click", closePanel);

    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    });

    initSample();
})();
