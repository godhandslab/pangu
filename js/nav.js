// ==================== 底部导航栏（公共模块 / onclick 强制跳转版） ====================
(function() {
    if (document.getElementById('yy-nav')) return;

    const path = location.pathname.replace(/\/$/, '');
    let active = 'game';
    if (path.endsWith('/hotbet.html')) active = 'hotbet';
    else if (path.endsWith('/assetpage.html')) active = 'assets';

    function createBtn(id, targetPage, imgSrc, isActive) {
        const opacity = isActive ? '1' : '0.45';
        const transform = isActive ? 'scale(1.05)' : 'scale(1)';
        const btn = document.createElement('div');
        btn.id = id;
        btn.style.cssText = `
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px;
            cursor: pointer;
        `;
        btn.innerHTML = `
            <img src="${imgSrc}" alt="" style="
                width: 31px;
                height: 31px;
                object-fit: contain;
                opacity: ${opacity};
                transform: ${transform};
                transition: opacity 0.2s, transform 0.2s;
                pointer-events: none;
            ">
        `;

        // ★ 强制跳转，不管任何外部因素
        btn.onclick = function(e) {
            if (isActive) return; // 当前页面，不跳转
            window.location.href = `./${targetPage}?auth=1`;
        };

        return btn;
    }

    const nav = document.createElement('nav');
    nav.id = 'yy-nav';
    nav.style.cssText = `
        position: fixed; bottom: 0; left: 0; right: 0;
        display: flex; justify-content: space-around; align-items: center;
        background: #ffffff;
        box-shadow: 0 -1px 4px rgba(0,0,0,0.08);
        border-top: 1px solid #e0e0e0;
        padding: 8px 0 calc(8px + env(safe-area-inset-bottom, 0px));
        z-index: 9999;
    `;

    nav.appendChild(createBtn('nav-game', 'game.html', './assets/logo/game.png', active === 'game'));
    nav.appendChild(createBtn('nav-hotbet', 'hotbet.html', './assets/logo/hotbet.png', active === 'hotbet'));
    nav.appendChild(createBtn('nav-assets', 'assetpage.html', './assets/logo/asset.png', active === 'assets'));

    document.body.appendChild(nav);
})();
