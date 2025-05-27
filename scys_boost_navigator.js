// ==UserScript==
// @name         【生财有术】官网导航栏增强
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在生财有术官网导航栏添加收藏作者下拉菜单
// @author       Rand0mWalk
// @match        https://scys.com/*
// @exclude      https://scys.com/view/docx/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to inject CSS
    function injectCSS(css) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    // Inject styles for the dropdown
    const dropdownCSS = `
        .favorites-dropdown-container {
            position: relative;
            display: inline-block;
            margin-left: -5px; /* Adjust margin to fine-tune spacing */
        }
        .favorites-dropdown-button {
            cursor: pointer;
            padding: 0 15px; /* Adjust padding to match nav items */
            line-height: 60px; /* Adjust height to match nav items */
            display: block;
            color: inherit; /* Inherit text color */
            text-decoration: none; /* Remove underline */
        }
        .favorites-dropdown-menu {
            display: none; /* Hidden by default */
            position: absolute;
            background-color: #fff; /* White background */
            min-width: 120px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            list-style: none; /* Remove list bullets */
            padding: 0; /* Remove default padding */
            margin-top: 0; /* Align with button */
            border-radius: 4px; /* Rounded corners */
        }
        .favorites-dropdown-menu li {
            padding: 0;
            margin: 0;
        }
        .favorites-dropdown-menu li a {
            color: black; /* Text color */
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }
        .favorites-dropdown-menu li a:hover {
            background-color: #f1f1f1; /* Hover background */
        }
        .favorites-dropdown-container:hover .favorites-dropdown-menu {
            display: block; /* Show on hover */
        }
    `;
    injectCSS(dropdownCSS);

    // 创建按钮
    function createButton(config) {
        const button = document.createElement('a');
        button.className = `${config.className}`;
        button.textContent = config.text;
        button.href = config.url;
        button.target = '_blank'; // 在新标签页打开链接

        return button;
    }

    // 按钮配置
    const buttonConfigs = [
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

    // Insert the dropdown into the navigation bar
    function insertDropdown() {
        const items = document.querySelector('.nav-tab-box');
        if (!items) return;

        // Find the "航海实战" link
        const links = Array.from(items.children);
        const sailingLink = links.find(link =>
            link.textContent.includes('航海实战') &&
            link.getAttribute('href') === '/activity'
        );

        // Check if the dropdown already exists
        const existingDropdown = items.querySelector('.favorites-dropdown-container');
        if (sailingLink && !existingDropdown) {
            // Create the main dropdown container and button
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'favorites-dropdown-container';

            const dropdownButton = document.createElement('a');
            dropdownButton.className = 'favorites-dropdown-button nav-item'; // Added nav-item class for styling consistency
            dropdownButton.textContent = '收藏作者';
            dropdownButton.href = '#'; // Use # or prevent default for link

            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'favorites-dropdown-menu';

            // Create list items for each author link
            buttonConfigs.forEach(config => {
                const listItem = document.createElement('li');
                const authorLink = document.createElement('a');
                authorLink.textContent = config.text;
                authorLink.href = config.url;
                authorLink.target = '_blank'; // Open in new tab
                listItem.appendChild(authorLink);
                dropdownMenu.appendChild(listItem);
            });

            // Assemble the dropdown structure
            dropdownContainer.appendChild(dropdownButton);
            dropdownContainer.appendChild(dropdownMenu);

            // Insert after the "航海实战" link
            sailingLink.after(dropdownContainer);
        }
    }

    // Wait for the navigation bar to load
    function waitForNav() {
        const observer = new MutationObserver((mutations) => {
            const items = document.querySelector('.nav-tab-box');
            if (items && items.children.length > 0) {
                insertDropdown();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Initial attempt to insert
        insertDropdown();
    }

    // Start execution
    waitForNav();
})();