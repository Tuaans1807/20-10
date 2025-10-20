// ===== BIẾN TOÀN CỤC =====
let currentDialogueIndex = 0;
let currentMusicQuestion = 1;
let totalMusicQuestions = 5;
let currentFinalQuestion = 1;
let totalFinalQuestions = 3;
let heartsInterval;
let imagesInterval;
let stickersInterval;
let endingTimeout;
let dialogueTimeout;

// Danh sách hình ảnh cho câu hỏi (bạn có thể thay đổi đường dẫn ảnh)
const questionImages = [
    'images/ques1.jpg',
    'images/ques2.jpg', 
    'images/ques3.jpg',
    'images/ques4.jpg',
    'images/ques5.jpg'
];

// Danh sách hình ảnh cho phần lời chúc cuối (sử dụng ảnh từ thư mục anhdep)
let wishImages = [
    'images/anhdep/z7135987216423_dc4a4a97c892262b3a5540acee76c79c.jpg',
    'images/anhdep/z7135987230778_2488cf034e34e5f0498bc82e25d11bc0.jpg',
    'images/anhdep/z7135987238212_3beeaf591085ef2914b47a655774b44f.jpg',
    'images/anhdep/z7135987246274_62d41f2198dca778b154ba4c41ef2de5.jpg',
    'images/anhdep/z7135987260411_00ab7ad522bb81d74f4a3343994a573f.jpg',
    'images/anhdep/z7135987279279_bf15b9d5e6433bf8f38031306437a12e.jpg',
    'images/anhdep/z7135987294610_27560c38fc847fa15da7d4d506bdf2b1.jpg',
    'images/anhdep/z7135987304672_d73514e592b785fff4d214b81fc1f3ce.jpg',
    'images/anhdep/z7135987323396_bda922853f87044041aa81d7b2252775.jpg',
    'images/anhdep/z7135987338441_18ed658470f0531b20110c3c4c837e82.jpg',
    'images/anhdep/z7135987357064_eea6f60fbe2c30c27a09752cd9531171.jpg',
    'images/anhdep/anhdep1.png',
    'images/anhdep/anhdep2.png',
    'images/anhdep/anhdep3.png',
    'images/anhdep/anhdep4.png',
    'images/anhdep/anhdep5.png',
    'images/anhdep/anhdep6.png',
    'images/anhdep/anhdep7.png',
    'images/anhdep/anhdep8.png'
];

// Xáo trộn mảng ảnh để hiển thị ngẫu nhiên mỗi lần tải trang (Fisher–Yates)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

wishImages = shuffleArray(wishImages);

// Danh sách hội thoại với phản hồi
const dialogues = [
    {
        text: "Xin chào Bạn",
        needsResponse: true,
        responses: [
            { text: "Xin chào!", reply: "Chào bạn! Rất vui được gặp!" },
            { text: "Rất vui được gặp!", reply: "Mình cũng vui lắm!" },
            { text: "Bạn là ai vậy?", reply: "Mình sẽ giới thiệu ngay!" }
        ]
    },
    {
        text: "Muốn biết thì bấm next ikkkkk  ?",
        needsResponse: false
    },
    {
        text: "Xin tự giới thiệu mình là Mít Tờ Náii",
        needsResponse: true,
        responses: [
            { text: "Tên hay quá!", reply: "Cảm ơn bạn! Mình thích tên này lắm!" },
            { text: "Dễ thương quá!", reply: "Hehe, bạn cũng dễ thương lắm!" },
            { text: "Lạ quá!", reply: "Lạ mà thú vị đúng không?" }
        ]
    },
    {
        text: "Hôm nay sẽ có 1 món quà dành cho bạn",
        needsResponse: true,
        responses: [
            { text: "Thật không?", reply: "Thật 100%! Nhưng phải vượt qua thử thách trước!" },
            { text: "Quà gì vậy?", reply: "Bí mật! Hoàn thành thử thách sẽ biết!" },
            { text: "Tuyệt quá!", reply: "Mình cũng nghĩ vậy!" }
        ]
    },
    {
        text: "Bạn phải cố gắng vượt qua các thử thách kiểm tra đặc biệt của mình để nhận được món quà đó nhé",
        needsResponse: false
    },
    {
        text: "Nếu không vượt qua thì bạn sẽ bị mình đá đítt và sẽ bị cắt tiền trà sữa 3 tháng",
        needsResponse: true,
        responses: [
            { text: "Sợ quá!", reply: "Đừng sợ, mình chỉ đùa thôi! Nhưng hãy cố gắng nhé!" },
            { text: "Không sao!", reply: "Tinh thần tốt! Mình tin bạn sẽ làm được!" },
            { text: "Thử thách gì vậy?", reply: "Bí mật! Rất thú vị đấy!" }
        ]
    },
    {
        text: "Nói chuyện vui ghê ha! Giờ thì đến phần thú vị nè bấm Next ikkikk ✨",
        needsResponse: false
    },
    {
        text: "Bạn hãy chọn 1 nhân vật mang lại sự may mắn cho bạn nhé!",
        needsResponse: false
    }
];

