import device from 'assets/js/device';
import WebStorageCache from 'web-storage-cache';

var app = {
	wsCache: new WebStorageCache(),
	connectWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge);
		} else {
			document.addEventListener("WebViewJavascriptBridgeReady", () => callback(WebViewJavascriptBridge), false);
		}
	},
	sendHeroId(native_id, product_id, db_url) {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.callNative(String(native_id), { id: String(product_id), h5_url: String(db_url) });
				} else {
					app.sendHeroId(native_id, product_id, db_url);
				}
			}, 200);
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					})
				} catch (e) {

				}
				bridge.callHandler('nativeHandler', { native_id: native_id, paramter_name: { id: product_id }, h5_url: db_url });
			});
		} else {
		}
	},
	sendHeroId2(native_id, id, cid) {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.callNative(String(native_id), { id: String(id), tag_id: String(cid) });
				} else {
					app.sendHeroId2(native_id, id, cid);
				}
			}, 200);
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					});
				} catch (e) {

				}
				bridge.callHandler('nativeHandler', { native_id: native_id, paramter_name: { id: id, tag_id: cid } });
			});
		} else {
		}
	},
	sendH5url(url) {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.showH5Url(url);
				} else {
					app.sendH5url(url);
				}
			}, 200);
		} else {
			window.location.href = url;
		}
	},
	showback() {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.showBack();
				} else {
					app.showback();
				}
			}, 200);
		}
	},
	goStartPage() {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.goStartPage();
				} else {
					app.goStartPage();
				}
			}, 200);
		}
	},
	getUserInfo(callback) {
		if (device.isHeLian) {
			if (device.ios) {
				app.connectWebViewJavascriptBridge((bridge) => {
					try {
						bridge.init((message, responseCallback) => {
							var data = { 'Javascript Responds': 'Wee!' };
							responseCallback(data);
						});
					} catch (e) {
					}
					bridge.callHandler('getParameterHandler', { paramter_name: "user_id,token,mac,sn,conn,app_version,steps" },
						(response) => {
							app.wsCache.set('UserInfo', response.result);
							callback && callback();
						});
				});
			} else if (device.android) {
				setTimeout(() => {
					if (window.HostApp) {
						HostApp.getParamCallBack("user_id,token,mac,sn,conn,app_version,steps", (response) => {
							app.wsCache.set('UserInfo', response.result);
							callback && callback();
						});
					} else {
						app.getUserInfo(callback);
					}
				}, 200);
			}
		} else {
			let User = {};
			User.token = '';
			User.user_id = '17002191758';
			User.mac = '';
			User.sn = '';
			User.cnn = '';
			User.app_version = '6.7.0';
			User.steps = '25000';
			app.wsCache.set('UserInfo', User);
			callback && callback();
		}
	},
	loginAuthenHandler(callback) {
		if (device.android) {
			if (window.HostApp) {
				HostApp.loginCallBack("user_id,token", (response) => {
					response = response.split('===');
					let User = app.wsCache.get('UserInfo');
					User.token = response[1];
					User.user_id = response[0];
					app.wsCache.set('UserInfo', User);
					callback && callback();
				});
			} else {
				app.loginAuthenHandler(callback);
			}
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' };
						responseCallback(data);
					});
				} catch (e) {
				}
				bridge.callHandler('loginHandler', { paramter_name: "" }, (response) => {
					let User = app.wsCache.get('UserInfo');
					User.token = response.result.token;
					User.user_id = response.result.user_id;
					app.wsCache.set('UserInfo', User);
					callback && callback();
				});
			});
		}
	},
	// 步数
	getSteps(callback) {
		if (device.isHeLian) {
			if (device.ios) {
				app.connectWebViewJavascriptBridge((bridge) => {
					try {
						bridge.init((message, responseCallback) => {
							var data = { 'Javascript Responds': 'Wee!' };
							responseCallback(data);
						});
					} catch (e) {
					}
					bridge.callHandler('getParameterHandler', { paramter_name: "steps" },
						(response) => {
							callback && callback(response.result);
						});
				});
			} else if (device.android) {
				setTimeout(() => {
					if (window.HostApp) {
						HostApp.getParamCallBack("steps", (response) => {
							callback && callback(response.result);
						});
					} else {
						app.getUserInfo(callback);
					}
				}, 200);
			}
		}
	},
	// 动画显示
	showDialog() {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.showGeneratePlanDialog();
				} else {
					app.showDialog();
				}
			}, 200);
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					});
				} catch (e) {

				}
				bridge.callHandler('showGeneratePlanDialogHandler');
			});
		}
	},
	// 动画关闭
	hideDialog(type) {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.dismissGeneratePlanDialog({ requestResult: type });
				} else {
					app.hideDialog();
				}
			}, 200);
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					});
				} catch (e) {

				}
				bridge.callHandler('dismissGeneratePlanDialogHandler');
			});
		}
	},
	//上传图片
	getimgupload() {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.uploadFile('', () => { });
				} else {
					app.getimgupload();
				}
			}, 200);
		}
	},
	// 关闭webview
	closeWindow() {
		if (device.android) {
			HostApp.closeWeb();
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					})
				} catch (e) { }
				bridge.callHandler('closeWebHandler');
			});
		} else {
		}
	},
	// 分享
	helianshare(type, title, description, mUrl, share_img) {
		if (device.android) {
			HostApp.sharecallback({ type: type, title: title, description: description, mUrl: mUrl, share_img: share_img });
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					})
				} catch (e) {

				}
				bridge.callHandler('shareHandler', { paramter_name: { type: type, title: title, description: description, url: mUrl } });
			});
		} else {
		}
	},
	// 分享图片
	helianshareimg(type, title, description, mUrl, share_img, callback) {
		if (device.android) {
			HostApp.shareImage({ type: type, url: mUrl });
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					})
				} catch (e) {
				}
				bridge.callHandler('hlShareHandler', { paramter_name: { type: type, title: title, description: description, url: mUrl } },
					(res) => {
						if (res.result == '1') {
							callback && callback();
						}

					});
			});
		} else {
		}
	},
	// 设置title
	setH5TitleHandler(title) {
		if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					})
				} catch (e) {
				}
				bridge.callHandler('setH5TitleHandler', { title_name: title }, () => { });
			});
		}
	},
	// app位置
	getLocation(callback) {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.getLocation((response) => {
						callback && callback(response.longitude, response.latitude, response.address);
					});
				} else {
					app.getLocation();
				}
			}, 200);
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge((bridge) => {
				try {
					bridge.init((message, responseCallback) => {
						var data = { 'Javascript Responds': 'Wee!' }
						responseCallback(data);
					})
				} catch (e) {
				}
				bridge.callHandler('getLocationHandle', {}, (response) => {
					callback && callback(response.longitude, response.latitude, response.address);
				});
			});
		}
	},
	// 支付信息通信（）
	setpayinfo(reback, money, projectName, itemId, productId, extraProductJson) {
		if (device.android) {
			// eslint-disable-next-line
			HostApp.prepareOrder(`{ money: ${money}, projectName: "${projectName}", itemId: ${itemId}, productId: ${productId === '' ? 0 : productId}, extraProductJson: ${extraProductJson} }`, function () {
				reback && reback();
			});
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge(function (bridge) {
				try {
					bridge.init(function (message, responseCallback) {
						var data = { 'Javascript Responds': 'Wee!' };
						responseCallback(data);
					});
				} catch (e) {
					console.log('');
				}
				bridge.callHandler('hlPayHandler', { money: money, projectName: projectName, itemId: itemId, productId: productId, extraProductJson: extraProductJson }, function () {
					reback && reback();
				});
			});
		}
	},
	// 复制文字
	copytext(str, reback) {
		if (device.android) {
			HostApp.copyTextToClipBoard(str, function () {
				reback && reback();
			});
		} else if (device.ios) {
			app.connectWebViewJavascriptBridge(function (bridge) {
				try {
					bridge.init(function (message, responseCallback) {
						var data = { 'Javascript Responds': 'Wee!' };
						responseCallback(data);
					});
				} catch (e) {
					console.log('');
				}
				bridge.callHandler('copyClipboardHandler', { str: str }, function () {
					reback && reback();
				});
			});
		}
	},
	// 
	showStatusBar() {
		if (device.android) {
			setTimeout(() => {
				if (window.HostApp) {
					HostApp.showStatusBar();
				} else {
					app.showStatusBar();
				}
			}, 200);
		}
	}
}
module.exports = app;
