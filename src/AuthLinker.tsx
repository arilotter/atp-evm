import React, { useState, useEffect } from 'react';
import { oauthClient } from './oauth';
import OAuthUI from './oauthUI';
import { WalletConnector } from './WalletConnector';
import type { OAuthSession } from '@atproto/oauth-client-browser';

const AuthLinker: React.FC = () => {
  const [oauthSession, setOauthSession] = useState<OAuthSession | null>(null);

  // Initialize OAuth session on mount.
  useEffect(() => {
    const fetchSession = async () => {
      const initRes = await oauthClient.init();
      setOauthSession(initRes?.session || null);
    };
    fetchSession();
  }, []);

  //console.log('OAuth session:', oauthSession);

  // If oauthSession is null, the OAuthUI login form is shown.
  return (
    <div>
      {oauthSession ? (
        <div>
          <p>✅ authenticated on ATProto side as:</p>
          <p>{oauthSession.sub}</p>
          <WalletConnector 
            isAuthenticated={!!oauthSession} 
            did={oauthSession?.sub} 
            oauth={oauthSession} 
          />
        </div>
      ) : (
        <OAuthUI />
      )}
    </div>
  );
};

export default AuthLinker;