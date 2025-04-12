//Este archivo carga las dependecias necesarias para que los componentes de bootsStrap funcionen

const loadBootstrapCSS = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css';
    link.integrity = 'sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };
  
  const loadBootstrapJS = () => {
    const scriptJquery = document.createElement('script');
    scriptJquery.src = 'https://code.jquery.com/jquery-3.2.1.slim.min.js';
    scriptJquery.integrity = 'sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN';
    scriptJquery.crossOrigin = 'anonymous';
    document.body.appendChild(scriptJquery);
  
    const scriptPopper = document.createElement('script');
    scriptPopper.src = 'https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js';
    scriptPopper.integrity = 'sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q';
    scriptPopper.crossOrigin = 'anonymous';
    document.body.appendChild(scriptPopper);
  
    const scriptBootstrap = document.createElement('script');
    scriptBootstrap.src = 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js';
    scriptBootstrap.integrity = 'sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl';
    scriptBootstrap.crossOrigin = 'anonymous';
    document.body.appendChild(scriptBootstrap);
  
    return new Promise((resolve) => {
      scriptBootstrap.onload = resolve;
    });
  };
  
  export { loadBootstrapCSS, loadBootstrapJS };
  