// Danh sách câu hỏi âm nhạc (BẠN CẦN CHỈNH SỬA TẠI ĐÂY)
const musicQuestions = [
    {
        question: "Câu hỏi đầu tiên đơn giản hoii tấm hình này được chụp vào dịp nào ?",
        image: "images/ques1.jpg", // BẠN CẦN THÊM ẢNH VÀO
        options: [
            { text: "Ngày 26 tháng 10 năm 2023", correct: false },
            { text: "Ngày 13 tháng 2 năm 2023", correct: true },
            { text: "Ngày 26 tháng 10 năm 2024", correct: false },
            { text: "Ngày 14 tháng 2 năm 2024", correct: false }
        ]
    },
    {
        question: "Món đồ nào không nằm trong Hộp quà được nhận vào sinh nhật năm ngoái của bạn?",
        image: "images/ques2.jpg", // BẠN CẦN THÊM ẢNH VÀO
        options: [
            { text: "Móc khóa con hổ", correct: false },
            { text: "Vòng tay bạc có thể xem được hình ảnh", correct: true },
            { text: "Mô hình Chibi", correct: false },
            { text: "Sáp thơm", correct: false }
        ]
    },
    {
        question: "Món quà lần đầu tiên vào sài gòn bạn được nhận từ Tũn là gì?",
        image: "images/ques3.jpg", // BẠN CẦN THÊM ẢNH VÀO
        options: [
            { text: "Chó Bông Tũm Tũm", correct: true },
            { text: "Áo Levent màu hồng", correct: false },
            { text: "Vòng tay bạc", correct: false },
            { text: "Chuột logistic", correct: false }
        ]
    },
    {
        question: "20/10/2024 bạn đã đi đâu với Tũn ?",
        image: "images/ques4.jpg", // BẠN CẦN THÊM ẢNH VÀO
        options: [
            { text: "Đi ăn đồ âuuâuu", correct: false },
            { text: "Đi ăn jolibeee", correct: true },
            { text: "Đi ăn buffer", correct: false },
            { text: "Đi ún cà heeeheee", correct: false }
        ]
    },
    {
        question: "Phần bánh nhận được 20/10/2024 có mấy vị taaa",
        image: "images/ques5.jpg", // BẠN CẦN THÊM ẢNH VÀO
        options: [
            { text: "6", correct: false },
            { text: "3 vị", correct: false },
            { text: "5 vị", correct: false },
            { text: "4 vị", correct: true }
        ]
    }
];

// ===== KHỞI TẠO TRANG WEB =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Trang web đã sẵn sàng! 🐷💖');
    
    // Bắt đầu hiệu ứng trái tim bay
    startHeartAnimation();
    
    // Khởi tạo sự kiện
    initializeEvents();
    
    // Bắt đầu phần giới thiệu
    startIntroSequence();
    
    // Thêm event listener cho các nút
    setTimeout(() => {
        const nextBtn = document.getElementById('next-dialogue');
        const testBtn = document.getElementById('test-btn');
        
        console.log('Next button found:', nextBtn);
        console.log('Test button found:', testBtn);
        
        if (nextBtn) {
            console.log('Next button style:', nextBtn.style.cssText);
            console.log('Next button disabled:', nextBtn.disabled);
            console.log('Next button visible:', nextBtn.offsetWidth > 0 && nextBtn.offsetHeight > 0);
            
            // Thêm event listener trực tiếp
            nextBtn.onclick = function(e) {
                e.preventDefault();
                tryStartMusicOnce();
                tryStartYouTubeOnce();
                console.log('Next button clicked!');
                nextDialogue();
            };
        }
        
        // Thêm event cho nút TEST
        if (testBtn) {
            testBtn.onclick = function() {
                console.log('TEST button clicked!');
                nextDialogue();
            };
        }
    }, 1000);
});

// ===== PHẦN 1: GIỚI THIỆU =====

function startIntroSequence() {
    console.log('Starting intro sequence...');
    
    // Khởi tạo hội thoại đầu tiên
    showCurrentDialogue();
    
    // Không tự động chuyển câu, chỉ khi người chơi bấm Next
}

function showCurrentDialogue() {
    const dialogueText = document.getElementById('dialogue-text');
    const nextBtn = document.getElementById('next-dialogue');
    const playerResponse = document.getElementById('player-response');
    
    if (dialogueText) {
        const currentDialogue = dialogues[currentDialogueIndex];
        
        // Hiển thị câu hội thoại hiện tại
        dialogueText.textContent = currentDialogue.text;
        
        // Ẩn phần phản hồi ban đầu
        if (playerResponse) {
            playerResponse.classList.add('hidden');
        }
        
        // Cập nhật nút Next
        if (nextBtn) {
            if (currentDialogueIndex === dialogues.length - 1) {
                nextBtn.textContent = 'Bắt đầu →';
                nextBtn.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
            } else {
                nextBtn.textContent = 'Next →';
                nextBtn.style.background = 'linear-gradient(45deg, #ff6b9d, #ff8fab)';
            }
        }
        
        // Nếu cần phản hồi, hiển thị options
        if (currentDialogue.needsResponse) {
            showResponseOptions(currentDialogue.responses);
        }
    }
}

function showResponseOptions(responses) {
    const playerResponse = document.getElementById('player-response');
    const responseOptions = playerResponse.querySelector('.response-options');
    const playerText = playerResponse.querySelector('#player-text');
    
    if (playerResponse && responseOptions && playerText) {
        // Hiển thị phần phản hồi
        playerResponse.classList.remove('hidden');
        
        // Xóa options cũ
        responseOptions.innerHTML = '';
        
        // Tạo options mới
        responses.forEach((response, index) => {
            const button = document.createElement('button');
            button.className = 'response-btn';
            button.textContent = response.text;
            button.dataset.reply = response.reply;
            button.dataset.index = index;
            
            button.addEventListener('click', function() {
                handlePlayerResponse(this, response.reply);
            });
            
            responseOptions.appendChild(button);
        });
        
        playerText.textContent = 'Tôi chọn: ';
    }
}

