// content.js - WhatsApp Web'den mesajları alma ve belirli anahtar kelimeleri arama

// Önceki mesajları bir Set içinde tutalım, böylece aynı mesajı birden fazla kez işlemeyelim
let processedMessages = new Set();

// Mesajları her 10 saniyede bir kontrol et
setInterval(() => {
    let messages = document.querySelectorAll("div.message-in, div.message-out"); // Mesajları seç

    // Her bir mesaj için işlem yap
    messages.forEach(msg => {
        let text = msg.innerText.toLowerCase(); // Mesaj metnini al ve küçük harfe dönüştür

        // Eğer mesaj daha önce işlenmişse, tekrar işlemeyi engelle
        if (processedMessages.has(text)) {
            return;
        }

        console.log("Yeni Mesaj:", text); // Mesajı console'a yazdır

        // Sipariş ile ilgili anahtar kelimeleri kontrol et
        if (text.includes("sipariş") || text.includes("ödeme") || text.includes("fatura")) {
            console.log("✅ Sipariş Algılandı:", text);

            // Backend API'ne siparişi gönder
            sendOrderToBackend(text);
        }

        // İşlenen mesajı kaydet, böylece tekrar işlenmesini engelle
        processedMessages.add(text);
    });
}, 10000); // Her 10 saniyede bir mesajları kontrol et

// Siparişi backend'e gönderme fonksiyonu
function sendOrderToBackend(orderText) {
    fetch("https://senin-api.com/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ order: orderText })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("API Hatası: " + response.statusText);
        }
    })
    .then(data => {
        console.log("✅ Sipariş Gönderildi:", data);
    })
    .catch(error => {
        console.error("❌ Hata:", error);
    });
}
