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
                
                // 모바일 메뉴가 열려있을 경우 닫기
                if (window.innerWidth <= 768) {
                    const nav = document.querySelector('nav');
                    if (nav.style.display === 'flex') {
                        document.querySelector('.mobile-menu-toggle').click();
                    }
                }
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
                
                // 지구 회전 방향 변경
                const earth = document.getElementById('earth');
                if (earth) {
                    if (tabId === 'outbound') {
                        earth.style.animation = 'rotate 60s linear infinite';
                    } else {
                        earth.style.animation = 'rotate 60s linear infinite reverse';
                    }
                }
            });
        });
    }
    
    // CORE-RANK 탭 처리
    const coreTabBtns = document.querySelectorAll('.core-tab-btn');
    if (coreTabBtns.length > 0) {
        coreTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 모든 탭 버튼에서 active 클래스 제거
                coreTabBtns.forEach(b => b.classList.remove('active'));
                
                // 클릭된 탭 버튼에 active 클래스 추가
                this.classList.add('active');
                
                // 모든 탭 콘텐츠 숨기기
                const tabContents = document.querySelectorAll('.core-tab-content');
                tabContents.forEach(content => content.classList.remove('active'));
                
                // 선택된 탭 콘텐츠 표시
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // 요금제 토글
    const pricingToggle = document.getElementById('pricing-toggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.price.monthly');
            const annualPrices = document.querySelectorAll('.price.annual');
            const toggleTexts = document.querySelectorAll('.pricing-toggle span');
            
            if (this.checked) {
                // 연간 요금제 표시
                monthlyPrices.forEach(price => price.style.display = 'none');
                annualPrices.forEach(price => price.style.display = 'inline');
                toggleTexts[0].classList.remove('active');
                toggleTexts[1].classList.add('active');
            } else {
                // 월간 요금제 표시
                monthlyPrices.forEach(price => price.style.display = 'inline');
                annualPrices.forEach(price => price.style.display = 'none');
                toggleTexts[0].classList.add('active');
                toggleTexts[1].classList.remove('active');
            }
        });
    }
    
    // FAQ 토글
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // 모든 FAQ 아이템 닫기
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    answer.style.padding = '0 1.5rem';
                    answer.style.maxHeight = '0';
                });
                
                // 클릭된 아이템이 이미 활성화 상태가 아니었다면 열기
                if (!isActive) {
                    faqItem.classList.add('active');
                    const answer = faqItem.querySelector('.faq-answer');
                    answer.style.padding = '1.5rem';
                    answer.style.maxHeight = answer.scrollHeight + 40 + 'px'; // 패딩 고려
                }
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
    
    // CTA 버튼 이벤트 처리
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.closest('form')) {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    window.scrollTo({
                        top: contactSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
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
    
    // CORE-RANK 섹션 이미지 변경 인터벌 (데모용)
    let imageInterval;
    const startImageInterval = () => {
        if (imageInterval) clearInterval(imageInterval);
        
        const coreTabs = document.querySelectorAll('.core-tab-btn');
        let currentIndex = 0;
        
        imageInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % coreTabs.length;
            coreTabs[currentIndex].click();
        }, 5000);
    };
    
    // 페이지 로드 시 이미지 인터벌 시작
    startImageInterval();
    
    // 탭 클릭 시 인터벌 재시작
    document.querySelectorAll('.core-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            startImageInterval();
        });
    });

    // 인플루언서 검색 UI 시뮬레이션
    const searchBar = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchBar && searchButton) {
        // 검색창 포커스 이벤트
        searchBar.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.2)';
        });
        
        searchBar.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
        
        // 검색 버튼 클릭 시 애니메이션
        searchButton.addEventListener('click', function() {
            this.classList.add('clicking');
            setTimeout(() => {
                this.classList.remove('clicking');
            }, 200);
            
            // 검색 결과 시뮬레이션 (실제로는 백엔드 연동 필요)
            alert('실제 서비스에서는 인플루언서 검색 결과가 표시됩니다.');
        });
    }

    // CORE 인덱스 점수 카운트 업 애니메이션
    const coreScore = document.querySelector('.core-score');
    if (coreScore) {
        const targetScore = parseInt(coreScore.textContent);
        let currentScore = 0;
        
        const scoreInterval = setInterval(() => {
            if (currentScore >= targetScore) {
                clearInterval(scoreInterval);
                return;
            }
            
            currentScore += 1;
            coreScore.textContent = currentScore + '%';
            
            if (currentScore >= targetScore) {
                clearInterval(scoreInterval);
            }
        }, 30);
    }
    
    // 지구 애니메이션을 위한 별 생성 함수
    function createStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // 랜덤 위치
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // 랜덤 크기
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // 랜덤 투명도
            star.style.opacity = Math.random() * 0.8 + 0.2;
            
            // 깜빡임 애니메이션
            star.style.animation = `twinkle ${Math.random() * 5 + 2}s infinite alternate`;
            
            starsContainer.appendChild(star);
        }
    }

    // 연결선 생성 함수
    function createConnections() {
        const earthWrapper = document.querySelector('.earth-wrapper');
        const koreaMarker = document.querySelector('.marker.korea');
        const markers = document.querySelectorAll('.marker:not(.korea)');
        
        if (!earthWrapper || !koreaMarker || markers.length === 0) return;
        
        // 한국에서 다른 모든 마커로 연결선 생성
        markers.forEach(marker => {
            const connection = document.createElement('div');
            connection.className = 'connection';
            
            // 위치 계산
            const koreaRect = koreaMarker.getBoundingClientRect();
            const markerRect = marker.getBoundingClientRect();
            const wrapperRect = earthWrapper.getBoundingClientRect();
            
            // 상대 위치
            const startX = koreaRect.left - wrapperRect.left + koreaRect.width/2;
            const startY = koreaRect.top - wrapperRect.top + koreaRect.height/2;
            const endX = markerRect.left - wrapperRect.left + markerRect.width/2;
            const endY = markerRect.top - wrapperRect.top + markerRect.height/2;
            
            // 길이와 각도 계산
            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
            
            // 스타일 적용
            connection.style.width = `${length}px`;
            connection.style.left = `${startX}px`;
            connection.style.top = `${startY}px`;
            connection.style.transform = `rotate(${angle}deg)`;
            
            earthWrapper.appendChild(connection);
        });
    }
    
    // 지구 효과 초기화
    function initEarthEffects() {
        // 별 생성
        createStars();
        
        // 약간의 지연 후 연결선 생성 (DOM이 완전히 렌더링 된 후)
        setTimeout(createConnections, 500);
    }
    
    // 페이지 로드 시 지구 효과 초기화
    initEarthEffects();
});
