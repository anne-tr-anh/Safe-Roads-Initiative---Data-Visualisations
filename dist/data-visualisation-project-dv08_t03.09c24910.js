function navigateTo(page) {
    document.querySelectorAll('main section').forEach((section)=>{
        section.classList.add('hidden');
    });
    document.getElementById(`${page}-section`).classList.remove('hidden');
    document.querySelectorAll('nav ul li a').forEach((link)=>{
        link.classList.remove('active');
    });
    document.getElementById(page).classList.add('active');
    document.title = page.charAt(0).toUpperCase() + page.slice(1) + ' - Banh Mi Ram Ram';
}

//# sourceMappingURL=data-visualisation-project-dv08_t03.09c24910.js.map
