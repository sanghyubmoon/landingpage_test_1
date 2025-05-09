document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 이벤트 처리
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        
        // 헤더 스타일 변경
        if (scrollPosition > 50) {
            header.style.padding = '0.7rem 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        // 스크롤 애니메이션 적용
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                el.classList.add('animated');
            }
        });
    });
    
    // 부드러운 스크롤 처리
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 모바일 메뉴 토글
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.backgroundColor = 'white';
                nav.style.padding = '1rem';
                nav.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
            }
            
            // 모바일 메뉴 아이템 스타일 변경
            const navItems = document.querySelectorAll('nav ul');
            navItems.forEach(ul => {
                ul.style.flexDirection = nav.style.display === 'flex' ? 'column' : '';
                ul.style.width = nav.style.display === 'flex' ? '100%' : '';
            });
            
            const navLinks = document.querySelectorAll('nav ul li');
            navLinks.forEach(li => {
                li.style.margin = nav.style.display === 'flex' ? '0.8rem 0' : '';
            });
        });
    }
    
    // 글로벌 서비스 탭 처리
    const tabHeaders = document.querySelectorAll('.tab-header');
    if (tabHeaders.length > 0) {
        tabHeaders.forEach(header => {
            header.addEventListener('click', function() {
                // 모든 탭 헤더에서 active 클래스 제거
                tabHeaders.forEach(h => h.classList.remove('active'));
                
                // 클릭된 탭 헤더에 active 클래스 추가
                this.classList.add('active');
                
                // 모든 탭 콘텐츠 숨기기
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => content.classList.remove('active'));
                
                // 선택된 탭 콘텐츠 표시
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // 폼 제출 처리
    const businessForm = document.getElementById('businessForm');
    if (businessForm) {
        businessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(businessForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // 여기에 폼 제출 로직 추가 (AJAX 요청 등)
            console.log('폼 데이터:', formDataObj);
            
            // 성공 메시지 표시
            alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
            businessForm.reset();
        });
    }
    
    // 애니메이션 요소 초기화
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // 로고 슬라이더 복제 및 무한 슬라이드 설정
    const logoSlider = document.querySelector('.logo-slider');
    if (logoSlider) {
        // 원본 로고들 복제하여 무한 슬라이드 효과 생성
        const logos = logoSlider.innerHTML;
        logoSlider.innerHTML = logos + logos;
        
        // 슬라이더 폭 계산 및 설정
        const logoItems = logoSlider.querySelectorAll('img');
        const logoItemWidth = 180; // 로고 이미지 넓이
        const logoGap = 64; // 로고 간 간격 (4rem)
        const totalWidth = (logoItemWidth + logoGap) * (logoItems.length / 2);
        
        // 슬라이더 애니메이션 재설정
        logoSlider.style.animation = 'none';
        logoSlider.style.width = `${totalWidth}px`;
        
        // 강제 리플로우
        void logoSlider.offsetWidth;
        
        // 애니메이션 다시 시작
        logoSlider.style.animation = `scroll ${logoItems.length * 3}s linear infinite`;
        
        // 슬라이더에 마우스오버 시 애니메이션 일시 정지
        logoSlider.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        // 슬라이더에서 마우스 나갈 때 애니메이션 재개
        logoSlider.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // 초기 스크롤 이벤트 트리거
    window.dispatchEvent(new Event('scroll'));
    
    // 페이지 로드 시 애니메이션
    document.body.classList.add('loaded');
});