function handlePlayerResponse(button, reply) {
    // Đánh dấu button được chọn
    const allButtons = document.querySelectorAll('.response-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    
    // Hiển thị phản hồi của người chơi
    const playerText = document.getElementById('player-text');
    if (playerText) {
        playerText.textContent = 'Tôi chọn: ' + button.textContent;
    }
    
    // Sau 1 giây, hiển thị phản hồi của Tũn
    setTimeout(() => {
        const dialogueText = document.getElementById('dialogue-text');
        if (dialogueText) {
            dialogueText.textContent = reply;
        }
        
        // Ẩn phần phản hồi
        const playerResponse = document.getElementById('player-response');
        if (playerResponse) {
            playerResponse.classList.add('hidden');
        }
        
        // Chuyển sang câu tiếp theo sau 2 giây
        setTimeout(() => {
            nextDialogue();
        }, 2000);
    }, 1000);
}

function nextDialogue() {
    console.log('nextDialogue called, current index:', currentDialogueIndex);
    console.log('Total dialogues:', dialogues.length);
    
    // Xóa timeout tự động nếu có
    if (dialogueTimeout) {
        clearTimeout(dialogueTimeout);
    }
    
    if (currentDialogueIndex < dialogues.length - 1) {
        currentDialogueIndex++;
        console.log('Moving to next dialogue, new index:', currentDialogueIndex);
        showCurrentDialogue();
    } else {
        // Ở câu cuối cùng: hiển thị lựa chọn nhân vật khi bấm "Bắt đầu"
        console.log('Reached end of dialogues → show character selection');
        showCharacterSelection();
    }
}

function startAutoNext() {
    // Xóa timeout cũ nếu có
    if (dialogueTimeout) {
        clearTimeout(dialogueTimeout);
    }
    
    // Tự động chuyển câu sau 5 giây
    dialogueTimeout = setTimeout(() => {
        if (currentDialogueIndex < dialogues.length - 1) {
            nextDialogue();
        }
    }, 5000);
}

function showCharacterSelection() {
    console.log('showCharacterSelection called');
    const characterSelection = document.getElementById('character-selection');
    console.log('character-selection element:', characterSelection);
    
    if (characterSelection) {
        console.log('Before removing hidden class:', characterSelection.classList.contains('hidden'));
        characterSelection.classList.remove('hidden');
        console.log('After removing hidden class:', characterSelection.classList.contains('hidden'));
        
        // Force hiển thị với !important
        characterSelection.style.setProperty('display', 'block', 'important');
        characterSelection.style.setProperty('visibility', 'visible', 'important');
        characterSelection.style.setProperty('opacity', '1', 'important');
        characterSelection.style.setProperty('z-index', '999', 'important');
        characterSelection.style.animation = 'slideInUp 0.8s ease-out';
        
        console.log('Character selection styles applied:', {
            display: characterSelection.style.display,
            visibility: characterSelection.style.visibility,
            opacity: characterSelection.style.opacity,
            zIndex: characterSelection.style.zIndex
        });
        
        // Ẩn vùng điều khiển hội thoại để tránh nhầm lẫn
        const dialogueControls = document.querySelector('.dialogue-controls');
        const playerResponse = document.getElementById('player-response');
        const currentDialogue = document.getElementById('current-dialogue');
        
        if (dialogueControls) {
            dialogueControls.classList.add('hidden');
        }
        if (playerResponse) {
            playerResponse.classList.add('hidden');
        }
        if (currentDialogue) {
            currentDialogue.style.opacity = '0.8';
        }
        
        // Cuộn tới phần lựa chọn nhân vật
        setTimeout(() => {
            characterSelection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    } else {
        console.error('character-selection element not found!');
    }
}

function initializeEvents() {
    // Sự kiện lựa chọn nhân vật
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            handleCharacterSelection(this);
        });
    });
    
    // Sự kiện câu hỏi cuối
    initializeFinalQuestions();
}

function handleCharacterSelection(selectedCard) {
    const allCards = document.querySelectorAll('.character-card');
    
    // Hiệu ứng bất ngờ - luôn chọn Kim Min Tũn
    console.log('User clicked:', selectedCard.getAttribute('data-character'));
    
    // Ẩn tất cả card
    allCards.forEach(card => {
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.9)';
    });
    
    // Hiệu ứng đặc biệt cho Kim Min Tũn (bất kể click gì)
    const kimMinTunCard = document.querySelector('[data-character="kim-min-tun"]');
    if (kimMinTunCard) {
        kimMinTunCard.style.opacity = '1';
        kimMinTunCard.style.transform = 'scale(1.2)';
        kimMinTunCard.classList.add('selected');
        
        // Hiệu ứng trái tim bay
        createHeartEffect(kimMinTunCard);
        
        // Thông báo bất ngờ
        setTimeout(() => {
            showNotification('Bất ngờ chưa! Kim Min Tũn đã được bạn chọn chắc anh ấy tuyệt dời lắmmm! 🎉💖');
        }, 1000);
        
        // Chuyển sang phần âm nhạc sau 3 giây với hiệu ứng mượt mà
        setTimeout(() => {
            // Ẩn character selection với hiệu ứng fade out
            const characterSelection = document.getElementById('character-selection');
            if (characterSelection) {
                characterSelection.style.transition = 'all 0.8s ease-out';
                characterSelection.style.opacity = '0';
                characterSelection.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    characterSelection.classList.add('hidden');
                    switchToMusicQuiz();
                }, 800);
            } else {
                switchToMusicQuiz();
            }
        }, 3000);
    }
}

