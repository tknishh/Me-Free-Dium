$(document).ready(function(){
	if(isPageBlockedByMedium()){
		var config = getConfig()
		var url = getUrl()
		v=document.querySelectorAll('[aria-label="Homepage"]')[0];
		v.insertAdjacentHTML("afterend", '<span id="free" style="color:green; margin-left:30%; font-weight: bold"><b>FREADIUM is updating content of the premium article.Please wait..</b><span>');
		updateArticle(url,config)
	}

	function isPageBlockedByMedium(){
		return $("#paywall-upsell-button-upgrade").length		
	}

	function getConfig(){
		return {
			credentials: "omit",
			redirect: "follow",
			mode: "no-cors"
    	}
	}

	function getUrl(){
		return window.location.href
	}


	function updateArticle(url,config){
		fetch(url, config).then(function(data) {
		    return data.text()
		}).then(function(b) {
			a = b.replace(/<\/?noscript>/g, "")
			nav = document.getElementsByTagName("nav")[0]
			headers=document.querySelector("head")
			document.querySelector("html").innerHTML = a;
			v=document.querySelectorAll('[aria-label="Homepage"]')[0];
			v.insertAdjacentHTML("afterend", '<span id="free" style="color:green; margin-left:30%; font-weight: bold">This premium article is brought to you by FREADIUM<span>');
		}).catch(function(e){
			console.log(e)
			v=document.querySelectorAll('[aria-label="Homepage"]')[0];
			document.getElementById("free").innerText = 'Error in finding premium content';
			result = confirm('Some error occured while updating premium content for free.FREADIUM recommends to open this article in other window. Continue?');
			if(result){
				chrome.runtime.sendMessage({
			    	msg: "open_in_incognito", 
				});
			}
		});
	}


});