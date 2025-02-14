class NavigationDTO {
    constructor(selector, targetUrl) {
        this.selector = selector;
        this.targetUrl = targetUrl;
    }

    applyNavigation() {
        const elements = document.querySelectorAll(this.selector);

        elements.forEach((element, index) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();

                let destination = this.isDynamic ? this.targetUrl(index, element) : this.targetUrl;

                window.location.href = destination;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Navigation for "My Account"
    const accountNavigation = new NavigationDTO('#myaccount','ThreadNet-ProfilePage.html');
    accountNavigation.applyNavigation();

    // Navigation for Navbar Links
    const navbarNavigation = new NavigationDTO('.navbar a','thread.html');
    navbarNavigation.applyNavigation();

    // Navigation for Navbar Links
    const topicsNavigation = new NavigationDTO('.topic a','thread.html');
    topicsNavigation.applyNavigation();

    // Navigation for "ThreadNet" logo
    const logoNavigation = new NavigationDTO('.logo a','homepage.html');
    logoNavigation.applyNavigation();
});
