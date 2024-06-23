"use client";
import { useEffect } from 'react';

const VoiceflowBot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.type = 'text/javascript';
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '6678654a68e28c82625dce07' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    document.body.appendChild(script);
  }, []);

  return null;
};

export default VoiceflowBot;
