// Глобальные переменные
let answers = new Array(566).fill(null);
let currentQuestionIndex = 0;
let gender = 0; // 0 = Мужчина, 1 = Женщина
let age = 0;
let questions;
let education = '';
let birthDate = '';
let surname = '';
let name = '';
let patronymic = '';
let email = '';
let phone = '';
let city = '';
let whatsappTelegram = '';
let currentLanguage = localStorage.getItem('selectedLanguage') || 'tr';

// Объединяем все вопросы в один массив
const allQuestions = [...ruQuestions, ...enQuestions, ...trQuestions];

// Функция для получения вопросов текущего языка
function getCurrentQuestions() {
    return allQuestions.filter(q => q.lang === currentLanguage);
}

// Инициализируем список вопросов
questions = getCurrentQuestions();

// Функция установки языка
function setLanguage(lang) {
    console.log(`Установка языка: ${lang}`);
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    questions = getCurrentQuestions();
    changeLanguage();
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    }
}
const scaleIndices = {
    'L': [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 195, 225, 255, 285],
    'F': { V: [14, 23, 27, 31, 33, 34, 35, 40, 42, 48, 49, 50, 53, 56, 66, 85, 121, 123, 139, 146, 151, 156, 168, 184, 197, 200, 202, 205, 206, 209, 210, 211, 215, 218, 227, 245, 246, 247, 252, 256, 269, 275, 286, 291, 293], N: [17, 20, 54, 65, 75, 83, 112, 113, 115, 164, 169, 177, 185, 196, 199, 220, 257, 258, 272, 276] },
    'K': { V: [96], N: [30, 39, 71, 89, 124, 129, 134, 138, 142, 148, 160, 170, 180, 183, 217, 234, 267, 272, 296, 316, 322, 374, 383, 397, 398, 406, 461, 502] },
    '1': { V: [23, 29, 43, 62, 72, 108, 114, 125, 161, 189, 273], N: [2, 3, 7, 9, 18, 51, 55, 63, 68, 103, 140, 153, 155, 163, 175, 188, 190, 192, 230, 243, 274, 281] },
    '2': { V: [5, 13, 23, 32, 41, 43, 52, 67, 86, 104, 130, 138, 142, 158, 159, 182, 189, 193, 236, 259], N: [2, 8, 9, 18, 30, 36, 39, 46, 51, 57, 58, 64, 80, 88, 89, 95, 98, 107, 122, 131, 145, 152, 153, 154, 155, 160, 178, 191, 207, 208, 238, 241, 242, 248, 263, 270, 271, 272, 285, 296] },
    '3': { V: [10, 23, 32, 43, 44, 47, 76, 114, 179, 186, 189, 238], N: [2, 3, 6, 7, 8, 9, 12, 26, 30, 51, 55, 71, 89, 93, 103, 107, 109, 124, 128, 129, 136, 137, 141, 147, 153, 160, 162, 163, 170, 172, 174, 175, 180, 188, 190, 192, 201, 213, 230, 234, 243, 265, 267, 274, 279, 289, 292] },
    '4': { V: [16, 21, 24, 32, 33, 35, 36, 42, 61, 67, 84, 94, 102, 106, 110, 118, 127, 215, 216, 224, 239, 244, 245, 284], N: [8, 20, 37, 82, 91, 96, 107, 134, 137, 141, 155, 170, 171, 173, 180, 183, 201, 231, 235, 237, 248, 267, 287, 289, 294, 296] },
    '5': { V: gender === 1 ? [4, 25, 70, 74, 77, 78, 87, 92, 126, 132, 133, 134, 140, 149, 187, 203, 204, 217, 226, 239, 261, 278, 282, 295, 299] : [4, 25, 69, 70, 74, 77, 78, 87, 92, 126, 132, 134, 140, 149, 179, 187, 203, 204, 217, 226, 231, 239, 261, 278, 282, 295, 297, 299], N: gender === 1 ? [1, 19, 26, 69, 79, 80, 81, 89, 99, 112, 115, 116, 117, 120, 144, 176, 179, 198, 213, 219, 221, 223, 229, 231, 249, 254, 260, 262, 264, 280, 283, 297, 300] : [1, 19, 26, 28, 79, 80, 81, 89, 99, 112, 115, 116, 117, 120, 133, 144, 176, 198, 213, 214, 219, 221, 223, 229, 249, 254, 260, 262, 264, 280, 283, 300] },
    '6': { V: [15, 16, 22, 24, 27, 35, 110, 121, 123, 127, 151, 157, 158, 202, 275, 284, 291, 293, 299, 305, 317, 338, 341, 364, 365], N: [93, 107, 109, 111, 117, 124, 268, 281, 294, 313, 316, 319, 327, 347, 348] },
    '7': { V: [10, 15, 22, 32, 41, 67, 76, 86, 94, 102, 106, 142, 159, 182, 189, 217, 238, 266, 301, 304, 305, 317, 321, 336, 337, 340, 342, 343, 344, 346, 349, 351, 352, 356, 357, 359, 360, 361], N: [3, 8, 36, 122, 152, 164, 178, 329, 353] },
    '8': { V: [15, 16, 21, 22, 24, 32, 33, 35, 38, 40, 41, 47, 52, 76, 97, 104, 121, 156, 157, 159, 168, 179, 182, 194, 202, 210, 212, 238, 241, 251, 259, 266, 273, 282, 291, 297, 301, 303, 305, 307, 312, 320, 324, 325, 332, 334, 335, 339, 341, 345, 349, 350, 352, 354, 355, 356, 360, 363, 364], N: [8, 17, 20, 37, 65, 103, 119, 177, 178, 187, 192, 196, 220, 276, 281, 306, 309, 322, 330] },
    '9': { V: [11, 13, 21, 22, 59, 64, 73, 97, 100, 109, 127, 134, 145, 156, 157, 167, 181, 194, 212, 222, 226, 228, 232, 233, 238, 240, 250, 251, 263, 266, 268, 271, 277, 279, 298], N: [101, 105, 111, 119, 130, 148, 166, 171, 180, 267, 289] },
    '0': { V: [32, 67, 82, 111, 117, 124, 138, 147, 171, 172, 180, 201, 236, 267, 278, 292, 304, 316, 321, 332, 336, 342, 357, 377, 383, 398, 401, 427, 436, 455, 473, 467, 549, 564], N: [25, 33, 57, 91, 99, 119, 126, 143, 193, 208, 229, 231, 254, 262, 281, 296, 309, 353, 359, 371, 391, 400, 415, 440, 446, 449, 450, 451, 462, 469, 479, 481, 482, 501, 521, 547] }
};
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}
// Функция расчета сырых баллов
function calculateRawScore(scale, positiveIndices, negativeIndices) {
    let score = 0;
    const excludedItems = [14, 33, 48, 63, 66, 69, 121, 123, 133, 151, 168, 182, 184, 197, 200, 205, 266, 275, 293, 334, 349, 350, 462, 464, 474, 542, 551].map(i => i - 1);

    if (scale === 'L') {
        positiveIndices.forEach(idx => {
            const adjustedIdx = idx - 1;
            if (!excludedItems.includes(adjustedIdx) && adjustedIdx >= 0 && adjustedIdx < answers.length && answers[adjustedIdx] === 0) score++; // "Нет" увеличивает балл
        });
    } else {
        positiveIndices.forEach(idx => {
            const adjustedIdx = idx - 1;
            if (!excludedItems.includes(adjustedIdx) && adjustedIdx >= 0 && adjustedIdx < answers.length && answers[adjustedIdx] === 1) score++;
        });
        negativeIndices.forEach(idx => {
            const adjustedIdx = idx - 1;
            if (!excludedItems.includes(adjustedIdx) && adjustedIdx >= 0 && adjustedIdx < answers.length && answers[adjustedIdx] === 0) score++;
        });
    }

    return score;
}
const educationTranslations = {
    shkolnoe: { ru: 'Школьное', en: 'School', tr: 'Okul' },
    srednee_specialnoe: { ru: 'Среднее специальное', en: 'Secondary Special', tr: 'Orta Özel' },
    vysshee: { ru: 'Высшее', en: 'Higher', tr: 'Yüksek' }
};
// Глобальный объект переводов
const translations = {
    ru: {
        formTitle: 'Начать тест',
        resultTitle: 'Результаты',
        submit: 'Завершить тест',
        progressName: 'Аноним',
        male: 'Мужской',
        female: 'Женский',
        notSpecified: 'Не указано',
        resultsHeader: 'Результаты теста MMPI:',
        questionNumber: 'Номер вопроса',
        answer: 'Ответ',
        yes: 'Да',
        no: 'Нет',
        dontKnow: 'Не знаю',
        prev: 'Предыдущая',
        next: 'Следующая',
        page: 'Страница {current} из {total}',
        personalDataTitle: 'Личные данные',
        gender: 'Пол',
        age: 'Возраст',
        education: 'Образование',
        birthDate: 'Дата рождения',
        surname: 'Фамилия',
        name: 'Имя',
        patronymic: 'Отчество',
        email: 'E-mail',
        phone: 'Телефон',
        city: 'Город',
        whatsappTelegram: 'WhatsApp/Telegram',
        // Переводы для графика
        chartTitle: 'Профиль MMPI',
        xAxisLabel: 'Шкалы MMPI',
        datasetLabel: 'T-баллы',
        // Переводы для ошибок
        selectAnswer: 'Пожалуйста, выберите ответ (Да, Не знаю или Нет).',
        unanswered: 'Вы не ответили на вопрос №{num}. Возвращаю к нему.',
        formError: 'Не удалось получить данные формы. Проверьте поля.'
    },
    en: {
        formTitle: 'Start Test',
        resultTitle: 'Results',
        submit: 'Submit Test',
        progressName: 'Anonymous',
        male: 'Male',
        female: 'Female',
        notSpecified: 'Not specified',
        resultsHeader: 'MMPI Test Results:',
        questionNumber: 'Question Number',
        answer: 'Answer',
        yes: 'Yes',
        no: 'No',
        dontKnow: 'Don\'t know',
        prev: 'Previous',
        next: 'Next',
        page: 'Page {current} of {total}',
        personalDataTitle: 'Personal Information',
        gender: 'Gender',
        age: 'Age',
        education: 'Education',
        birthDate: 'Date of Birth',
        surname: 'Surname',
        name: 'Name',
        patronymic: 'Patronymic',
        email: 'E-mail',
        phone: 'Phone',
        city: 'City',
        whatsappTelegram: 'WhatsApp/Telegram',
        // Переводы для графика
        chartTitle: 'MMPI Profile',
        xAxisLabel: 'MMPI Scales',
        datasetLabel: 'T-Scores',
        // Переводы для ошибок
        selectAnswer: 'Please select an answer (Yes, Don\'t know, or No).',
        unanswered: 'You have not answered question #{num}. Returning to it.',
        formError: 'Unable to retrieve form data. Please check the fields.'
    },
    tr: {
        formTitle: 'Testi Başlat',
        resultTitle: 'Sonuçlar',
        submit: 'Testi Tamamla',
        progressName: 'Anonim',
        male: 'Erkek',
        female: 'Kadın',
        notSpecified: 'Belirtilmemiş',
        resultsHeader: 'MMPI Test Sonuçları:',
        questionNumber: 'Soru Numarası',
        answer: 'Cevap',
        yes: 'Evet',
        no: 'Hayır',
        dontKnow: 'Bilmiyorum',
        prev: 'Önceki',
        next: 'Sonraki',
        page: 'Sayfa {current} / {total}',
        personalDataTitle: 'Kişisel Bilgiler',
        gender: 'Cinsiyet',
        age: 'Yaş',
        education: 'Eğitim',
        birthDate: 'Doğum Tarihi',
        surname: 'Soyadı',
        name: 'Ad',
        patronymic: 'Baba Adı',
        email: 'E-posta',
        phone: 'Telefon',
        city: 'Şehir',
        whatsappTelegram: 'WhatsApp/Telegram',
        // Переводы для графика
        chartTitle: 'MMPI Profili',
        xAxisLabel: 'MMPI Ölçekleri',
        datasetLabel: 'T-Skorları',
        // Переводы для ошибок
        selectAnswer: 'Lütfen bir cevap seçin (Evet, Bilmiyorum veya Hayır).',
        unanswered: 'Soru #{num}\'u cevaplamadınız. Ona geri dönüyorum.',
        formError: 'Form verileri alınamadı. Lütfen alanları kontrol edin.'
    }
};
// Объект переводов для формы
const formTranslations = {
    ru: {
        birthDateLabel: 'Дата рождения (ДД.ММ.ГГГГ) *',
        birthDatePlaceholder: 'дд.мм.гггг',
        genderLabel: 'Пол *',
        surnameLabel: 'Фамилия *',
        nameLabel: 'Имя *',
        patronymicLabel: 'Отчество',
        emailLabel: 'E-mail *',
        emailPlaceholder: 'Результаты будут отправлены на этот адрес',
        phoneLabel: 'Телефон *',
        phonePlaceholder: 'Важно заполнить',
        cityLabel: 'Город',
        educationLabel: 'Образование *',
        whatsappTelegramLabel: 'WhatsApp/Telegram',
        whatsappTelegramPlaceholder: 'Введите номер или @username',
        consentLabel: 'Согласие на обработку персональных данных',
        autoCompleteButton: 'Автозаполнить и завершить',
        startButton: 'Начать тест',
        birthDateRequired: 'Поле "Дата рождения" обязательно.',
        birthDateInvalid: 'Укажите корректную дату рождения.',
        genderRequired: 'Поле "Пол" обязательно.',
        surnameRequired: 'Поле "Фамилия" обязательно.',
        nameRequired: 'Поле "Имя" обязательно.',
        emailInvalid: 'Введите корректный E-mail.',
        phoneRequired: 'Поле "Телефон" обязательно.',
        educationRequired: 'Поле "Образование" обязательно.',
        consentRequired: 'Требуется согласие на обработку данных.'
    },
    en: {
        birthDateLabel: 'Date of Birth (DD.MM.YYYY) *',
        birthDatePlaceholder: 'dd.mm.yyyy',
        genderLabel: 'Gender *',
        surnameLabel: 'Surname *',
        nameLabel: 'Name *',
        patronymicLabel: 'Patronymic',
        emailLabel: 'E-mail *',
        emailPlaceholder: 'Results will be sent to this address',
        phoneLabel: 'Phone *',
        phonePlaceholder: 'It is important to fill in',
        cityLabel: 'City',
        educationLabel: 'Education *',
        whatsappTelegramLabel: 'WhatsApp/Telegram',
        whatsappTelegramPlaceholder: 'Enter number or @username',
        consentLabel: 'Consent to personal data processing',
        autoCompleteButton: 'Auto-fill and Finish',
        startButton: 'Start Test',
        birthDateRequired: 'Date of Birth is required.',
        birthDateInvalid: 'Please enter a valid date of birth.',
        genderRequired: 'Gender is required.',
        surnameRequired: 'Surname is required.',
        nameRequired: 'Name is required.',
        emailInvalid: 'Please enter a valid email.',
        phoneRequired: 'Phone is required.',
        educationRequired: 'Education is required.',
        consentRequired: 'Consent to data processing is required.'
    },
    tr: {
        birthDateLabel: 'Doğum Tarihi (GG.MM.YYYY) *',
        birthDatePlaceholder: 'gg.mm.yyyy',
        genderLabel: 'Cinsiyet *',
        surnameLabel: 'Soyadı *',
        nameLabel: 'Ad *',
        patronymicLabel: 'Baba Adı',
        emailLabel: 'E-posta *',
        emailPlaceholder: 'Sonuçlar bu adrese gönderilecek',
        phoneLabel: 'Telefon *',
        phonePlaceholder: 'Örnek: + 90 123 456 7891',
        cityLabel: 'Şehir',
        educationLabel: 'Eğitim *',
        whatsappTelegramLabel: 'WhatsApp/Telegram',
        whatsappTelegramPlaceholder: 'Numara veya @kullanıcıadı girin',
        consentLabel: 'Kişisel verilerin işlenmesine onay',
        autoCompleteButton: 'Otomatik Doldur ve Bitir',
        startButton: 'Testi Başlat',
        birthDateRequired: 'Doğum tarihi zorunludur.',
        birthDateInvalid: 'Lütfen geçerli bir doğum tarihi girin.',
        genderRequired: 'Cinsiyet zorunludur.',
        surnameRequired: 'Soyadı zorunludur.',
        nameRequired: 'Ad zorunludur.',
        emailInvalid: 'Lütfen geçerli bir e-posta girin.',
        phoneRequired: 'Telefon zorunludur.',
        educationRequired: 'Eğitim zorunludur.',
        consentRequired: 'Veri işleme izni zorunludur.'
    }
};

