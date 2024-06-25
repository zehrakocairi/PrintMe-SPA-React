import {ApplicationInsights, ITelemetryItem} from '@microsoft/applicationinsights-web';
import {ReactPlugin} from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    connectionString: 'InstrumentationKey=9512c767-4c46-4651-815a-06ae5b5e9773' as string,
    extensions: [reactPlugin],
    enableAutoRouteTracking: true,
    disableAjaxTracking: false,
    autoTrackPageVisitTime: false,
    enableCorsCorrelation: false,
    enableRequestHeaderTracking: false,
    enableResponseHeaderTracking: false,
  }
});
appInsights.loadAppInsights();

appInsights.addTelemetryInitializer((env:ITelemetryItem) => {
    env.tags = env.tags || [];
    env.tags["ai.cloud.role"] = "PrintMeSPATag";
});

const trackEvent = (name: string, message: string) => {
    appInsights.trackEvent({name: name, properties: {message: message}});
};

export { reactPlugin, appInsights, trackEvent };


