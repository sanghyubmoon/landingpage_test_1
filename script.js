// FAQ 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            answer.style.display = isOpen ? 'none' : 'block';
            question.style.fontWeight = isOpen ? '600' : '700';
            question.style.color = isOpen ? '' : 'var(--primary-color)';
            question.innerHTML = isOpen ? 
                question.innerHTML.replace('−', '+') : 
                question.innerHTML.replace('+', '−');
        });
        
        // 초기 상태 설정
        question.nextElementSibling.style.display = 'none';
    });
});

// 스크롤 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 시 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
    });

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});