// ===== PHẦN 2: TRÒ CHƠI ÂM NHẠC =====

function switchToMusicQuiz() {
    const introSection = document.getElementById('intro-section');
    const musicQuizSection = document.getElementById('music-quiz-section');
    const characterSelection = document.getElementById('character-selection');
    
    if (introSection && musicQuizSection) {
        introSection.classList.remove('active');
        musicQuizSection.classList.add('active');
        
        // Ẩn character selection
        if (characterSelection) {
            characterSelection.classList.add('hidden');
        }
        
        // Tạo câu hỏi âm nhạc đầu tiên
        createMusicQuestion();
    }
}

function createMusicQuestion() {
    const container = document.getElementById('music-quiz-container');
    if (!container || currentMusicQuestion > totalMusicQuestions) {
        switchToCongratulations();
        return;
    }
    
    const questionData = musicQuestions[currentMusicQuestion - 1];
    
    // Câu hỏi 4 và 5 ẩn hình ảnh ban đầu
    const shouldHideImage = currentMusicQuestion === 4 || currentMusicQuestion === 5;
    
    container.innerHTML = `
        <div class="music-question">
            <h2>Câu ${currentMusicQuestion}: ${questionData.question}</h2>
            <img src="${questionData.image}" alt="Hình ảnh câu hỏi" 
                 style="${shouldHideImage ? 'display: none;' : ''}" 
                 onerror="this.style.display='none'">
            <div class="music-options">
                ${questionData.options.map((option, index) => `
                    <button class="music-option-btn" data-correct="${option.correct}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Thêm sự kiện cho các nút
    const optionButtons = container.querySelectorAll('.music-option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleMusicAnswer(this);
        });
    });
}

function handleMusicAnswer(button) {
    const isCorrect = button.dataset.correct === 'true';
    
    if (isCorrect) {
        button.classList.add('correct');
        createHeartEffect(button);
        showNotification('Đúng rồi! Ai mà giỏi d taaa 💖');
        
        // Hiển thị hình ảnh cho câu 4 và 5 khi trả lời đúng
        if (currentMusicQuestion === 4 || currentMusicQuestion === 5) {
            const questionImg = document.querySelector('.music-question img');
            if (questionImg) {
                questionImg.style.display = 'block';
                questionImg.style.width = '100%';
                questionImg.style.maxWidth = '600px';
                questionImg.style.maxHeight = '400px';
                questionImg.style.height = 'auto';
                questionImg.style.objectFit = 'contain';
                questionImg.style.margin = '20px auto';
                questionImg.style.borderRadius = '15px';
                questionImg.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                questionImg.style.animation = 'slideInUp 0.8s ease-out';
                questionImg.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                questionImg.style.padding = '10px';
                showNotification('Ai mà giỏiii dị trờiii! 🎉');
            }
        }
        
        setTimeout(() => {
            currentMusicQuestion++;
            createMusicQuestion();
        }, 2000); // Tăng thời gian để người chơi xem hình ảnh
    } else {
        button.classList.add('wrong');
        showNotification('Sai gòiii chọn lại ik đá đít giờ 😤💕');
        
        setTimeout(() => {
            button.classList.remove('wrong');
        }, 1000);
    }
}

// ===== PHẦN 3: CHÚC MỪNG =====

function switchToCongratulations() {
    const musicQuizSection = document.getElementById('music-quiz-section');
    const congratulationsSection = document.getElementById('congratulations-section');
    
    if (musicQuizSection && congratulationsSection) {
        musicQuizSection.classList.remove('active');
        congratulationsSection.classList.add('active');
        
        // Bắt đầu hiệu ứng chúc mừng
        startCongratulationsEffect();
    }
}

function startCongratulationsEffect() {
    // Tạo nhiều trái tim bay với hiệu ứng mạnh hơn
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            createHeartEffect(document.querySelector('.mascot-final'));
        }, i * 150);
    }
    
    // Tạo thêm trái tim bay liên tục
    const congratulationsHearts = setInterval(() => {
        createFloatingHeart(document.getElementById('floating-hearts'));
    }, 300);
    
    // Dừng hiệu ứng sau 10 giây
    setTimeout(() => {
        clearInterval(congratulationsHearts);
    }, 10000);
    
    // Hiển thị thông báo chúc mừng
    setTimeout(() => {
        showNotification('Chúc mừng! Bạn đã vượt qua tất cả thử thách! 🎉💖');
    }, 2000);
}

function startFinalQuestions() {
    const finalQuestions = document.getElementById('final-questions');
    if (finalQuestions) {
        finalQuestions.style.display = 'block';
        finalQuestions.style.animation = 'slideInUp 0.8s ease-out';
    }
}

// ===== PHẦN 4: CÂU HỎI CUỐI =====

function initializeFinalQuestions() {
    const finalButtons = document.querySelectorAll('#final-questions .option-btn');
    finalButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleFinalAnswer(this);
        });
    });
}

