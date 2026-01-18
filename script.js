let currentPage = 0;

const shortTexts = [
    "Klik aku dong 🤍",
    "Selama tiga bulan ini aku kangen banget sama kamu.",
    "Kamu nyebelin… tapi aku suka banget 😆",
    "Kalau kamu capek, jangan pura-pura kuat ya."
];

// Fungsi mengetik otomatis
function typeText(id, text, speed, callback) {
    let i = 0;
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = "";

    function typing() {
        if (i < text.length) {
            if (text.charAt(i) === "\n") {
                el.innerHTML += "<br>";
            } else {
                el.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

// Mulai website & musik
function startWebsite() {
    const music = document.getElementById("bgMusic");
    if (music) {
        music.play().catch(e => console.log("Musik butuh interaksi user"));
    }
    nextPage();
}

function nextPage() {
    const currentEl = document.getElementById(`page${currentPage}`);
    if (currentEl) currentEl.classList.remove("active");

    currentPage++;
    const nextPageEl = document.getElementById(`page${currentPage}`);

    if (nextPageEl) {
        nextPageEl.classList.add("active");

        // Jika halaman pesan pendek
        if (currentPage > 0 && currentPage < 4) {
            typeText(`text${currentPage}`, shortTexts[currentPage], 50);
        }

        // Jika halaman terakhir (Teks Panjang)
        if (currentPage === 4) {
            typeLongText();
        }
    }
}

const longText = `Kamu tahu nggak sih, aku mungkin bukan orang yang pandai merangkai kata.
Aku juga nggak pernah benar-benar menulis pesan sepanjang ini.

Tapi kali ini aku pengin mencoba,
karena ada hal yang ingin aku sampaikan ke kamu dengan sungguh-sungguh.

Aku cuma mau bilang terima kasih.
Terima kasih karena kamu masih mau menerima aku,
dengan segala kekurangan dan kesalahan yang pernah aku buat.

Tentang masa lalu aku.. jangan pernah bikin kamu ovt terus yaa
itu bukan hal yang harus kmu pikirkan.. 
buang jauh jauh okeiii..
itu benar-benar sudah selesai.
Aku sudah move on sepenuhnya,
dan aku tidak menoleh ke belakang lagi.

Aku harap kamu selalu baik-baik saja.
Jaga kesehatanmu,
dan tetap jadi versi terbaik dari dirimu.

Setiap masa ada orangnya,
dan setiap orang punya masanya.
Tapi kamu tidak bisa disandingkan dengan masa,
karena kamu tidak pernah dipisahkan oleh waktu.`;

function typeLongText() {
    // 1. Jalankan fungsi mengetik untuk teks panjang
    typeText("typingLongText", longText, 40, () => {

        // 2. Callback: Fungsi ini berjalan SETELAH teks selesai diketik
        // Kita buat elemen tombol baru
        const btn = document.createElement("button");
        btn.innerText = "Lanjutkan 💖";
        btn.style.marginTop = "20px";
        btn.style.display = "block"; // Supaya tombol berada di baris baru
        btn.style.marginLeft = "auto";
        btn.style.marginRight = "auto";

        // 3. Beri aksi klik pada tombol untuk memanggil halaman hati
        btn.onclick = () => {
            showHeartPage();
        };

        // 4. Masukkan tombol ke dalam kotak teks panjang
        const container = document.querySelector(".long-text-box");
        if (container) {
            container.appendChild(btn);
        }
    });
}

/* ===== FUNGSI HALAMAN LOVE TERAKHIR (STARRY HEART) ===== */
function showHeartPage() {
    // Sembunyikan halaman teks panjang
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    
    // Tampilkan halaman hati
    const heartPage = document.getElementById("heartPage");
    if (heartPage) heartPage.classList.add("active");

    const heartContainer = document.getElementById("heartText");
    const message = document.getElementById("heartMessage");
    const space = document.querySelector(".space-bg");

    if (!heartContainer || !space) return;

    // Bersihkan isi sebelumnya
    heartContainer.innerHTML = "";
    space.innerHTML = "";
    if (message) message.classList.remove("show");

    /* 1. MEMBUAT BINTANG (STARS) */
    for (let i = 0; i < 160; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDuration = (2 + Math.random() * 3) + "s";
        space.appendChild(star);
    }

    /* 2. MEMBUAT BINTANG JATUH (SHOOTING STARS) */
    for (let i = 0; i < 3; i++) {
        const shoot = document.createElement("div");
        shoot.className = "shooting-star";
        shoot.style.top = (Math.random() * 50) + "%";
        shoot.style.left = (Math.random() * 50) + "%";
        shoot.style.animationDelay = (i * 2) + "s";
        space.appendChild(shoot);
    }

    /* 3. MEMBENTUK POLA HATI (HEART SHAPE) */
    const text = "I love you";
    let points = [];

    for (let t = 0; t < Math.PI * 2; t += 0.08) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        points.push({ x, y });
    }

    points.forEach((p, i) => {
        setTimeout(() => {
            const span = document.createElement("span");
            span.innerText = text;
            span.style.position = "absolute";
            // Skala 14 agar pas di layar laptop
            span.style.left = `calc(50% + ${p.x * 14}px)`;
            span.style.top = `calc(50% - ${p.y * 14}px)`;
            heartContainer.appendChild(span);
        }, i * 70);
    });

    /* 4. MEMUNCUKKAN PESAN TENGAH */
    setTimeout(() => {
        if (message) {
            message.classList.add("show");
        }
    }, (points.length * 70) + 1200);
}

// Jalankan teks pertama saat jendela terbuka
window.onload = () => {
    typeText("text0", shortTexts[0], 60);
};