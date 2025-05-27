// ==UserScript==
// @name         【生财有术】官网导航栏增强
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在生财有术官网导航栏添加了“生财周报”和“亦仁的收藏夹”两个按钮
// @author       Rand0mWalk
// @match        https://scys.com/*
// @exclude      https://scys.com/view/docx/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建按钮
    function createButton(config) {
        const button = document.createElement('a');
        button.className = `${config.className}`;
        button.textContent = config.text;
        button.href = config.url;
        button.target = '_blank'; // 在新标签页打开链接

        // // 检查当前URL是否为对应页面
        // if (window.location.href.includes(config.url)) {
        //     button.classList.add('nav-item');
        // }

        // // 添加点击事件
        // button.addEventListener('click', (e) => {
        //     // 移除其他按钮的激活状态
        //     document.querySelectorAll('.nav-tab-box .nav-item').forEach(item => {
        //         item.classList.remove('router-link-active router-link-exact-active');
        //     });
        //     // 添加当前按钮的激活状态
        //     button.classList.add('router-link-active router-link-exact-active');
        // });

        return button;
    }

    // 按钮配置
    const buttonConfigs = [
        // {
        //     text: '生财周报',
        //     className: 'weekly-report-btn',
        //     url: 'https://scys.com/search?query=ZpKLSZ9czXdZSjRzZnn49v9VQvkgLEBSmzA2ePXq2eUJMzxDaxZuhA4Kcs7CBVsU2TuUu'
        // },
        // {
        //     text: '亦仁收藏夹',
        //     className: 'yiren-favorites-btn',
        //     url: 'https://scys.com/search?query=dHNLXqKWEX8NF7LFd2sRfH6MU3cAaZpgpYdahhLHydjgGvyS1yuvDtXcbEBxg3hYhXnVYBhurfw3o'
        // },
        {
            text: '亦仁',
            className: 'nav-item',
            url: 'https://scys.com/personal/552158581144?number=1'
        },
        {
            text: '刘小排',
            className: 'nav-item',
            url: 'https://scys.com/personal/48582854588528?number=19454'
        },
        {
            text: '哥飞',
            className: 'nav-item',
            url: 'https://scys.com/personal/1125284552?number=2396'
        },
        {
            text: '子木',
            className: 'nav-item',
            url: 'https://scys.com/personal/881885484552?number=2766'
        }
    ];

    // 插入按钮到导航栏
    function insertButton() {
        const items = document.querySelector('.nav-tab-box');
        if (!items) return;

        // 查找航海实战链接
        const links = Array.from(items.children);
        const sailingLink = links.find(link =>
            link.textContent.includes('航海实战') &&
            link.getAttribute('href') === '/activity'
        );

        // 检查并插入所有按钮
        buttonConfigs.forEach((config, index) => {
            const existingButton = links.find(link => link.textContent === config.text);
            if (sailingLink && !existingButton) {
                const button = createButton(config);
                // 第一个按钮放在航海实战后面，后续按钮依次放在前一个按钮后面
                if (index === 0) {
                    sailingLink.after(button);
                } else {
                    const prevButton = links.find(link => link.textContent === buttonConfigs[index - 1].text);
                    if (prevButton) {
                        prevButton.after(button);
                    }
                }
            }
        });
    }

    // 等待导航栏加载完成
    function waitForNav() {
        const observer = new MutationObserver((mutations) => {
            const items = document.querySelector('.nav-tab-box');
            if (items && items.children.length > 0) {
                insertButton();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 初次尝试插入
        insertButton();
    }

    // 开始执行
    waitForNav();
})();