function handleFinalAnswer(button) {
    const isCorrect = button.dataset.answer === 'correct';
    const isSpecialButton = button.id === 'final-button' || button.classList.contains('special-btn');
    
    // Nút đặc biệt luôn chuyển sang phần tiếp theo
    if (isSpecialButton) {
        button.classList.add('correct');
        createHeartEffect(button);
        
        // Chuyển sang phần lời chúc cuối ngay lập tức
        setTimeout(() => {
            switchToFinalWish();
        }, 1000);
        return;
    }
    
    if (isCorrect) {
        button.classList.add('correct');
        createHeartEffect(button);
        showNotification('Đúng rồi! Ai mà giỏi d taaa 💖');
        
        setTimeout(() => {
            nextFinalQuestion();
        }, 1500);
    } else {
        button.classList.add('wrong');
        showNotification('Sai gòiii chọn lại ik đá đít giờ 😤💕');
        
        setTimeout(() => {
            button.classList.remove('wrong');
        }, 1000);
    }
}

function nextFinalQuestion() {
    const currentQ = document.getElementById(`final-question-${currentFinalQuestion}`);
    if (currentQ) {
        currentQ.classList.add('hidden');
    }
    
    currentFinalQuestion++;
    
    if (currentFinalQuestion <= totalFinalQuestions) {
        const nextQ = document.getElementById(`final-question-${currentFinalQuestion}`);
        if (nextQ) {
            nextQ.classList.remove('hidden');
            nextQ.style.animation = 'slideInUp 0.8s ease-out';
        }
    } else {
        // Chuyển sang phần lời chúc cuối
        setTimeout(() => {
            switchToFinalWish();
        }, 2000);
    }
}

function switchToFinalWish() {
    const congratulationsSection = document.getElementById('congratulations-section');
    const finalWishSection = document.getElementById('final-wish-section');
    
    if (congratulationsSection && finalWishSection) {
        congratulationsSection.classList.remove('active');
        finalWishSection.classList.add('active');
        
        // Bắt đầu hiệu ứng lời chúc cuối
        startFinalWishSection();
    }
}

// ===== PHẦN 5: LỜI CHÚC CUỐI =====

function startFinalWishSection() {
    console.log('Bắt đầu phần lời chúc cuối! 💖');
    
    // Hiệu ứng typing cho text xong mới bắt đầu hiển thị ảnh
    startTypingEffect(() => {
        startImageSlideshow();
        // Tăng cường hiệu ứng trái tim bay
        startFloatingHearts();
        // Thêm các lớp overlay dễ thương
        createCuteOverlays();
    });
}

function startTypingEffect(onDone) {
    const typingText = document.getElementById('typing-text');
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            if (typeof onDone === 'function') {
                // Nhỏ delay để chắc chắn DOM cập nhật xong
                setTimeout(onDone, 200);
            }
        }
    }, 100);
}

function createSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '20px';
    sparkle.style.height = '20px';
    sparkle.style.background = 'radial-gradient(circle, #fff, #ff69b4)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '100';
    sparkle.style.left = (Math.random() * 200) + 'px';
    sparkle.style.top = (Math.random() * 200) + 'px';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

