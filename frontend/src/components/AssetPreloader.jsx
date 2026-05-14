import React, { useEffect } from 'react';

const AssetPreloader = () => {
  useEffect(() => {
    const preloadAssets = () => {
      const assets = [
        '/avatar.png',
      ];

      assets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = asset;
        document.head.appendChild(link);
      });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadAssets);
    } else {
      setTimeout(preloadAssets, 3000);
    }
  }, []);

  return null;
};

export default AssetPreloader;
