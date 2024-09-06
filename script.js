document.addEventListener('DOMContentLoaded', () => {
    const naoBtn = document.getElementById('nao-btn');
    const simBtn = document.querySelector('.sim');
    const container = document.querySelector('.container');
    const gifContainer = document.querySelector('.gif-container');

    const initialNaoBtnPosition = { left: '', bottom: '' };

    function setButtonPositions() {
        const containerWidth = container.clientWidth;
        const gifContainerWidth = gifContainer.clientWidth;
        const gifContainerLeft = gifContainer.getBoundingClientRect().left - container.getBoundingClientRect().left;
        const centerX = gifContainerWidth / 2 + gifContainerLeft;

        const buttonWidth = simBtn.clientWidth;
        const margin = 20;

        const simBtnLeft = centerX - buttonWidth - margin;
        const naoBtnLeft = centerX + margin;

        const minLeft = 0 + margin;
        const maxLeft = containerWidth - buttonWidth - margin;

        simBtn.style.position = 'absolute';
        simBtn.style.left = `${Math.max(minLeft, Math.min(maxLeft, simBtnLeft))}px`;
        simBtn.style.bottom = '0';

        naoBtn.style.position = 'absolute';
        naoBtn.style.left = `${Math.max(minLeft, Math.min(maxLeft, naoBtnLeft))}px`;
        naoBtn.style.bottom = '0';

        initialNaoBtnPosition.left = naoBtn.style.left;
        initialNaoBtnPosition.bottom = naoBtn.style.bottom;
    }

    setButtonPositions();

    simBtn.addEventListener('click', () => {
        const nome = 'Como teu futuro noivo';
        alert(`${nome}, eu sabia que estavas caidinha por mim <3`);
    });

    function moveNaoBtn(e) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = naoBtn.getBoundingClientRect();

        const cursorX = e.clientX - containerRect.left;
        const cursorY = e.clientY - containerRect.top;

        let newX, newY;

        do {
            newX = Math.random() * (containerRect.width - btnRect.width - 40) + 20;
            newY = Math.random() * (containerRect.height - btnRect.height - 40) + 20;
        } while (
            newX < cursorX - 50 || newX > cursorX + 50 ||
            newY < cursorY - 50 || newY > cursorY + 50
        );

        naoBtn.style.opacity = '0';
        naoBtn.style.transform = 'scale(0.8)';
        naoBtn.style.transition = 'none';

        setTimeout(() => {
            naoBtn.style.left = `${newX}px`;
            naoBtn.style.top = `${newY}px`;
            naoBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            requestAnimationFrame(() => {
                naoBtn.style.opacity = '1';
                naoBtn.style.transform = 'scale(1)';
            });
        }, 300);
    }

    function resetNaoBtnPosition() {
        naoBtn.style.opacity = '1';
        naoBtn.style.transform = 'scale(1)';
        naoBtn.style.left = initialNaoBtnPosition.left;
        naoBtn.style.bottom = initialNaoBtnPosition.bottom;
        naoBtn.style.top = '';
    }

    naoBtn.addEventListener('mouseenter', moveNaoBtn);
    naoBtn.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!naoBtn.matches(':hover')) {
                resetNaoBtnPosition();
            }
        }, 300);
    });

    naoBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        // Usar e.touches[0] para obter as coordenadas do toque em vez de e.clientX e e.clientY
        const touch = e.touches[0];
        moveNaoBtn({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    });

    window.addEventListener('resize', setButtonPositions);
});
