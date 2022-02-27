
function isMainList(list) {
	return Number(document.querySelector(`svg`).dataset.numitems) === list.length
}

async function read(list, index) {
	if(isMainList(list)  && !window.paused) {
		const bar = document.querySelector(`.bar.index-${index}`)
		const oldstyle = bar.getAttribute("style")
		bar.setAttribute("style", `fill: red`)
		await sleep()
		bar.setAttribute("style", oldstyle)
	}
	else {
		await sleep()
	}
	return list[index]
}

function renderList(list) {
	let W = 1000
	let yScale = 500/1e6
	let bottom = 500
	let N = list.length
	let bars = ''
	list.forEach((element, index) => {
		bars += `<rect x=${index*W/N} y=${bottom-element*yScale} width=${W/N+0.0005*W} height=${element*yScale}
		class="bar index-${index}" style="fill: hsla(${270*element/1e6}, 40%, 50%)"></rect>`
	})
	document.querySelector(".diagram").innerHTML = `<svg data-numitems="${N}" viewbox="0 0 1000 500">${bars}</svg>`
}

async function update(list, i) {
	let element = list[i]
	if(isMainList(list) && !window.paused) {
		let yScale = 500/1e6
		let bottom = 500
		const bar = document.querySelector(`.bar.index-${i}`)
		bar.setAttribute("y", bottom-element*yScale)
		bar.setAttribute("height", element*yScale)
		bar.setAttribute("style", `fill: hsl(${270*element/1e6}, 40%, 50%)`)
	}
	await sleep()
}

async function set(list, i, value) {
	list[i] = value
	if(render) {
		await update(list, i)
	}
}