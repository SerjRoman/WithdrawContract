import React, { useEffect } from "react";
import Content from "./Content/Content";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Header from "./Header/Header";
import "./App.module.css";

// @ts-ignore
const tele = window.Telegram.WebApp;

export default function App() {
    // adding app in telegram web app
	useEffect(() => {
		tele.ready();
	});
    // Ignore ton connect sdk errors
	function isTonConnectSdkError(error: Error | string) {
		const tonConnectError = "TON_CONNECT_SDK";
		if (typeof error === "string") {
			return error.includes(tonConnectError);
		}

		return error.message?.includes(tonConnectError);
	}

	window.addEventListener(
		"unhandledrejection",
		function (rejection: PromiseRejectionEvent) {
			// handle rejection
			if (isTonConnectSdkError(rejection.reason)) {
				// ignore TonConnect sdk errors, they are handlded by sentry
				return;
			}
		}
	);
	return (
		<>
			<TonConnectUIProvider manifestUrl={`${process.env.URL}tonconnect-manifest.json`}>
				<Header></Header>
				<Content></Content>
			</TonConnectUIProvider>
		</>
	);
}

