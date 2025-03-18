document.addEventListener("DOMContentLoaded", function () {
  let isMuted = false;
  let stepProses = 0;
  let audio = document.getElementById("audio");
  let isTyping = false; // Menandakan apakah efek typewriter sedang berjalan
  let stopTyping = false; // Flag untuk menghentikan efek typewriter
  let typingTimeout; // Variabel untuk menyimpan setTimeout

  // Perbaiki container
  const container = document.createElement("h3");
  container.id = "text-container";
  document.body.appendChild(container);

  const textSteps = [
    [
      "Hai Mariska, i like your hair btw hehe\nTadinya tuh mau kasih ucapan lewat WhatsApp aja\nTapi kalo kayak gitu pasti cuma di baca doang"
    ],
    [
      "Jadi aku bikin ini deh\nBiar beda aja\nBiar keliatan effort\nBiar kalau kamu tetep enggak peduli, seenggaknya aku bisa bilang ..."
    ],
    ["Yang penting udah berusaha :)"],
    [
      "Selamat ulang tahun yang ke-21\nUsiamu bertambah, pesonamu makin kuat, sementara aku...\nMasih stuck di fase denial, kayak bug yang aku sendiri enggak bisa benerin"
    ],
    [
      "Jujur, tadinya aku pengen kasih kado spesial\nTapi setelah dipikir-pikir, aku terlalu mahal untuk dibungkus\nJadi cukup doa aja"
    ],
    [
      "Semoga panjang umur, sehat selalu, dan\nsemoga aku bisa ketemu tombol uninstall buat suka sama kamu."
    ],
    [
      "Tapi yaudah lah, walaupun aku cuman NPC di cerita kamu, aku tetap berharap kamu bahagia."
    ],
    ["Sekali lagi, selamat ulang tahun Mariska.\nJangan lupa bahagia. 🎂"]
  ];

  document.getElementById("song1").addEventListener("click", function () {
    playSong("music/birthday_girl.mp3");
  });

  document.getElementById("song2").addEventListener("click", function () {
    playSong("music/hbd_deathcore.mp3");
  });

  function playSong(song) {
    stepProses = 1;
    document.getElementById("title").classList.add("fade-out");
    document.querySelector(".button-container").classList.add("fade-out");
    document.getElementById("controls").classList.add("hidden");

    setTimeout(() => {
      document.querySelector(".button-container").classList.add("hidden");
      document.querySelector(".navigation-buttons").classList.add("show");
      document.getElementById("title").classList.add("hidden");
      document.getElementById("controls").classList.add("show");

      audio.src = song;
      audio.load();
      audio.play();

      showText(textSteps[0]);
    }, 1000);
  }

  document.getElementById("mute-button").addEventListener("click", function () {
    isMuted = !isMuted;
    audio.muted = isMuted;
    this.innerHTML = isMuted
      ? '<i class="fas fa-volume-mute"></i>'
      : '<i class="fas fa-volume-up"></i>';
  });

  document.getElementById("next-button").addEventListener("click", function () {
    if (isTyping) {
      finishText();
      return;
    } else {
      if (stepProses < textSteps.length) {
        stopTyping = false; // Reset flag saat berpindah ke teks baru
        showText(textSteps[stepProses]);
        stepProses++;
      }

      document
        .getElementById("prev-button")
        .classList.toggle("show", stepProses > 1);

      // Pastikan tombol "Next" hilang saat mencapai teks terakhir
      this.classList.toggle("hidden", stepProses >= textSteps.length);
    }
  });

  document.getElementById("prev-button").addEventListener("click", function () {
    if (isTyping) {
      finishText();
      return;
    }

    if (stepProses > 1) {
      stepProses--; // Kembali ke step sebelumnya
      showText(textSteps[stepProses - 1]); // Tampilkan teks sebelumnya
    }

    document
      .getElementById("next-button")
      .classList.toggle("hidden", stepProses >= textSteps.length);

    this.classList.toggle("show", stepProses > 1);
  });

  function showText(textArray) {
    if (isTyping) return; // Hindari pemanggilan ganda

    isTyping = true;
    container.classList.add("fade-out");

    setTimeout(() => {
      container.innerHTML = ""; // Reset teks sebelum mulai ngetik lagi
      container.classList.remove("fade-out");

      let fullText = textArray.join("\n");
      typeWriter(fullText);
    }, 500);
  }

  function typeWriter(text) {
    let i = 0; // Reset setiap kali fungsi dipanggil
    container.innerHTML = ""; // Bersihin teks biar gak nabrak

    function typing() {
      if (stopTyping) {
        container.innerHTML = text.includes("\n")
          ? text.replace(/\n/g, "<br>")
          : text;
        isTyping = false;
        return;
      }

      if (i < text.length) {
        container.innerHTML += text[i] === "\n" ? "<br>" : text[i];
        i++;
        setTimeout(typing, 50);
      } else {
        isTyping = false;
      }
    }

    typing();
  }

  function finishText() {
    stopTyping = true; // Set flag untuk menghentikan efek mengetik
    isTyping = false;
  }
});
