fetch("https://veryfast.io/t/front_test_api.php")
	.then((res) => res.json())
	.then((res) => {
		const subscriptions = res.result.elements;
		subscriptions.forEach((subscription) => {
			addSubscription(subscription);
		});
	});

function addSubscription(subscription) {
	const subscriptionsEl = document.querySelector(".main__subscriptions");
	const bestRibbonEl = subscription.is_best ? '<div class="subscription__best">Best Value</div>' : "";
	let discountRibbonEl = "";
	let oldPriceEl = "";
	const isDiscount = subscription.price_key.includes("%");
	const isMonthly = subscription.license_name.includes("Monthly");

	if (isDiscount) {
		const discountAmount = +subscription.price_key.replace("%", "");
		const oldPriceAmount = (subscription.amount / (1 - discountAmount / 100)).toFixed(2);
		discountRibbonEl = `
			<div class="subscription__discount">
				<div class="subscription__discount-amount">${discountAmount}%</div>
				<div class="subscription__discount-text">OFF</div>
			</div>
		`;
		oldPriceEl = `
			<strike class="subscription__old-price">
				$${oldPriceAmount}
			</strike>
		`;
	}

	const element = `
		<div class="main__subscription subscription">
 			<div class="subscription__value">
			    ${bestRibbonEl}
			    ${discountRibbonEl}
				<div class="subscription__price">
					<span class="subscription__price-amount">$${subscription.amount}</span>
					<span class="subscription__price-period">/per ${isMonthly ? "mo" : "year"}</span>
				</div>
				${oldPriceEl}
 			</div>
 			<h3 class="subscription__title">${subscription.name_prod}</h3>
 			<div class="subscription__terms">${subscription.license_name}</div>
			<a class="subscription__download" href="${subscription.link}" download="${subscription.name_display}">
				<button class="subscription__button">
					<span class="subscription__button-text">DOWNLOAD</span>
					<img class="subscription__button-icon" src="/images/icons/download.svg" width="30" height="30" alt="Download">
				</button>
			</a>
  		</div>
	`;

	subscriptionsEl.innerHTML += element;

	const downloadButtons = document.querySelectorAll(".subscription__download");
	downloadButtons.forEach((downloadButton) => {
		downloadButton.addEventListener("click", handleDownload);
	});
}

const downloadAlertEl = document.querySelector(".download-alert");

function handleDownload() {
	setTimeout(showDownloadAlertEl, 1500);
}

function showDownloadAlertEl() {
	downloadAlertEl.classList.add("shown");
	if (navigator.userAgent.includes("Chrome")) {
		downloadAlertEl.classList.add("chrome");
	}
	setTimeout(hideDownloadAlertEl, 10000);
}

function hideDownloadAlertEl() {
	downloadAlertEl.classList.remove("shown");
	setTimeout(() => {}, 5000);
}