function startImageSlideshow() {
    // Container toàn màn hình
    let fullscreenContainer = document.getElementById('fullscreen-images');
    if (!fullscreenContainer) {
        fullscreenContainer = document.createElement('div');
        fullscreenContainer.id = 'fullscreen-images';
        fullscreenContainer.style.position = 'fixed';
        fullscreenContainer.style.top = '0';
        fullscreenContainer.style.left = '0';
        fullscreenContainer.style.width = '100vw';
        fullscreenContainer.style.height = '100vh';
        fullscreenContainer.style.pointerEvents = 'none';
        fullscreenContainer.style.zIndex = '1500';
        document.body.appendChild(fullscreenContainer);
    }

    // Tạo grid ảo để tránh đè lên nhau
    const gridSize = 5; // 5x5 grid giúp hình thưa hơn
    const cellWidth = 100 / gridSize; // 25vw mỗi cell
    const cellHeight = 100 / gridSize; // 25vh mỗi cell
    const usedCells = new Set(); // Track cells đã dùng
    
    let currentImageIndex = 0;
    let visibleImages = [];
    const maxVisible = 4; // Tối đa 4 ảnh cùng lúc
    let totalShown = 0; // tổng số ảnh đã hiển thị (đếm theo lần xuất hiện)
    const uniqueCount = Math.min(11, wishImages.length); // chỉ lấy đúng 11 hình
    const maxShows = uniqueCount * 2; // chạy đúng 2 vòng

    function getRandomCell() {
        let attempts = 0;
        while (attempts < 20) { // Tránh vòng lặp vô hạn
            const cellX = Math.floor(Math.random() * gridSize);
            const cellY = Math.floor(Math.random() * gridSize);
            const cellId = `${cellX}-${cellY}`;
            // Tránh chọn cell kề nhau để giảm chồng chéo (loại 8 ô xung quanh)
            let neighborUsed = false;
            for (let dx = -1; dx <= 1 && !neighborUsed; dx++) {
                for (let dy = -1; dy <= 1 && !neighborUsed; dy++) {
                    const nx = cellX + dx;
                    const ny = cellY + dy;
                    if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize) continue;
                    const nid = `${nx}-${ny}`;
                    if (usedCells.has(nid)) neighborUsed = true;
                }
            }

            if (!usedCells.has(cellId) && !neighborUsed) {
                usedCells.add(cellId);
                // Vùng an toàn trong viewport để tránh tràn (theo %)
                const minX = 10, maxX = 90;
                const minY = 12, maxY = 88;
                let x = cellX * cellWidth + (Math.random() * 18 + 4); // 4-22% trong cell
                let y = cellY * cellHeight + (Math.random() * 18 + 4);
                x = Math.max(minX, Math.min(maxX, x));
                y = Math.max(minY, Math.min(maxY, y));
                return { x, y, id: cellId };
            }
            attempts++;
        }
        // Fallback: random position nếu không tìm được cell trống
        const minX = 10, maxX = 90;
        const minY = 12, maxY = 88;
        return {
            x: Math.random() * (maxX - minX) + minX,
            y: Math.random() * (maxY - minY) + minY,
            id: 'fallback'
        };
    }

    function createImageElement() {
        const img = document.createElement('img');
        img.className = 'image-slide';
        img.style.position = 'absolute';
        img.style.opacity = '0';
        img.style.transition = 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
        img.style.maxWidth = '30vw';
        img.style.maxHeight = '30vh';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '20px';
        img.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)';
        img.style.zIndex = '1';
        img.style.pointerEvents = 'auto';
        img.style.cursor = 'pointer';
        
        // Click effect
        img.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'imageFloat 4s ease-in-out infinite';
            }, 10);
            createSparkleEffect(this);
        });
        
        return img;
    }

    function showImage() {
        if (totalShown >= maxShows) {
            // Dừng phát sinh thêm, chuyển sang layout tĩnh rồi banner
            finalizeStaticGrid();
            return;
        }

        const img = createImageElement();
        // chỉ dùng trong 11 ảnh đầu, lặp lại 2 vòng
        const idx = currentImageIndex % uniqueCount;
        img.src = wishImages[idx];
        
        // Lấy vị trí ngẫu nhiên trong grid
        const cell = getRandomCell();
        img.style.left = cell.x + '%';
        img.style.top = cell.y + '%';
        
        // Góc nghiêng nhẹ
        const rotation = (Math.random() - 0.5) * 16; // -8 đến +8 độ
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        img.style.setProperty('--tilt', `${rotation}deg`);
        
        fullscreenContainer.appendChild(img);
        visibleImages.push({ element: img, cellId: cell.id });
        
        // Fade in với hiệu ứng mượt
        requestAnimationFrame(() => {
            img.style.opacity = '1';
            img.style.filter = 'blur(0px) brightness(1)';
            img.classList.add('active');
        });

        currentImageIndex++;
        totalShown++;
        
        // Nếu có quá nhiều ảnh, ẩn ảnh cũ nhất
        if (visibleImages.length > maxVisible) {
            const oldest = visibleImages.shift();
            usedCells.delete(oldest.cellId);
            fadeOutImage(oldest.element);
        }
    }

    function fadeOutImage(img) {
        img.classList.remove('active');
        img.style.transition = 'all 1.1s ease-out';
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8) translate(-50%, -50%) rotate(var(--tilt, 0deg))';
        img.style.filter = 'blur(4px) brightness(0.7)';
        
        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
        }, 1100);
    }

    function finalizeStaticGrid() {
        // Ngừng interval nếu còn chạy
        if (imagesInterval) clearInterval(imagesInterval);

        // Dọn visible queue dần dần để tránh giật
        while (visibleImages.length > 0) {
            const oldest = visibleImages.shift();
            usedCells.delete(oldest.cellId);
            fadeOutImage(oldest.element);
        }

        // Tạo layout tĩnh 11 ảnh và giữ nguyên không lặp lại nữa
        // Sử dụng grid 4x3 để trải đều (chừa bớt 1 ô)
        const cols = 4, rows = 3;
        const cellW = 100 / cols;
        const cellH = 100 / rows;
        for (let i = 0; i < uniqueCount; i++) {
            const img = createImageElement();
            img.src = wishImages[i];
            const cx = i % cols;
            const cy = Math.floor(i / cols);
            const padX = 10 + Math.random() * 8; // 10-18% padding
            const padY = 10 + Math.random() * 8;
            const left = cx * cellW + padX;
            const top = cy * cellH + padY;
            const rotation = (Math.random() - 0.5) * 8;
            img.style.left = left + '%';
            img.style.top = top + '%';
            img.style.maxWidth = '30vw';
            img.style.maxHeight = '30vh';
            img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            img.style.setProperty('--tilt', `${rotation}deg`);
            fullscreenContainer.appendChild(img);
            requestAnimationFrame(() => {
                img.style.opacity = '1';
                img.classList.add('active');
            });
        }

        // Hiển thị banner sau 1 giây để người xem kịp nhìn
        setTimeout(() => {
            showEndingBanner();
        }, 1000);
    }

    // Khởi tạo loạt ảnh đầu tiên (2 tấm ngay lập tức nếu muốn dày hơn)
    showImage();
    setTimeout(showImage, 200);
    
    // Tự động thêm ảnh mới mỗi 2.8 giây
    imagesInterval = setInterval(() => {
        showImage();
    }, 2000);
}

