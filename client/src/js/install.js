const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevents default
    event.preventDefault();
    // Stores the triggered event
    window.deferredPrompt = event;
    // Shows the install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show prompt
    promptEvent.prompt();
    // Resets the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
    // Hides install button
    butInstall.style.display = 'none';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clears prompt
    window.deferredPrompt = null;
    // PWA was installed
    console.log('JATE installed successfully!');
});