function displayResults() {
    const resultText = document.getElementById('resultText');
    const resultTable = document.getElementById('resultTable');

    if (resultText && resultTable) {
        const rawScores = {
            'L': calculateRawScore('L', scaleIndices['L'], []),
            'F': calculateRawScore('F', scaleIndices['F'].V, scaleIndices['F'].N),
            'K': calculateRawScore('K', scaleIndices['K'].V, scaleIndices['K'].N),
            '1': calculateRawScore('1', scaleIndices['1'].V, scaleIndices['1'].N),
            '2': calculateRawScore('2', scaleIndices['2'].V, scaleIndices['2'].N),
            '3': calculateRawScore('3', scaleIndices['3'].V, scaleIndices['3'].N),
            '4': calculateRawScore('4', scaleIndices['4'].V, scaleIndices['4'].N),
            '5': calculateRawScore('5', scaleIndices['5'].V, scaleIndices['5'].N),
            '6': calculateRawScore('6', scaleIndices['6'].V, scaleIndices['6'].N),
            '7': calculateRawScore('7', scaleIndices['7'].V, scaleIndices['7'].N),
            '8': calculateRawScore('8', scaleIndices['8'].V, scaleIndices['8'].N),
            '9': calculateRawScore('9', scaleIndices['9'].V, scaleIndices['9'].N),
            '0': calculateRawScore('0', scaleIndices['0'].V, scaleIndices['0'].N)
        };

        const kCorrection = { '1': 0.5, '4': 0.4, '7': 1.0, '8': 1.0, '9': 0.2 };
        for (const scale in kCorrection) {
            rawScores[scale] += Math.floor(rawScores['K'] * kCorrection[scale]);
        }

        const tScores = {};
        for (const scale in rawScores) {
            const rawScore = rawScores[scale];
            const { M, σ } = norms[scale] || { M: 0, σ: 1 };
            if (M && σ) {
                const tScore = 50 + 10 * ((rawScore - M) / σ);
                tScores[scale] = Math.max(30, Math.round(tScore));
            } else {
                tScores[scale] = 0;
                console.warn(`Нормы для шкалы ${scale} не найдены, T-балл установлен в 0`);
            }
        }

        const t = translations[currentLanguage];

        resultText.innerHTML = `<h3>${t.resultsHeader}</h3>`;
        const scalesText = document.createElement('p');
        scalesText.style.marginTop = '10px';
        scalesText.style.fontSize = '1em';
        scalesText.style.color = '#333';
        scalesText.textContent = `L = ${tScores['L'] || 'N/A'}, F = ${tScores['F'] || 'N/A'}, K = ${tScores['K'] || 'N/A'}, 1 = ${tScores['1'] || 'N/A'}, 2 = ${tScores['2'] || 'N/A'}, 3 = ${tScores['3'] || 'N/A'}, 4 = ${tScores['4'] || 'N/A'}, 5 = ${tScores['5'] || 'N/A'}, 6 = ${tScores['6'] || 'N/A'}, 7 = ${tScores['7'] || 'N/A'}, 8 = ${tScores['8'] || 'N/A'}, 9 = ${tScores['9'] || 'N/A'}, 0 = ${tScores['0'] || 'N/A'}`;
        resultText.appendChild(scalesText);

        const itemsPerPage = 50;
        let currentPage = 1;
        const totalPages = Math.ceil(answers.length / itemsPerPage);

        function renderTable(page) {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageAnswers = answers.slice(start, end);

            const answersTable = document.createElement('table');
            answersTable.className = 'answers-table';
            answersTable.style.width = '100%';
            answersTable.style.borderCollapse = 'collapse';
            answersTable.style.marginTop = '20px';
            answersTable.innerHTML = `
                <thead>
                    <tr style="background: #f0f0f0;">
                        <th style="border: 1px solid #ddd; padding: 8px;">${t.questionNumber}</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">${t.answer}</th>
                    </tr>
                </thead>
                <tbody>
                    ${pageAnswers.map((answer, index) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${start + index + 1}</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                                ${answer === 1 ? t.yes : answer === 0 ? t.no : t.dontKnow}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            `;

            const pagination = document.createElement('div');
            pagination.className = 'pagination';
            pagination.style.marginTop = '10px';
            pagination.style.textAlign = 'center';
            pagination.innerHTML = `
                <button onclick="changePage(${Math.max(1, currentPage - 1)})" ${currentPage === 1 ? 'disabled' : ''} style="padding: 5px 10px; margin: 0 5px;">${t.prev}</button>
                <span>${t.page.replace('{current}', currentPage).replace('{total}', totalPages)}</span>
                <button onclick="changePage(${Math.min(totalPages, currentPage + 1)})" ${currentPage === totalPages ? 'disabled' : ''} style="padding: 5px 10px; margin: 0 5px;">${t.next}</button>
            `;

            resultTable.innerHTML = '';
            resultTable.appendChild(answersTable);
            resultTable.appendChild(pagination);
            resultTable.style.display = 'block';
        }

        window.changePage = function (page) {
            currentPage = page;
            renderTable(currentPage);
        };

        renderTable(currentPage);

        const pt = translations[currentLanguage];
        const personalData = document.createElement('div');
        personalData.style.marginTop = '20px';
        personalData.innerHTML = `
            <h4>${pt.personalDataTitle}:</h4>
            <p>${pt.gender}: ${gender === 0 ? pt.male : pt.female}</p>
            <p>${pt.age}: ${age || 0}</p>
            <p>${pt.education}: ${educationTranslations[education]?.[currentLanguage] || education || pt.notSpecified}</p>
            <p>${pt.birthDate}: ${birthDate || pt.notSpecified}</p>
            <p>${pt.surname}: ${surname || pt.notSpecified}</p>
            <p>${pt.name}: ${name || pt.notSpecified}</p>
            <p>${pt.patronymic}: ${patronymic || pt.notSpecified}</p>
            <p>${pt.email}: ${email || pt.notSpecified}</p>
            <p>${pt.phone}: ${phone || pt.notSpecified}</p>
            <p>${pt.city}: ${city || pt.notSpecified}</p>
            <p>${pt.whatsappTelegram}: ${whatsappTelegram || pt.notSpecified}</p>
        `;
        resultText.appendChild(personalData);
    } else {
        console.error('Один или несколько элементов результата не найдены');
        resultText.innerHTML = translations[currentLanguage].error || 'Ошибка: не удалось отобразить результаты.';
    }
}
// Функция обновления графика
function updateChart() {
    const ctx = document.getElementById('mmpiChart');
    if (!ctx) {
        console.error('Элемент canvas#mmpiChart не найден');
        return;
    }
    const context = ctx.getContext('2d');
    const chartOrder = ['L', 'F', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const rawScores = {
        'L': calculateRawScore('L', scaleIndices['L'], []),
        'F': calculateRawScore('F', scaleIndices['F'].V, scaleIndices['F'].N),
        'K': calculateRawScore('K', scaleIndices['K'].V, scaleIndices['K'].N),
        '1': calculateRawScore('1', scaleIndices['1'].V, scaleIndices['1'].N),
        '2': calculateRawScore('2', scaleIndices['2'].V, scaleIndices['2'].N),
        '3': calculateRawScore('3', scaleIndices['3'].V, scaleIndices['3'].N),
        '4': calculateRawScore('4', scaleIndices['4'].V, scaleIndices['4'].N),
        '5': calculateRawScore('5', scaleIndices['5'].V, scaleIndices['5'].N),
        '6': calculateRawScore('6', scaleIndices['6'].V, scaleIndices['6'].N),
        '7': calculateRawScore('7', scaleIndices['7'].V, scaleIndices['7'].N),
        '8': calculateRawScore('8', scaleIndices['8'].V, scaleIndices['8'].N),
        '9': calculateRawScore('9', scaleIndices['9'].V, scaleIndices['9'].N),
        '0': calculateRawScore('0', scaleIndices['0'].V, scaleIndices['0'].N)
    };

    const kCorrection = { '1': 0.5, '4': 0.4, '7': 1.0, '8': 1.0, '9': 0.2 };
    for (const scale in kCorrection) {
        rawScores[scale] += Math.floor(rawScores['K'] * kCorrection[scale]);
    }

    const tScores = {};
    for (const scale in rawScores) {
        const rawScore = rawScores[scale];
        const { M, σ } = norms[scale] || { M: 0, σ: 1 };
        if (M && σ) {
            const tScore = 50 + 10 * ((rawScore - M) / σ);
            tScores[scale] = Math.max(30, Math.round(tScore));
        } else {
            tScores[scale] = 0;
            console.warn(`Нормы для шкалы ${scale} не найдены, T-балл установлен в 0`);
        }
    }

    // Проверяем, существует ли Chart.js и является ли mmpiChart экземпляром Chart
    if (window.mmpiChart && typeof window.mmpiChart.destroy === 'function') {
        window.mmpiChart.destroy();
    }

    window.mmpiChart = new Chart(context, {
        type: 'line',
        data: {
            labels: chartOrder,
            datasets: [{
                label: translations[currentLanguage].datasetLabel,
                data: chartOrder.map(scale => tScores[scale]),
                borderColor: context => context.dataset.data[context.dataIndex] > 70 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 120,
                    ticks: { stepSize: 10 }
                },
                x: {
                    title: {
                        display: true,
                        text: translations[currentLanguage].xAxisLabel
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: translations[currentLanguage].chartTitle
                }
            }
        }
    });
}
// function autoFillAnswers() {
//     answers = new Array(566); // Инициализация массива нулями

//     // 1–100: "Да" (1)
//     for (let i = 0; i < 100; i++) {
//         answers[i] = 1;
//     }

//     // 101–200: "Нет" (0)
//     for (let i = 100; i < 200; i++) {
//         answers[i] = 0;
//     }

//     // 201–300: "Да" (1)
//     for (let i = 200; i < 300; i++) {
//         answers[i] = 1;
//     }

//     // 301–400: "Нет" (0)
//     for (let i = 300; i < 400; i++) {
//         answers[i] = 0;
//     }

//     // 401–500: "Да" (1)
//     for (let i = 400; i < 500; i++) {
//         answers[i] = 1;
//     }

//     // 501–566: чередование "Да" (1) и "Нет" (0), начиная с "Да"
//     for (let i = 500; i < 566; i++) {
//         answers[i] = (i - 500) % 2 === 0 ? 1 : 0; // Четные индексы (500, 502, ...) — "Да", нечетные — "Нет"
//     }

//     return answers;
// }

const norms = {
    'L': { M: 4.2, σ: 2.9 },
    'F': { M: 2.76, σ: 4.67 }, // Обновлено
    'K': { M: 12.1, σ: 5.4 },
    '1': { M: 11.1, σ: 3.9 },
    '2': { M: 16.6, σ: 4.11 },
    '3': { M: 16.46, σ: 5.4 },
    '4': { M: 18.68, σ: 4.11 },
    '5': { M: 20.46, σ: 5.0 },
    '6': { M: 7.9, σ: 3.4 },
    '7': { M: 23.06, σ: 5.0 }, // Обновлено
    '8': { M: 22, σ: 5.0 },
    '9': { M: 17.0, σ: 4.06 },
    '0': { M: 25, σ: 5 }
};

function displayQuestion() {
    const t = translations[currentLanguage];
    const currentQuestion = questions[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const progressIndicator = document.getElementById('progressIndicator');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    const showResultBtn = document.getElementById('showResultBtn');
    const answerOptions = document.getElementById('answerOptions');

    if (!currentQuestion || !questionText) {
        console.error('Не удалось найти элементы или вопрос для отображения');
        return;
    }

    // Выбираем текст и шкалы в зависимости от пола
    const displayText = (gender === 1 && currentQuestion.femaleText) ? currentQuestion.femaleText : currentQuestion.text;
    const currentScales = (gender === 1 && currentQuestion.femaleScales) ? currentQuestion.femaleScales : currentQuestion.scales;

    // Обновляем текст вопроса
    questionText.innerHTML = `<span class="question-number">${currentQuestion.number}.</span> <span class="question-text">${displayText}</span>`;
    if (currentQuestionElement) {
        currentQuestionElement.textContent = currentQuestion.number;
    }

    // Обновляем прогресс
    const progressPercent = ((currentQuestionIndex + 1) / 566) * 100;
    if (progressIndicator) {
        progressIndicator.style.width = `${progressPercent}%`;
    }

    // Обновляем кнопки ответов
    if (answerOptions) {
        answerOptions.innerHTML = `
            <button id="yesBtn" class="answer-btn" data-value="1">${t.yes}</button>
            <button id="noBtn" class="answer-btn" data-value="0">${t.no}</button>
            <button id="dontKnowBtn" class="answer-btn" data-value="-1">${t.dontKnow}</button>
        `;

        const currentAnswer = answers[currentQuestionIndex];
        console.log(`Вопрос ${currentQuestionIndex + 1} (номер ${currentQuestion.number}): Текущий ответ = ${currentAnswer}, Пол = ${gender}, Шкалы = ${currentScales}`);

        document.querySelectorAll('.answer-btn').forEach(button => {
            const buttonValue = parseInt(button.getAttribute('data-value'));
            button.classList.remove('selected');
            if (currentAnswer !== null && currentAnswer !== undefined && buttonValue === currentAnswer) {
                button.classList.add('selected');
                console.log(`Выделена кнопка "${button.textContent}" с значением ${buttonValue}`);
            }
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                document.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                answers[currentQuestionIndex] = buttonValue;
                console.log(`Сохранен ответ для вопроса ${currentQuestionIndex + 1} (номер ${currentQuestion.number}): ${buttonValue} (${button.textContent})`);
                if (currentQuestionIndex < 565) {
                    currentQuestionIndex++;
                    displayQuestion();
                } else {
                    if (nextArrow) nextArrow.style.display = 'none';
                    if (showResultBtn) showResultBtn.style.display = 'inline-block';
                }
            });
        });
    }

    // Обновляем видимость стрелок
    if (prevArrow) {
        prevArrow.style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
        prevArrow.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    }
    if (nextArrow && showResultBtn) {
        if (currentQuestionIndex === questions.length - 1) {
            nextArrow.style.display = 'none';
            showResultBtn.style.display = 'inline-block';
        } else {
            nextArrow.style.display = 'inline-block';
            showResultBtn.style.display = 'none';
        }
    }

    // Сохраняем текущие шкалы для использования в calculateRawScore
    currentQuestion.scales = currentScales;
}
function changeLanguage() {
    console.log(`Обновление интерфейса для языка: ${currentLanguage}`);
    const lang = currentLanguage;
    const t = translations[lang];
    const ft = formTranslations[lang];

    const formTitle = document.querySelector('.form-title');
    const resultTitle = document.getElementById('resultTitle');
    const showResultBtn = document.getElementById('showResultBtn');
    const progressName = document.querySelector('.progress-name');
    if (formTitle) formTitle.textContent = t.formTitle;
    if (resultTitle) resultTitle.textContent = t.resultTitle;
    if (showResultBtn) showResultBtn.textContent = t.submit;
    if (progressName) progressName.textContent = t.progressName;

    document.querySelector('label[for="birthDate"]').textContent = ft.birthDateLabel;
    document.getElementById('birthDate').placeholder = ft.birthDatePlaceholder;
    document.querySelector('label[for="gender"]').textContent = ft.genderLabel;
    document.querySelector('label[for="surname"]').textContent = ft.surnameLabel;
    document.querySelector('label[for="name"]').textContent = ft.nameLabel;
    document.querySelector('label[for="patronymic"]').textContent = ft.patronymicLabel;
    document.querySelector('label[for="email"]').textContent = ft.emailLabel;
    document.getElementById('email').placeholder = ft.emailPlaceholder;
    document.querySelector('label[for="phone"]').textContent = ft.phoneLabel;
    document.getElementById('phone').placeholder = ft.phonePlaceholder;
    document.querySelector('label[for="city"]').textContent = ft.cityLabel;
    document.querySelector('label[for="education"]').textContent = ft.educationLabel;
    document.querySelector('label[for="whatsappTelegram"]').textContent = ft.whatsappTelegramLabel;
    document.getElementById('whatsappTelegram').placeholder = ft.whatsappTelegramPlaceholder;
    document.querySelector('label[for="consent"]').textContent = ft.consentLabel;

    document.querySelector('button[onclick="autoCompleteTest()"]').textContent = ft.autoCompleteButton;
    document.querySelector('button[onclick="startTest()"]').textContent = ft.startButton;

    const genderOptions = document.getElementById('gender').options;
    genderOptions[0].text = translations[lang].male;
    genderOptions[1].text = translations[lang].female;

    const educationOptions = document.getElementById('education').options;
    educationOptions[0].text = educationTranslations.shkolnoe[lang];
    educationOptions[1].text = educationTranslations.srednee_specialnoe[lang];
    educationOptions[2].text = educationTranslations.vysshee[lang];

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    }

    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer && resultContainer.style.display === 'block' && window.mmpiChart) {
        updateChart();
    }
}
window.startTest = function () {
    console.log('startTest вызвана');
    document.querySelectorAll('.error').forEach(error => {
        error.classList.remove('visible');
        error.textContent = '';
    });

    const genderSelect = document.getElementById('gender');
    const birthDateInput = document.getElementById('birthDate');
    const educationSelect = document.getElementById('education');
    const surnameInput = document.getElementById('surname');
    const nameInput = document.getElementById('name');
    const patronymicInput = document.getElementById('patronymic') || { value: '' };
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const cityInput = document.getElementById('city') || { value: '' };
    const whatsappTelegramInput = document.getElementById('whatsappTelegram') || { value: '' };
    const consentInput = document.getElementById('consent');

    let hasErrors = false;
    const t = formTranslations[currentLanguage];

    // Валидация даты рождения
    if (!birthDateInput.value) {
        document.getElementById('birthDateError').textContent = t.birthDateRequired;
        document.getElementById('birthDateError').classList.add('visible');
        hasErrors = true;
    } else if (!/^\d{2}\.\d{2}\.\d{4}$/.test(birthDateInput.value)) {
        document.getElementById('birthDateError').textContent = t.birthDateInvalid;
        document.getElementById('birthDateError').classList.add('visible');
        hasErrors = true;
    } else {
        const [day, month, year] = birthDateInput.value.split('.').map(Number);
        const date = new Date(year, month - 1, day);
        if (isNaN(date) || date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
            document.getElementById('birthDateError').textContent = t.birthDateInvalid;
            document.getElementById('birthDateError').classList.add('visible');
            hasErrors = true;
        } else {
            birthDate = birthDateInput.value;
            age = calculateAge(birthDate);
            if (age < 16 || age > 120) {
                document.getElementById('birthDateError').textContent = t.birthDateInvalid;
                document.getElementById('birthDateError').classList.add('visible');
                hasErrors = true;
            }
        }
    }

    // Валидация пола
    if (!genderSelect.value && genderSelect.value !== '0' && genderSelect.value !== '1') {
        document.getElementById('genderError').textContent = t.genderRequired;
        document.getElementById('genderError').classList.add('visible');
        hasErrors = true;
    } else {
        gender = parseInt(genderSelect.value);
    }

    // Остальная валидация
    if (!surnameInput.value.trim()) {
        document.getElementById('surnameError').textContent = t.surnameRequired;
        document.getElementById('surnameError').classList.add('visible');
        hasErrors = true;
    } else {
        surname = surnameInput.value;
    }

    if (!nameInput.value.trim()) {
        document.getElementById('nameError').textContent = t.nameRequired;
        document.getElementById('nameError').classList.add('visible');
        hasErrors = true;
    } else {
        name = nameInput.value;
    }

    if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        document.getElementById('emailError').textContent = t.emailInvalid;
        document.getElementById('emailError').classList.add('visible');
        hasErrors = true;
    } else {
        email = emailInput.value;
    }

    if (!phoneInput.value.trim()) {
        document.getElementById('phoneError').textContent = t.phoneRequired;
        document.getElementById('phoneError').classList.add('visible');
        hasErrors = true;
    } else {
        phone = phoneInput.value;
    }

    if (!educationSelect.value) {
        document.getElementById('educationError').textContent = t.educationRequired;
        document.getElementById('educationError').classList.add('visible');
        hasErrors = true;
    } else {
        education = educationSelect.value;
    }

    if (!consentInput.checked) {
        document.getElementById('consentError').textContent = t.consentRequired;
        document.getElementById('consentError').classList.add('visible');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // Инициализация теста
    answers = new Array(566).fill(null);
    currentQuestionIndex = 0;
    patronymic = patronymicInput.value || translations[currentLanguage].notSpecified;
    city = cityInput.value || translations[currentLanguage].notSpecified;
    whatsappTelegram = whatsappTelegramInput.value || translations[currentLanguage].notSpecified;

    const intro = document.getElementById('intro');
    const questionContainer = document.getElementById('questionContainer');
    if (intro && questionContainer) {
        intro.style.display = 'none';
        questionContainer.style.display = 'block';
        displayQuestion();
    }
};
window.submitTest = function () {
    const unansweredIndex = answers.findIndex(a => a === undefined || a === null);
    if (unansweredIndex !== -1) {
        alert(`Вы не ответили на вопрос №${unansweredIndex + 1}. Возвращаю к нему.`);
        currentQuestionIndex = unansweredIndex;
        const questionContainer = document.getElementById('questionContainer');
        if (questionContainer) {
            questionContainer.style.display = 'block';
            displayQuestion();
        }
        return;
    }

    const questionContainer = document.getElementById('questionContainer');
    const resultContainer = document.getElementById('resultContainer');
    if (questionContainer && resultContainer) {
        questionContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        try {
            updateChart();
            displayResults();
        } catch (error) {
            console.error('Ошибка при обновлении результатов:', error);
            document.getElementById('resultText').textContent = 'Произошла ошибка при расчете результатов. Проверьте консоль.';
        }
    }
};
document.addEventListener("DOMContentLoaded", () => {
    // Нормы T-баллов
    const maleNorms = {
        'Лжи': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70],
        'Достоверности': [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
        'Коррекции': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70],
        '1': [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 80, 80, 80, 80],
        '2': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '3': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '4': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '5': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '6': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '7': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '8': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '9': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '0': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]
    };

    const femaleNorms = {
        'Лжи': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70],
        'Достоверности': [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
        'Коррекции': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70],
        '1': [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 80, 80, 80, 80],
        '2': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '3': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '4': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '5': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '6': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '7': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '8': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '9': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        '0': [30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]
    };
    const ballastItems = [14, 33, 48, 63, 66, 69, 121, 123, 133, 151, 168, 182, 184, 197, 200, 205, 266, 275, 293, 349, 350, 462, 464, 474, 551, 542];



    const excludedItems = [14, 33, 48, 63, 66, 69, 121, 123, 133, 151, 168, 182, 184, 197, 200, 205, 266, 275, 293, 334, 349, 350, 462, 464, 474, 542, 551].map(i => i - 1);
    let selectedValue = null;


    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            const nextButton = document.querySelector('button[onclick="nextQuestion()"]');
            if (nextButton && nextButton.style.display !== 'none') {
                nextButton.click();
            }
        }
    });

    window.nextQuestion = function () {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            alert('Пожалуйста, выберите ответ.');
            return;
        }

        answers[currentQuestionIndex] = parseInt(selectedAnswer.value);
        currentQuestionIndex++;

        if (currentQuestionIndex < 566) {
            displayQuestion();
        } else {
            // Проверим на незаполненные
            const unansweredIndex = answers.findIndex(a => a === null || a === undefined);
            if (unansweredIndex !== -1) {
                alert(`Вы не ответили на вопрос №${unansweredIndex + 1}.`);
                currentQuestionIndex = unansweredIndex;
                displayQuestion();
            } else {
                document.querySelector('button[onclick="nextQuestion()"]').style.display = 'none';
                document.querySelector('button[onclick="submitTest()"]').style.display = 'inline-block';
            }
        }
    };
    document.getElementById('prevArrow').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    document.getElementById('nextArrow').addEventListener('click', () => {
        if (answers[currentQuestionIndex] === undefined || answers[currentQuestionIndex] === null) {
            alert('Пожалуйста, выберите ответ (Да, Не знаю или Нет).');
            return;
        }
        if (currentQuestionIndex < 565) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            document.getElementById('nextArrow').style.display = 'none';
            document.getElementById('showResultBtn').style.display = 'inline-block';
        }
    });
    function changeLanguage() {
        const lang = document.getElementById('language').value;
        const translations = {
            ru: { next: 'Следующий', submit: 'Завершить тест', title: 'Тест MMPI (566 Вопросов)' },
            en: { next: 'Next', submit: 'Submit Test', title: 'MMPI Test (566 Questions)' },
            tr: { next: 'Sonraki', submit: 'Testi Tamamla', title: 'MMPI Testi (566 Soru)' }
        };
        const t = translations[lang];
        document.getElementById('title').textContent = t.title;
        document.querySelector('button[onclick="nextQuestion()"]').textContent = t.next;
        document.querySelector('button[onclick="submitTest()"]').textContent = t.submit;
    }

    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.nav-center').classList.toggle('active');
    });

    window.addEventListener('scroll', () => {
        document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
    });

    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
});