function showEndingBanner() {
    // Gỡ slideshow để nhường spotlight cho banner (ẩn mượt)
    const slideshow = document.getElementById('fullscreen-images');
    if (slideshow) {
        slideshow.style.transition = 'opacity 0.8s ease';
        slideshow.style.opacity = '0.4';
    }
    // Tạo banner nếu chưa có
    let banner = document.getElementById('ending-banner');
    if (!banner) {
        banner = document.createElement('div');
        banner.id = 'ending-banner';
        banner.className = 'ending-banner';
        banner.textContent = '20 / 10 vui vẻ nhan em bé 💖 ';
        document.body.appendChild(banner);
    }
    // Tạo thêm sparkle trái tim xung quanh banner
    const around = setInterval(() => {
        createHeartEffect(banner);
    }, 400);
    // Tự động kết thúc hiệu ứng sau 10s, không khởi động lại để tránh lag
    endingTimeout = setTimeout(() => {
        clearInterval(around);
        if (slideshow) slideshow.style.opacity = '1';
        // Không remove banner để người xem có thể cảm nhận trọn vẹn
    }, 10000);
}

// ===== TẠO OVERLAY DỄ THƯƠNG Ở PHẦN 3 =====
function createCuteOverlays() {
    // Vignette mềm
    if (!document.querySelector('.vignette-overlay')) {
        const v = document.createElement('div');
        v.className = 'vignette-overlay';
        document.body.appendChild(v);
    }
    // Nhãn dán kawaii bay nhẹ
    const emojis = ['💖','✨','🌸','🎀','🐷','💗','💞','🩷','⭐','🌈','🧸'];
    // Tạo một đợt đầu
    spawnStickersBatch(18, emojis);
    // Sau đó cứ mỗi 2s sinh thêm vài sticker nhỏ để màn hình luôn sinh động
    if (stickersInterval) clearInterval(stickersInterval);
    stickersInterval = setInterval(() => {
        spawnStickersBatch(6, emojis);
    }, 2000);
    // Tô điểm glow cho tiêu đề nếu có
    const typing = document.getElementById('typing-text');
    if (typing) typing.classList.add('cute-glow');
}

function spawnStickersBatch(count, emojis) {
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'kawaii-sticker';
        s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        // vị trí start: phân bổ 3 vùng trái, phải, và trên
        const region = Math.random();
        let startXvw;
        if (region < 0.45) startXvw = Math.random() * 22;           // trái 0-22vw
        else if (region < 0.9) startXvw = 78 + Math.random() * 22;   // phải 78-100vw
        else startXvw = 5 + Math.random() * 90;                      // phía trên ngẫu nhiên
        const startYvh = region < 0.9 ? 110 + Math.random() * 20 : -10 - Math.random() * 10;
        const driftX = (Math.random() - 0.5) * 30 + 'vw';
        const driftY = (region < 0.9 ? (-120 - Math.random() * 40) : (120 + Math.random() * 40)) + 'vh';
        const duration = 9 + Math.random() * 10;
        const delay = Math.random() * 2.5;
        s.style.left = startXvw + 'vw';
        s.style.top = startYvh + 'vh';
        s.style.setProperty('--sx', '0');
        s.style.setProperty('--sy', '0');
        s.style.setProperty('--dx', driftX);
        s.style.setProperty('--dy', driftY);
        s.style.fontSize = (16 + Math.random() * 22) + 'px';
        s.style.animationDuration = duration + 's';
        s.style.animationDelay = delay + 's';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), (duration + delay) * 1000);
    }
}

function showImage(img, index) {
    img.style.display = 'block';
    img.style.opacity = '0';
    img.style.transform = 'scale(0.7) translateY(50px)';
    
    // Z-index tăng dần để ảnh mới đè lên ảnh cũ
    img.style.zIndex = (1000 + index).toString();
    
    // Tạo vị trí ngẫu nhiên mới cho mỗi lần hiển thị
    const randomX = Math.random() * 80 + 10; // 10-90%
    const randomY = Math.random() * 80 + 10; // 10-90%
    const randomRotation = (Math.random() - 0.5) * 25; // -12.5 đến +12.5 độ
    const randomScale = 0.8 + Math.random() * 0.6; // 0.8 đến 1.4
    
    img.style.left = randomX + '%';
    img.style.top = randomY + '%';
    img.style.setProperty('--rotation', randomRotation + 'deg');
    img.style.setProperty('--scale', randomScale);
    
    // Hiệu ứng fade in với animation mượt mà
    setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'scale(var(--scale, 1)) translateY(0px) rotate(var(--rotation, 0deg))';
        img.classList.add('active');
    }, 150);
}

function fadeOutImage(img) {
    // Bắt đầu mờ dần ảnh cũ
    img.style.transition = 'all 2s ease-out';
    img.style.opacity = '0.3';
    img.style.filter = 'blur(2px) brightness(0.7)';
    img.classList.remove('active');
    
    // Sau 1 giây, tiếp tục mờ và thu nhỏ
    setTimeout(() => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.5) translateY(-30px) rotate(var(--rotation, 0deg))';
        img.style.filter = 'blur(4px) brightness(0.5)';
    }, 1000);
    
    // Sau 2 giây, ẩn hoàn toàn
    setTimeout(() => {
        img.style.display = 'none';
        img.style.transform = '';
        img.style.filter = '';
        img.style.transition = '';
    }, 2000);
}

function hideImage(img) {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.7) translateY(-50px) rotate(var(--rotation, 0deg))';
    img.classList.remove('active');
    
    setTimeout(() => {
        img.style.display = 'none';
    }, 1200);
}

