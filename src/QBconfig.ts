export const QBConfig = {
  credentials: {
    appId: -1,
    accountKey: '',
    authKey: '',
    authSecret: '',
    sessionToken: '',
  },
  configAIApi: {
    AIAnswerAssistWidgetConfig: {
      apiKey: '',
      useDefault: true,
      proxyConfig: {
        api: 'v1/chat/completions',
        servername: 'http://localhost',
        port: '3011',
        sessionToken: '',
      },
    },
    AITranslateWidgetConfig: {
      apiKey: '',
      useDefault: true,
      defaultLanguage: 'English',
      languages: [
        'English',
        'Spanish',
        'French',
        'Portuguese',
        'German',
        'Ukrainian',
      ],
      proxyConfig: {
        api: 'v1/chat/completions',
        servername: 'http://localhost',
        port: '3011',
        sessionToken: '',
      },
    },
    AIRephraseWidgetConfig: {
      apiKey: '',
      useDefault: true,
      defaultTone: 'Professional',
      proxyConfig: {
        api: 'v1/chat/completions',
        servername: 'http://localhost',
        port: '3011',
        sessionToken: '',
      },
    },
  },
  appConfig: {
    maxFileSize: 10 * 1024 * 1024,
    sessionTimeOut: 122,
    chatProtocol: {
      active: 2,
    },
    debug: true,
    endpoints: {
      api: 'api.quickblox.com',
      chat: 'chat.quickblox.com',
    },
    on: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/require-await
      async sessionExpired(handleResponse: any, retry: any) {
        console.log(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `QBconfig sessionExpired handle: ${handleResponse} ${retry}`,
        );
      },
    },
    streamManagement: {
      enable: true,
    },
  },
};
