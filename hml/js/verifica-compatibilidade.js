    window.addEventListener('load', () => {
        function updatePageNumbers() {
            const pageNumbers = document.querySelectorAll('.pages li.page-number');
            pageNumbers.forEach((li) => {
                li.setAttribute('href', `#${li.textContent.trim()}`);
            });
            console.log("Atributo href atualizado nos elementos de paginação.");
        }

        function observePaginationChanges() {
            const paginationContainer = document.querySelector('.pager.bottom');
  
            if (paginationContainer) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'childList') {
                            updatePageNumbers();
                        }
                    });
                });
    
                observer.observe(paginationContainer, { childList: true, subtree: true });
    
                updatePageNumbers();
            } else {
                console.log("Container de paginação não encontrado.");
            }
        }
        observePaginationChanges();
    })