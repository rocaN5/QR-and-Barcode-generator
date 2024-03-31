
document.getElementById("qr-text").addEventListener("input", function() {
    generateCodes();
});

function generateCodes() {
    var qrText = document.getElementById("qr-text").value;
    var qrCodeDiv = document.getElementById("qr-code");
    qrCodeDiv.innerHTML = "";

    if (qrText.trim() === "") {
        var messageElement = document.createElement("p");
        messageElement.textContent = "Введите текст в поле ввода, чтобы сгенерировать QR-код.";
        qrCodeDiv.appendChild(messageElement);
        return;
    }

    // Создание и добавление h1 "СЦ Воронеж" и span с датой и временем в один div
    var companyInfoDiv = document.createElement("div");
    companyInfoDiv.id = "company-info";
    var companyName = document.createElement("h1");
    companyName.textContent = "СЦ Воронеж";
    var dateTime = document.createElement("span");
    dateTime.id = "datetime";
    dateTime.textContent = getCurrentDateTime();
    companyInfoDiv.appendChild(companyName);
    companyInfoDiv.appendChild(dateTime);
    qrCodeDiv.appendChild(companyInfoDiv);

    // Генерация QR-кода
    var qrCode = document.createElement("img");
    qrCode.src = "https://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(qrText) + "&size=200x200";
    qrCode.alt = "QR Code";
    qrCodeDiv.appendChild(qrCode);

    var qrTextElement = document.createElement("p");
    qrTextElement.textContent = qrText;
    qrCodeDiv.appendChild(qrTextElement);

    // Ограничение на генерацию баркода
    if (qrText.trim().length >= 9 && qrText.trim().length <= 28) {
        var barcodeCanvas = document.createElement("canvas");
        barcodeCanvas.id = "barcode";
        qrCodeDiv.appendChild(barcodeCanvas);

        // Генерация штрих-кода с использованием bwip-js
        bwipjs.toCanvas(barcodeCanvas, {
            bcid: "code128",         // Тип штрих-кода
            text: qrText,            // Текст для кодирования
            scale: 2,                // Масштаб
            height: 10,              // Высота
            includetext: true,       // Включить отображение текста
            textxalign: "center"     // Выравнивание текста по горизонтали
        });
    }

    
}

function getCurrentDateTime() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    return (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year + ' ' +
           (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function printQRCode() {
    window.print();
}