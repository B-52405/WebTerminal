function load_script(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));

        document.head.appendChild(script);
    })
}

export {
    load_script
}