function startFloatingHearts() {
    const heartsContainer = document.getElementById('floating-hearts-final');
    
    // Tạo trái tim bay liên tục với tần suất cao hơn
    setInterval(() => {
        createFloatingHeart(heartsContainer);
    }, 400);
    
    // Tạo thêm trái tim bay đặc biệt
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart(heartsContainer);
        }, i * 200);
    }
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'heart';
    
    // Vị trí ngẫu nhiên - tạo hiệu ứng ở cả 2 bên
    const isLeftSide = Math.random() < 0.5;
    if (isLeftSide) {
        // Trái tim ở bên trái
        heart.style.left = (Math.random() * 30) + '%';
    } else {
        // Trái tim ở bên phải
        heart.style.left = (70 + Math.random() * 30) + '%';
    }
    
    heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(heart);
    
    // Xóa trái tim sau khi animation kết thúc
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 6000);
}

// ===== HIỆU ỨNG TRÁI TIM =====

function createHeartEffect(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💖', '💕', '💗', '💝', '💘'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            
            // Tạo hiệu ứng trái tim ở nhiều vị trí khác nhau
            if (i < 3) {
                // Trái tim ở giữa
                heart.style.left = (rect.left + rect.width / 2) + 'px';
                heart.style.top = (rect.top + rect.height / 2) + 'px';
            } else if (i < 5) {
                // Trái tim ở bên trái
                heart.style.left = (rect.left - 50 + Math.random() * 100) + 'px';
                heart.style.top = (rect.top + rect.height / 2 + Math.random() * 50) + 'px';
            } else {
                // Trái tim ở bên phải
                heart.style.left = (rect.right + 50 + Math.random() * 100) + 'px';
                heart.style.top = (rect.top + rect.height / 2 + Math.random() * 50) + 'px';
            }
            
            heart.style.fontSize = (1.2 + Math.random() * 0.8) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = 'heartFloat 2s ease-out forwards';
            
            document.body.appendChild(heart);
            
            // Xóa trái tim sau animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

function startHeartAnimation() {
    const heartsContainer = document.getElementById('hearts-container');
    
    if (heartsContainer) {
        heartsInterval = setInterval(() => {
            createFloatingHeart(heartsContainer);
        }, 1500);
    }
}

// ===== THÔNG BÁO =====

function showNotification(message) {
    // Tạo thông báo dễ thương
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #4CAF50, #66BB6A);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(76, 175, 80, 0.4);
        animation: notificationPop 0.5s ease-out;
        font-family: 'Quicksand', sans-serif;
        text-align: center;
        max-width: 300px;
    `;
    
    // Thêm animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notificationPop {
            0% { 
                opacity: 0; 
                transform: translate(-50%, -50%) scale(0.5); 
            }
            100% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1); 
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Tự động xóa sau 2 giây
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'notificationPop 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 2000);
}

// ===== NHẠC NỀN (TÙY CHỌN) =====

let musicStarted = false;
let ytPlayer = null;
let ytStarted = false;

function tryStartMusicOnce() {
    if (musicStarted) return;
    const audio = document.getElementById('background-music');
    if (!audio) return;
    audio.play().then(() => {
        musicStarted = true;
    }).catch(() => {
        // Bị chặn do autoplay, sẽ thử YouTube hoặc thử lại ở lần click sau
    });
}

function onYouTubeIframeAPIReady() {
    const holder = document.getElementById('yt-player');
    if (!holder || typeof YT === 'undefined') return;
    ytPlayer = new YT.Player('yt-player', {
        width: 1,
        height: 1,
        videoId: 'eAuv9J2R6yM',
        playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: 'eAuv9J2R6yM',
            modestbranding: 1
        }
    });
}

function tryStartYouTubeOnce() {
    if (ytStarted || !ytPlayer || typeof ytPlayer.playVideo !== 'function') return;
    try {
        ytPlayer.playVideo();
        ytStarted = true;
    } catch (e) {
        // Nếu vẫn bị chặn, sẽ thử lại lần click sau
    }
}

// ===== UTILITY FUNCTIONS =====

// Hàm để dừng tất cả hiệu ứng
function stopAllEffects() {
    if (heartsInterval) {
        clearInterval(heartsInterval);
    }
    if (imagesInterval) {
        clearInterval(imagesInterval);
    }
}

// Hàm để thay đổi hình ảnh (để bạn có thể tùy chỉnh)
function updateImages(newImages) {
    images.length = 0;
    images.push(...newImages);
}

// Hàm để thay đổi câu hỏi âm nhạc (để bạn có thể tùy chỉnh)
function updateMusicQuestions(newQuestions) {
    musicQuestions.length = 0;
    musicQuestions.push(...newQuestions);
}

// ===== XỬ LÝ LỖI =====

// Xử lý lỗi khi không tải được hình ảnh
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('Không thể tải hình ảnh:', e.target.src);
        e.target.style.display = 'none';
    }
}, true);

// ===== RESPONSIVE HANDLING =====

// Xử lý thay đổi kích thước màn hình
window.addEventListener('resize', function() {
    // Có thể thêm logic xử lý responsive ở đây
    console.log('Kích thước màn hình đã thay đổi');
});

// ===== EXPORT CHO VIỆC TÙY CHỈNH =====

// Các hàm này có thể được gọi từ console để tùy chỉnh
window.customizeWebsite = {
    updateImages: updateImages,
    updateMusicQuestions: updateMusicQuestions,
    stopAllEffects: stopAllEffects
};

console.log('Website đã sẵn sàng! Bạn có thể sử dụng window.customizeWebsite để tùy chỉnh.');