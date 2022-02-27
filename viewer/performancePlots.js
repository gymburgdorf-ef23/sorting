
function renderAxis(points) {
	const xmax = Math.max(...points.map(p=>p[0]))
	const ymax = Math.max(...points.map(p=>p[1]))
	const xtop = getTopFromMax(xmax)
	const ytop = getTopFromMax(ymax)
	const W = 1500
	const H = 1000
	const margin = {left: 200, right: 50, top: 50, bottom: 100}
	const wOut = W + margin.left + margin.right
	const hOut = H + margin.top + margin.bottom

	const xtext = margin.left - 20
	const scaleY = `
		<text text-anchor="end" x="${xtext}" y="${margin.top}">${displayNumber(ytop)}</text>
		<text text-anchor="end" x="${xtext}" y="${margin.top + H/2}">${displayNumber(ytop/2)}</text>
		<text text text-anchor="end" x="${xtext}" y="${margin.top + H}">${0}</text>
	`

	const ytext = hOut - 20
	const scaleX = `
		<text text-anchor="middle" x="${margin.left}" y="${ytext}">${0}</text>
		<text text-anchor="middle" x="${margin.left + W/2}" y="${ytext}">${displayNumber(xtop/2)}</text>
		<text text text-anchor="middle" x="${margin.left + W}" y="${ytext}">${displayNumber(xtop)}</text>
	`
	return {wOut, hOut, W, H, xtop, ytop, margin, scaleX, scaleY}
}
const getX = (margin, W, x, xtop) => margin.left+W*x/xtop
const getY = (margin, H, y, ytop) => margin.top + H - H*y/ytop

function renderPoints(points) {

	const {wOut, hOut, W, H, xtop, ytop, margin, scaleX, scaleY} = renderAxis(points)

	const dots = points.map(p=>`<circle
		cx=${getX(margin, W, p[0], xtop)}
		cy=${getY(margin, H, p[1], ytop)}
		r=7 class="dot ${p[2]}" 
	></circle>`).join("")

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${wOut} ${hOut}">${scaleY}${scaleX}${dots}</svg>`
}



function renderLines(points) {

	const {wOut, hOut, W, H, xtop, ytop, margin, scaleX, scaleY} = renderAxis(points)

	const keys = [...new Set(points.map(p=>p[2]))]

	const lines = keys.map(k=>{
		ps = points.filter(p=>p[2]===k)
		let M = `M${getX(margin, W, ps[0][0], xtop)}, ${getY(margin, H, ps[0][1], ytop)}`
		let L = ps.map(p=>`${getX(margin, W, p[0], xtop)},${getY(margin, H, p[1], ytop)}`).join(" ")
		return `<path d="${M} L${L}" class="line ${ps[0][2]}"><title>${ps[0][2]}</title></path>`
	}).join("")

	return `<svg viewBox="0 0 ${wOut} ${hOut}">${scaleY}${scaleX}${lines}</svg>`
}

function getTopFromMax(max) {
	const l10 = Math.log10(max)
	let top = 10**Math.ceil(l10)
	if(max / top <= 0.2) return top / 5
	if(max / top <= 0.5) return top / 2
	return top
}

function displayNumber(n) {
	return n > 1 ? Math.round(n) : n.toPrecision(1)
}
