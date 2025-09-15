let currentLanguage = localStorage.getItem('selectedLanguage') || 'ru';

// Функция установки языка
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    changeLanguage();
}

// Функция обновления текста интерфейса на основе языка
function changeLanguage() {
    const translations = {
        ru: {
            home: 'Главная',
            aboutTest: 'О тесте',
            aboutMe: 'Обо мне',
            blog: 'Блог',
            login: 'Вход',
            aboutTitle: 'О тесте MMPI',
            aboutDescription: 'Миннесотский многофазный личностный опросник (MMPI) — это психологический тест, разработанный для оценки личности и выявления психопатологических отклонений. Он широко используется в клинической психологии, психиатрии и других областях для диагностики и исследования личности.',
            aboutHistoryTitle: 'История теста',
            aboutHistory: 'MMPI был впервые опубликован в 1943 году Старком Хэтэуэем и Дж. Чарнли МакКинли. Тест включает 566 утверждений, на которые испытуемый отвечает «Да», «Нет» или «Не знаю». Вопросы охватывают различные аспекты личности, включая эмоциональное состояние, социальные установки и физическое здоровье.',
            aboutFeatures: 'Особенности теста',
            feature1: 'Мультиязычная поддержка: доступен на русском, английском и турецком языках.',
            feature2: 'Учет пола: адаптированные вопросы для мужчин и женщин.',
            feature3: '10 основных шкал: измерение различных аспектов личности, таких как депрессия, паранойя, социальная интроверсия и другие.',
            feature4: 'Валидностные шкалы: L, F, K для оценки достоверности ответов.',
            aboutInstructions: 'Как пройти тест',
            instruction1: 'Заполните форму с личными данными, включая пол, дату рождения и образование.',
            instruction2: 'Отвечайте на вопросы честно, выбирая «Да», «Нет» или «Не знаю».',
            instruction3: 'После завершения теста вы получите результаты в виде T-баллов и графика.',
            startTestButton: 'Начать тест',
            discoverYourselfTitle: 'Узнайте настоящего себя',
            discoverYourselfSubtitle: 'Пройдите самый точный и надежный тест личности',
            discoverYourselfDescription: 'Вы — уникальный человек с присущими лишь Вам личностными качествами. Некоторые из этих качеств помогают Вам добиваться большего в жизни, в то время как другие мешают Вам и не позволяют полностью использовать все Ваши способности. Ваши личностные качества определяют Ваш будущий успех и счастье.',
            discoverYourselfBenefitsTitle: 'Наш тест позволит Вам:',
            benefit1: 'Узнать свои проблемные области и выяснить каков Ваш уровень счастья, уверенности в себе, стабильности, а также многое другое.',
            benefit2: 'Узнать, как Ваши личные качества влияют на Вашу способность поддерживать отношения с другими людьми.',
            benefit3: 'Узнать Ваши сильные стороны и укрепить их, чтобы Вы могли добиваться в жизни большего.',
            discoverYourselfInstructionsTitle: 'Как заполнять тест:',
            testInstruction1: 'Убедитесь, что вы понимаете каждый вопрос. Пожалуйста, ответьте на все вопросы: чтобы узнать результаты, Вам нужно пройти весь тест целиком.',
            testInstruction2: 'Не задерживайтесь слишком долго на одном вопросе. Отвечайте на него сразу, как только поняли его, и переходите к следующему.',
            testInstruction3: 'Отвечая на вопросы, исходите из того, что происходит в Вашей жизни сейчас, а не происходило в прошлом.',
            testInstruction4: 'Чтобы результат теста был правильным, старайтесь отвечать более точно. Большое количество ответов "Может быть" сделает тест не показательным.'
        },
        en: {
            home: 'Home',
            aboutTest: 'About Test',
            aboutMe: 'About Me',
            blog: 'Blog',
            login: 'Login',
            aboutTitle: 'About the MMPI Test',
            aboutDescription: 'The Minnesota Multiphasic Personality Inventory (MMPI) is a psychological test designed to assess personality traits and identify psychopathological conditions. It is widely used in clinical psychology, psychiatry, and other fields for diagnostics and personality research.',
            aboutHistoryTitle: 'Test History',
            aboutHistory: 'MMPI was first published in 1943 by Starke Hathaway and J. Charnley McKinley. The test consists of 566 statements to which the respondent answers "Yes," "No," or "Don’t know." The questions cover various aspects of personality, including emotional state, social attitudes, and physical health.',
            aboutFeatures: 'Test Features',
            feature1: 'Multilingual support: available in Russian, English, and Turkish.',
            feature2: 'Gender-specific questions: adapted for men and women.',
            feature3: '10 main scales: measuring various personality aspects such as depression, paranoia, social introversion, and more.',
            feature4: 'Validity scales: L, F, K to assess the reliability of responses.',
            aboutInstructions: 'How to Take the Test',
            instruction1: 'Fill out the form with personal information, including gender, date of birth, and education.',
            instruction2: 'Answer the questions honestly by selecting "Yes," "No," or "Don’t know."',
            instruction3: 'Upon completion, you will receive results in the form of T-scores and a graph.',
            startTestButton: 'Start Test',
            discoverYourselfTitle: 'Discover Your True Self',
            discoverYourselfSubtitle: 'Take the Most Accurate and Reliable Personality Test',
            discoverYourselfDescription: 'You are a unique individual with personality traits that are yours alone. Some of these traits help you achieve more in life, while others may hold you back and prevent you from fully utilizing your abilities. Your personality traits determine your future success and happiness.',
            discoverYourselfBenefitsTitle: 'Our Test Will Allow You To:',
            benefit1: 'Identify your problem areas and assess your levels of happiness, confidence, stability, and more.',
            benefit2: 'Understand how your personal qualities affect your ability to maintain relationships with others.',
            benefit3: 'Discover your strengths and build on them to achieve more in life.',
            discoverYourselfInstructionsTitle: 'How to Complete the Test:',
            testInstruction1: 'Ensure you understand each question. Please answer all questions: to see the results, you need to complete the entire test.',
            testInstruction2: 'Don’t spend too long on any one question. Answer it as soon as you understand it and move on to the next.',
            testInstruction3: 'When answering, focus on what is happening in your life now, not in the past.',
            testInstruction4: 'For accurate results, try to answer as precisely as possible. Too many "Maybe" answers may make the test less informative.'
        },
        tr: {
            home: 'Ana Sayfa',
            aboutTest: 'Test Hakkında',
            aboutMe: 'Hakkımda',
            blog: 'Blog',
            login: 'Giriş',
            aboutTitle: 'MMPI Testi Hakkında',
            aboutDescription: 'Minnesota Çok Yönlü Kişilik Envanteri (MMPI), kişilik özelliklerini değerlendirmek ve psikopatolojik durumları belirlemek için tasarlanmış bir psikolojik testtir. Klinik psikoloji, psikiyatri ve diğer alanlarda teşhis ve kişilik araştırmaları için yaygın olarak kullanılır.',
            aboutHistoryTitle: 'Testin Tarihi',
            aboutHistory: 'MMPI, 1943 yılında Starke Hathaway ve J. Charnley McKinley tarafından ilk kez yayınlandı. Test, 566 ifadeden oluşur ve katılımcı bu ifadelere "Evet," "Hayır" veya "Bilmiyorum" şeklinde yanıt verir. Sorular, duygusal durum, sosyal tutumlar ve fiziksel sağlık gibi çeşitli kişilik yönlerini kapsar.',
            aboutFeatures: 'Test Özellikleri',
            feature1: 'Çok dilli destek: Rusça, İngilizce ve Türkçe olarak mevcut.',
            feature2: 'Cinsiyete özel sorular: Erkekler ve kadınlar için uyarlanmış.',
            feature3: '10 ana ölçek: Depresyon, paranoya, sosyal içe kapanıklık gibi çeşitli kişilik yönlerini ölçer.',
            feature4: 'Geçerlilik ölçekleri: Cevapların güvenilirliğini değerlendirmek için L, F, K ölçekleri.',
            aboutInstructions: 'Test Nasıl Yapılır',
            instruction1: 'Cinsiyet, doğum tarihi ve eğitim gibi kişisel bilgileri içeren formu doldurun.',
            instruction2: 'Sorulara dürüstçe "Evet," "Hayır" veya "Bilmiyorum" seçerek yanıt verin.',
            instruction3: 'Testi tamamladıktan sonra sonuçlarınızı T-skorları ve grafik şeklinde alacaksınız.',
            startTestButton: 'Testi Başlat',
            discoverYourselfTitle: 'Gerçek Benliğinizi Keşfedin',
            discoverYourselfSubtitle: 'En Doğru ve Güvenilir Kişilik Testini Yapın',
            discoverYourselfDescription: 'Siz, yalnızca size özgü kişilik özelliklerine sahip benzersiz bir bireysiniz. Bu özelliklerden bazıları hayatta daha fazlasını başarmanıza yardımcı olurken, diğerleri sizi geri tutabilir ve yeteneklerinizi tam olarak kullanmanıza engel olabilir. Kişilik özellikleriniz gelecekteki başarınızı ve mutluluğunuzu belirler.',
            discoverYourselfBenefitsTitle: 'Testimiz Size Şunları Sağlayacak:',
            benefit1: 'Sorunlu alanlarınızı belirleyin ve mutluluk, özgüven, istikrar seviyenizi ve daha fazlasını öğrenin.',
            benefit2: 'Kişisel özelliklerinizin başkalarıyla ilişkilerinizi sürdürme yeteneğinizi nasıl etkilediğini öğrenin.',
            benefit3: 'Güçlü yönlerinizi keşfedin ve bunları geliştirerek hayatta daha fazlasını başarın.',
            discoverYourselfInstructionsTitle: 'Test Nasıl Doldurulur:',
            testInstruction1: 'Her soruyu anladığınızdan emin olun. Lütfen tüm sorulara yanıt verin: Sonuçları görmek için testi tamamen tamamlamanız gerekiyor.',
            testInstruction2: 'Bir soruda çok uzun süre durmayın. Anladığınız anda yanıtlayın ve bir sonrakine geçin.',
            testInstruction3: 'Soruları yanıtlarken şu anki hayatınızdaki duruma odaklanın, geçmişte olanlara değil.',
            testInstruction4: 'Doğru sonuçlar için mümkün olduğunca kesin yanıtlar vermeye çalışın. Çok fazla "Belki" cevabı testi daha az bilgilendirici yapabilir.'
        }
    };
    const t = translations[currentLanguage];
    document.title = t.title || 'Психолог';
    const navLinks = document.querySelectorAll('.nav-center a');
    if (navLinks.length >= 4) {
        navLinks[0].textContent = t.home;
        navLinks[1].textContent = t.aboutTest;
        navLinks[2].textContent = t.aboutMe;
        navLinks[3].textContent = t.blog;
    }
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.lastChild.textContent = ` ${t.login}`;
    }
    // Обновление активного языка в lang-switch
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.querySelectorAll('a[data-lang]').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-lang') === currentLanguage);
        });
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing main.js');

    // Инициализация языка
    const langSwitch = document.getElementById('langSwitch');
    const currentPageLang = window.location.pathname.split('/').pop().split('-')[1]?.split('.')[0] || 'ru';

    // Устанавливаем язык страницы, если он отличается от сохранённого, но не делаем редирект
    setLanguage(currentPageLang);

    // Обработчик переключения языка
    langSwitch.querySelectorAll('a[data-lang]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = link.getAttribute('data-lang');
            localStorage.setItem('selectedLanguage', newLang);
            setLanguage(newLang);
            window.location.href = link.getAttribute('href');
        });
        if (link.getAttribute('data-lang') === currentLanguage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('.nav-center').classList.toggle('active');
        });
    }

    // Прокрутка хедера
    window.addEventListener('scroll', () => {
        document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
    });

    // IntersectionObserver для анимации секций
    const sections = document.querySelectorAll('.section');
    console.log('Found sections:', sections.length);
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log('IntersectionObserver: section', entry.target, 'visible:', entry.isIntersecting);
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
});