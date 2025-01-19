// import { ApplicationInsights, ITelemetryItem } from "@microsoft/applicationinsights-web";
// import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { fetchWithAuth, getPostOptions } from "../fetch/fetchWrapper";

// const reactPlugin = new ReactPlugin();
// const appInsights = new ApplicationInsights({
//   config: {
//     connectionString: "InstrumentationKey=9512c767-4c46-4651-815a-06ae5b5e9773;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/;ApplicationId=20f8e950-0237-4139-a73a-20dfb4e9e826" as string,
//     extensions: [reactPlugin],
//     enableAutoRouteTracking: true,
//     disableAjaxTracking: false,
//     autoTrackPageVisitTime: false,
//     enableCorsCorrelation: false,
//     enableRequestHeaderTracking: false,
//     enableResponseHeaderTracking: false,
//   },
// });
// appInsights.loadAppInsights();

// appInsights.addTelemetryInitializer((env: ITelemetryItem) => {
//   env.tags = env.tags || [];
//   env.tags["ai.cloud.role"] = "PrintMeSPATag";
// });

const trackEvent = (name: string, message: string) => {
  const url = `/audit`;
  try {
    fetchWithAuth(url, "", getPostOptions({ name: name, message: message }));
  } catch (error) {
    console.error(`Error while auditing:`, error);
  }

  // appInsights.trackEvent({ name: name, properties: { message: message } });
};

export { trackEvent };
// export { reactPlugin, appInsights, trackEvent };
