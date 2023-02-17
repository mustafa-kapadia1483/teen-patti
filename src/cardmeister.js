(function () {
	'use strict';
	let create = (CARDT) => {
		let draw = (CE) => {
			let C = CARDT.cardt(pars(CE));
			CE.I ? (CE.I.src = C.src) : (CE.I = CE.appendChild(C));
		};
		customElements.define(
			'card-t',
			class extends HTMLElement {
				static get observedAttributes() {
					return CARDT.attributes;
				}
				constructor() {
					super();
					props(this);
				}
				attributeChangedCallback(n, o) {
					if (o) draw(this);
				}
				connectedCallback() {
					draw(this);
				}
			}
		);
	};
	let pars = (CE, init = {}) =>
		CE.getAttributeNames().reduce((s, a) => ((s[a] = CE.getAttribute(a)), s), init);
	let props = (CE) =>
		CE.constructor.observedAttributes.map((a) =>
			Object.defineProperty(CE, a, {
				get() {
					return CE.getAttribute(a);
				},
				set(val) {
					val ? CE.setAttribute(a, val) : CE.removeAttribute(a);
				},
				configurable: true
			})
		);
	let c = (c) => c.split`,`,
		m = (c) => 'string' == typeof c,
		l = (c, m = ',') => c.includes(m),
		t = c(
			'cid,suit,rank,letters,suits,courts,norank,backcolor,cardcolor,suitcolor,borderradius,bordercolor,borderline,opacity,courtcolors,backtext,backtextcolor,showpips,pips,draggable,svg'
		),
		e = (c, t = -1, e) => ((e = m(c) ? c.split(l(c) ? ',' : '') : c), t > -1 ? e[t] : e),
		a = c('back,ace,two,three,four,five,six,seven,eight,nine,ten,jack,queen,king'),
		z = c('spades,hearts,diamonds,clubs');
	function s({
		cid: t = !1,
		suit: z = 0,
		rank: s = 1,
		pips: h = !1,
		letters: M = !1,
		courts: o = '012',
		suits: i = '0123',
		suitcolor: v = '#000,red,red,#000',
		norank: n = !1,
		backcolor: L = '#E55',
		cardcolor: p = '#FFF',
		opacity: $ = 0.8,
		borderradius: d = 12,
		bordercolor: u = '#444',
		borderline: C = '1',
		courtcolors: g = '#DB3,red,#44F,#000,#000,4',
		backtext: b = 'CARD-TS',
		backtextcolor: A = '#555',
		img: P = 0,
		svg: f = ''
	}) {
		try {
			let x = {
					ace: 1,
					a: 1,
					two: 2,
					three: 3,
					four: 4,
					five: 5,
					six: 6,
					seven: 7,
					eight: 8,
					nine: 9,
					ten: 10,
					t: 10,
					jack: 11,
					j: 11,
					queen: 12,
					q: 12,
					king: 13,
					k: 13,
					spades: 20,
					s: 20,
					hearts: 21,
					h: 21,
					diamonds: 22,
					d: 22,
					clubs: 23,
					c: 23
				},
				k = (c) => {
					if (c.match(/^\d+$/)) return Number(c);
					c = c.toLowerCase();
					let m = x[c];
					return m ? (m > 19 && (m -= 20), m) : c;
				},
				w = 10,
				y = 'R',
				F = 'S';
			t &&
				'CARD-T' !== t &&
				((t = t.toUpperCase()).includes('-') && (t = (t = t.split('-OF-'))[0][0] + t[1][0]),
				(t = t.replace('10', 'T')),
				(s = t[0]),
				(z = t[1]),
				'F' == s &&
					((L = 'green'),
					(s = 1),
					(n = 1),
					($ = 0.3),
					(p = 'transparent'),
					(M = '    '),
					'F' == z ? ((s = 0), (z = 0), (L = 'transparent'), (b = '')) : (z = k(z)))),
				m(z) && (z = k(z)),
				m(s) && (s = k(s)),
				(g = e(g)),
				'' == r[2][0][0][0] &&
					((i = '1111'), (0 != z && 3 != z) || (g[2] = '#0303FF'), 2 == z && (g[1] = '#DC143C')),
				z > 3 && (z = 3),
				s > 13 && (s = 13),
				(t = (s > 1 && s < 10 ? s : a[s][0]) + 'shdc'[z]);
			let j = l(v) ? e(v)[z] : v,
				V = (c) => -c + ' -' + c + ' ' + 2 * c + ' ' + 2 * c,
				E = (c) => `fill='${c}' fill-opacity='1'`,
				R = (c, m = '3', l = 'none') => `stroke='${c}' ${E(l)} stroke-width='${m}'`,
				D = (c, m, l, t, e = '') => (
					c && (e += ` width='${c}'`),
					m && (e += ` height='${m}'`),
					l && (e += ` x='${l}'`),
					t && (e += ` y='${t}'`),
					e
				),
				S = (c, m, l, t, e, a) => `<rect${D(c, m, l, t)} rx='${e}' ry='${e}' ${a}></rect>`,
				N = (c, m = 0, l = 0, t = '', e = '', a = 20, z = -7, s = 'middle') =>
					`<text x='${m}' y='${l}' stroke='${t}' text-anchor='${s}' style='font-weight:600;font-family:Arial;letter-spacing:${z}px;fill:${e};stroke:none;font-size:${a}px;'>${c}</text>`,
				T = (c, m, l, e, a, z = '') => `<use href='#${c + t}'` + D(m, l, e, a) + ` ${z}></use>`,
				Z = (c, m, l, e, a = []) =>
					`<symbol id='${c + t}' viewBox='${m}' preserveAspectRatio='xMinYMid' opacity='${
						a.length ? 1 : $
					}' ><path d='${l}' ${e} ` + `></path>${a.map((c) => T(...c)).join``}</symbol>`,
				q = [
					[n ? '' : y, 0, M ? 50 : 39, M ? -116 : -120, -158],
					[n ? '' : F + z, 0, s > 9 && z > 2 ? 40 : 42, -121, -119]
				].map((c) => T(...c)).join``,
				B = [],
				H = [],
				O = [],
				U = [
					'2020-08-06 17:13',
					'000000000P0',
					'00000P00000',
					'00P000000P0',
					'P0P00000000',
					'P0P000000P0',
					'P0P00000P0P',
					'P0P0000PP0P',
					'P0P000P0P0P',
					'P0PPP0000P0',
					'P0PPPP00000'
				];
			(U = h ? (h[1] ? h : U[k(h)]) : U[s]),
				s > 0 &&
					s < 11 &&
					U.split``.map((c, m) => {
						let l,
							t = 70,
							e = -t / 2,
							a = -e / 2,
							r = -t - a,
							h = 9 == s || 10 == s ? -130 : -122;
						let o, i, v;
						(v = [
							[r, h],
							[e, h],
							[a, h],
							[r, -68.5],
							[a, -68.5],
							[e, -102],
							[e, -90],
							[e, -90],
							[r, e],
							[e, e],
							[a, e]
						][m]),
							'0' != c &&
								((o = v[0]),
								(i = v[1]),
								1 == s && 9 == m && (([o, i] = [-t, -t]), (t *= 2)),
								(l = T(F + z, !1, t, o, i)),
								B.push(l),
								m < 7 && O.push(l));
					});
			let I = 240,
				Y = 334,
				G = V(500),
				J = Number(C),
				K = 'data:image/svg+xml,';
			if (
				((K += `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='${
					-I / 2
				} ${-Y / 2} ${I} ${Y}' ${f}>`),
				(K += S(I - J, Y - J, -I / 2 + J / 2, -Y / 2 + J / 2, d, R(u, C, p))),
				s > 0)
			) {
				if (M) {
					let c = e(M),
						m = [0, c.shift(), 2, 3, 4, 5, 6, 7, 8, 9, 10, ...c][s];
					K += `<symbol id='${y}${t}' viewbox='${G}' opacity='${$}'>${N(
						m,
						1,
						33,
						'',
						j,
						40,
						-7,
						'left'
					)}</symbol>`;
				} else K += Z(y, G, r[1][s], R(j, 110));
				[0, 1, 2, 3].map((c) => (K += Z(F + c, V(600), r[0][c], E(l(v) ? e(v)[z] : v)))),
					(K += `${q}${B.join``}<g transform='rotate(180)'>${q}${O.join``}</g>`),
					(K += H.join``);
			} else {
				let c = w / 2,
					m = I - 2 * d,
					l = Y - 2 * d;
				b && (K += N(b, 0, 10, '', A, 42)),
					(K +=
						`<pattern patternUnits='userSpaceOnUse' id='A' ${D(
							w,
							w
						)}><path d='M${c} 0L${w} ${c}L${c} ${w}L0 ${c}Z' ${E(L)}></path></pattern>` +
						S(m, l, -m / 2, -l / 2, d, E('url(#A)')));
			}
			if (s > 10) {
				let m = (...c) => T(...c) + T(...c, "transform='rotate(180)'"),
					l = e(o, s - 11),
					t = e(i, z);
				K += [
					[1, 0, 0, 0],
					[0, 1, 0, 0],
					[1, 1, 1, 1]
				][l][t]
					? "<g transform='scale(-1,1)'>"
					: '<g>';
				let a = (c, m, l, t = '') => [F + z, !1, c, m, l, `transform='${t}'`],
					h = [
						[
							[],
							[
								a(114, 520, 939),
								a(100, 1100, 60, 'rotate(30)'),
								a(100, 1100, 160, 'rotate(30)'),
								a(100, 440, 430, 'rotate(30)'),
								a(160, 370, 560, 'rotate(30)')
							],
							[],
							[]
						],
						[
							[],
							[
								a(80, 1140, 552, 'rotate(10)'),
								a(80, 1155, 660, 'rotate(11)'),
								a(85, 1240, 660, 'rotate(17)')
							],
							[],
							[]
						],
						[
							[],
							[
								a(100, 694, 870, 'rotate(-15)'),
								a(113, 932, 798, 'rotate(0)'),
								a(100, 1280, 230, 'rotate(35)')
							],
							[],
							[]
						]
					],
					M = [-88, -124],
					v = [30, -127],
					n = [
						[M, v, v, v],
						[v, M, v, v],
						[M, M, M, M]
					][l][t],
					L = c('go,re,bu,ba,de').map(
						(c, e) => (
							(K += Z(
								c,
								'0 0 1300 2000',
								r[2][l][e][t],
								e < 4 ? E(g[e]) : R(g[4], g[5]),
								e < 4 ? [] : h[l][t]
							)),
							m(c, 165, 261, -82, -130)
						)
					).join``;
				(K += L),
					2 == l && 1 == t && (K += N('DE', -45, 102, '', '#777', 7, -1)),
					(K += m(F + z, !1, 52, n[0], n[1])),
					(K += S(166, 254, -83, -127, 2, R('#44F'))),
					(K += '</g>');
			}
			if (((K = (K += '</svg>').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23')), P))
				return K;
			{
				let c = document.createElement('img');
				return c.setAttribute('cid', t), (c.src = K), c;
			}
		} catch (c) {
			window.console.warn('See https://github.com/cardmeister/cardmeister.github.io');
		}
	}
	let r = [
		[
			'M0 -500C100 -250 355 -100 355 185A150 150 0 0 1 55 185A10 10 0 0 0 35 185C35 385 85 400 130 500L-130 500C-85 400 -35 385 -35 185A10 10 0 0 0 -55 185A150 150 0 0 1 -355 185C-355 -100 -100 -250 0 -500',
			'M0 -300C0 -400 100 -500 200 -500C300 -500 400 -400 400 -250C400 0 0 400 0 500C0 400 -400 0 -400 -250C-400 -400 -300 -500 -200 -500C-100 -500 0 -400 -0 -300',
			'M-400 0C-350 0 0 -450 0 -500C0 -450 350 0 400 0C350 0 0 450 0 500C0 450 -350 0 -400 0',
			'M30 150C35 385 85 400 130 500L-130 500C-85 400 -35 385 -30 150A10 10 0 0 0 -50 150A210 210 0 1 1 -124 -51A10 10 0 0 0 -110 -65A230 230 0 1 1 110 -65A10 10 0 0 0 124 -51A210 210 0 1 1 50 150A10 10 0 0 0 30 150'
		],
		[
			'',
			'M-270 460L-110 460M-200 450L0 -460L200 450M110 460L270 460M-120 130L120 130',
			'M-225 -225C-245 -265 -200 -460 0 -460C 200 -460 225 -325 225 -225C225 -25 -225 160 -225 460L225 460L225 300',
			'M-250 -320L-250 -460L200 -460L-110 -80C-100 -90 -50 -120 0 -120C200 -120 250 0 250 150C250 350 170 460 -30 460C-230 460 -260 300 -260 300',
			'M50 460L250 460M150 460L150 -460L-300 175L-300 200L270 200',
			'M170 -460L-175 -460L-210 -115C-210 -115 -200 -200 0 -200C100 -200 255 -80 255 120C255 320 180 460 -20 460C-220 460 -255 285 -255 285',
			'M-250 100A250 250 0 0 1 250 100L250 210A250 250 0 0 1 -250 210L-250 -210A250 250 0 0 1 0 -460C150 -460 180 -400 200 -375',
			'M-265 -320L-265 -460L265 -460C135 -200 -90 100 -90 460',
			'M-1 -50A205 205 0 1 1 1 -50L-1 -50A255 255 0 1 0 1 -50Z',
			'M250 -100A250 250 0 0 1 -250 -100L-250 -210A250 250 0 0 1 250 -210L250 210A250 250 0 0 1 0 460C-150 460 -180 400 -200 375',
			'M-260 430L-260 -430M-50 0L-50 -310A150 150 0 0 1 250 -310L250 310A150 150 0 0 1 -50 310Z',
			'M50 -460L250 -460M150 -460L150 250A100 100 0 0 1 -250 250L-250 220',
			'M-260 100C90 100 -40 460 260 460M-175 0L-175 -285A175 175 0 0 1 175 -285L175 285A175 175 0 0 1 -175 285Z',
			'M-285 -460L-85 -460M-185 -460L-185 460M-285 460L-85 460M85 -460L285 -460M185 -440L-170 155M85 460L285 460M185 440L-10 -70'
		],
		[
			[
				[
					'',
					'M0 27v75l60 73v479l45-31V332c48 14 58 60 60 113 42-79 7-103-10-140 22-7 44-16 60-40-20-21-40-27-60-35 46-70 20-97-2-126 4 34 6 68-47 117l-1-66zm616 93c-90 0-177 16-250 36-51 122 18 219-46 324 20-55-82-75-75 5l20 28-45 31L0 696v30l235-162-14-19 277 358v17h305v-17c28-118 72-224 144-320l-104-76c-19 21-36 43-51 66l3-3H410c-15.383-21.17-78.713-100.884-38-50h459l13-13-24-17H413c35-6 69-14 96-32l71-68c60-120-20-130 64-269zm547 345c-23-1-52 9-73 25-40 30-80 15-75-25-70 30-5 140 65 95 42-27 105-40 115-5 32-65 6-90-32-90zM793 574c-66 98-97 213-126 328L413 574l10 11h362zm507 504c-196.852-79.516-275.208-244.183-248-416l-14-11-19-14c-52 66-91 137-120 213l22 24c28-80 65-154 117-222-5 26-8 54-8 83 6.747 144.154 82.867 238.894 158 317-45 116-116 226-186 304l14 17c73-76 146-188 196-307 29.704 26.493 62.533 26.298 88 30v-18m0-93v-31c-86-24-149-113-149-219v-2l-25-17-1 20c0 123 75 226 175 249M833 803l-30 105c81.755 58.593 104.058 170.55 51 256l67 88c57.507-68.105 81.012-158.622 63.904-246.101C967.797 918.419 911.926 843.424 833 802z'
				],
				[
					'',
					'M200 0l156 159c128-37 303-61 459-9L960 0h-86l-72 88h-3c-35-7-70-12-103-15h-5l7-73h-68v71h-5c-39 0-77 3-113 7l-4 1-15-79h-78l33 88-6 1-82 19-4 1L284 0zm96 0l65 97c23-6 48-11 74-16L405 0zm207 0l13 68c33-4 68-7 104-7V0zm205 0l-6 64c31 2 63 7 96 13l63-77zM0 102v594l60-42V175zm495 427c-6 0-12 3-5 11 3.192-2.454 7.163-2.442 10 0 7-8 1-11-5-11zm5 11c2.454 3.192 2.442 7.163 0 10 15 14 15-24 0-10zm0 10c-3.101 3.583-7.296 3.402-10 0-14 15 24 15 10 0zm-10 0c-3.583-3.101-3.402-7.296 0-10-15-14-15 24 0 10zm114-21c-6 0-12 3-5 11 3.192-2.454 7.163-2.442 10 0 7-8 1-11-5-11zm5 11c2.454 3.192 2.442 7.163 0 10 15 14 15-24 0-10zm0 10c-3.101 3.583-7.296 3.402-10 0-14 15 24 15 10 0zm-10 0c-3.583-3.101-3.402-7.296 0-10-15-14-15 24 0 10zm114-21c-6 0-12 3-5 11 3.37-2.557 8.048-2.55 11 0 7-8 1-11-6-11zm6 11h-1zm0 0c2.454 3.192 2.442 7.163 0 10 14 14 14-24 0-10zm0 10h-1zm0 0c-3.321 3.724-8.178 3.55-11 0-14 15 25 15 11 0zm-11 0c-2.454-3.192-2.442-7.163 0-10-14-14-14 24 0 10zm-238 50l185 240c17-85 45-165 85-240zm681 133v2c0 106 63 195 149 219v-62c-46-18-82-63-93-118zM855 852c-5 0-10 2-15 8l-19 23 34 30 20-23c11-14-3-39-20-38zm49 53c-4 1-8 2-12 5l-26 16 25 39 25-16c17-11 8-44-12-44zm-101 2c.213 29.988-1 48.131-1 79 42 40 29 85 16 130l36 47c54.12-85.255 31.66-197.994-51-256zm130 64l-7 1-29 7 13 45 27-7c21-5 21-46-4-46zm-20 71l-1 46 26 1c23 1 34-45 2-46zm-5 68l-14 44 28 7c23 5 43-37 12-45zm-20 55l-15 24 26 33c17-4 32-25 13-39z'
				],
				[
					'',
					'M1011 1309l-48-63a321 321 0 0 0-13-384c21-55 48-108 81-158l-1 31c0 124 53 233 134 299-37 101-93 198-153 275zM748 366c20-3 43-24 48-29 4-4 15 4 14 10-20 10-48 22-62 19m-61-142c2 3 66-39 77-43 14-5 27 7 26 6l2 11s-16-12-25-9-79 40-80 35zm101 10a8 16 0 0 1-9 15 8 16 0 0 1-8-15 8 16 0 0 1 8-16 8 16 0 0 1 9 16z'
				],
				[
					'',
					'M633 94c-111-1-211 20-297 44l20 21c128-37 303-61 459-9l27-28c-73-20-143-28-209-28zM262 515l-7 22 12 13 48-8-14 45 10 13 46-4-12 52 12 12 45-8-12 56 12 12 44-7-16 49 12 13 49-8-16 50 10 13h51l-15 42 9 13 74-6-9-14h-51l15-42-9-13h-51l16-52-12-13-49 8 16-50-12-13-45 8 12-56-12-12-45 8 12-51-11-12-45 4 15-46-11-13-49 8 4-13zm631 28l-45 7-8 12 13 56-55 12-7 14 21 51-51 21-5 13 21 52-42 25-4 14 21 37-43 35 19 11 43-35 3-13-21-36 42-25 4-13-21-51 51-21 5-13-20-49 53-12 8-12-13-55 53-8zm-550 15a8 8 0 0 0 7 7c20.637-4.193-5.768-23.442-7-7zm97 27l220 285c24-101 57-200 105-285zm380 15c1.873 11.54 14.824 8.687 15 0-1.81-9.782-13.874-7.283-15 0zm-350 0h270c-40 75-68 155-85 240zm569 51c-52 69-90 143-118 222 91.734 109.304 91.734 268.697 0 378l81 105c71-78 140-188 186-304l-23-18c-38 101-94 198-154 275l-48-63a321 321 0 0 0 57-198l-1-6-15-81h76l-2-12h-79l-7-18h73l-3-12h-76l-9-18h76l-4-12h-80l-12-18h85l-4-12h-86l7-18h74l-3-12h-66l13.272-30.443zm-669 24c1.873 11.54 14.824 8.687 15 0-1.81-9.782-13.874-7.283-15 0zm105 55c1.873 11.54 14.824 8.687 15 0-1.81-9.782-13.874-7.283-15 0zm323 13c1.81 9.782 13.874 7.283 15 0-1.873-11.54-14.824-8.687-15 0zm409 31c11 55 47 100 93 118v-49zm-707 76c1.873 11.54 14.824 8.687 15 0-1.81-9.782-13.874-7.283-15 0zm218 3c1.81 9.782 13.874 7.283 15 0-1.873-11.54-14.824-8.687-15 0z'
				],
				[
					'',
					'M498 1098V903h305m-305 17h304m-304-17L220 544m308 359L240 531m398 372L332 508m336 395L360 505m484 2C742 620 702 760 668 903m194-382c-93 110-131 245-164 382m230-334a844 844 0 0 0-155 334m174-320a853 853 0 0 0-144 320m216-266c-52 66-90 137-119 213m-67-48a297 297 0 0 1 88 449M809 875a221 221 0 0 1 64 314m-70-282c81.755 58.593 104.058 170.55 51 256M410 570h385m-423-50h459m-451-30h440l480 353M266 513L0 696m235-132L0 726m1300 370c-153-25-270-177-270-361 0-29 3-57 8-84m262 334c-100-24-175-127-175-250l1-20m86 351c-49 120-123 232-196 307m172-321c-46 116-115 226-186 304m101-613.523V740m44.53 154.338L1144.142 884m82.087 99.779l-4.755-4.779m-80.72-87.246c28.235-51.69-60.99-54.275-32.754-2.585-50.824 1.292-13.553 81.413 14.683 34.891 19.2 52.983 74.542-25.845 18.07-32.306v0M1095 762.292c33-42.107-43-66.875-28-11.146-44-11.146-25 73.067 8 35.914 7 54.49 68-6.192 20-24.768v0m126.474 221.487c14.265-53.76-76.08-29.867-34.474 8.362-51.116 16.725 8.321 75.263 24.964 25.088 33.285 40.618 67.759-45.397 9.51-33.45v0M831 806c8 11 11 26 5 38 34-41 81 19 57 49 44-29 72 43 39 63 52-12 55 64 18 74 53 1 35 76-4 75 52 12 19 82-18 73 29 22 10 53-15 62M0 27l105 128v468M0 102l60 73v479m46-433c66-60 47-99 44-141 151 129 110 255 15 380-1-59-8-113-60-128m48-228c22 29 48 56 2 126 20 8 40 14 60 35-16 24-38 33-60 40 17 37 52 61 10 140m921 241c2-15 5-43 9-46l50-60c5-5 35-10 40-10s27 10 30 25c10 45-10 75-35 10-10 10-15 10-30 10 43 34 29 60-15 80m55-125l15-15c31-24 77-8 30 30-7 6-13 10-19 12m15-9c37-11 67 9 8 42-55 32-78 14-54-13m53 14c34-3 55 18-2 38-60 21-77-2-44-22m45 22c35-2 56 22 1 36-57 14-69-12-32-28m-28 76c22-7 50-32 53-46m-216-242c-5 40 35 55 75 25 54-40 157-42 105 65-10-35-73-22-115 5-70 45-135-65-65-95v0m0 0c-45 53 14 102 90 50 74-51 113 24 90 40l-5 15M807 147c6 18 13 42 13 48 0 11-5 13-5 20 0 5 40 70 40 90s-20 20-25 20 0 20 0 25-5 15-5 15 5 8 5 15c-51.958 32.52-5.946 28.262-5 60 0 10-30 35-72.5 35s-93.5-21-121-41-38.5-35-47.5-52m216-87c-39 4-16 40 20 15m-36 64c14-2 28-1 41-10M715 245c33-2 60-32 87-30m-57 22c-12 28 41 8 58 17m17 236l-25-19M366 156c-51 122 18 219-46 324-10 16-50 25-55 0m124-330c-58 125 7 218-49 330-20 40-91 51-95 5-7-80 95-60 75-5m114-341c-67 130-2 226-59 341-9 17-23 24-39 26m142-375c-74 134-4 217-63 334m107-339c-80 136-8 220-67 339m109-343c-83 139-9 208-69 328-12 25-95.8 30.886-118.8 26.886M605 120c-85 140-10 190-70 310-9 18-17 28-30 30m140-339c-85 139-5 149-65 269-7 15-14 22-23 25M200 0l156 159c128-37 303-61 459-9L960 0'
				]
			],
			[
				[
					'',
					'M798 0l198 317c31-16 61-27 99-12-30-94-66-186 12-305zM495 59c-67 89-137 256-209 474l15-9-18 11c90 62 189 99 292 113 29 83 46 178 53 264l52 19c42 19 67 24 85 24 5-102 15-220 50-316h-2c63-13 126-34 188-64l-19-18a674 674 0 0 1-675-37l116-67c27-78 54-148 81-209-5-37-9-76-9-84zm770 456c-52 8-65 52-55 115 62-14 19-83 55-115zM245 569a207 207 0 0 0-54 95c-5-4-11-10-20-24-7 7-18 25-11 32-7-7-25 3-32 10 19 12 24 20 27 25l-24 5c-27 9-56 27-82 53-23 23-40 48-49 73v38l8-1c11 0 23 4 32 13 18 17 15 46-1 62a46 46 0 0 1-39 13v68a171 171 0 0 0 22-57c5 2 12 8 23 25 7-7 18-25 11-32 7 7 24-3 31-10a76 76 0 0 1-24-22l18-5c27-8 56-26 81-52 26-26 44-54 53-82l5-24c5 3 12 7 25 27 7-7 18-25 11-32 7 7 24-3 31-10-14-9-20-16-24-21l16-4c15-4 30-12 45-22-155 181-124 483-166 612 0 0 17 28 22 13 10-28 16-62 20-99 8-57 13-124 23-193 19-132 56-268 160-356l-4-29 11-9-31-13-20 23c-23 23-49 39-70 45l-10 2c10-9 13-21 60-59-6-7-26-12-40 2 14-14 8-34 1-41-39 49-51 51-60 62l3-12a184 184 0 0 1 47-72zm866 9c-10-1-20 2-31 7 46-4 40 81 115 60-8-30-43-67-84-67zm-79 25c-26 50-30 145-43 251h-2l-10-3c-70-11-139 48-154 133-14 80 25 154 89 172l-2 56 24-45c55-107 72-231 83-337 6-53 10-102 17-141 6-23 8-48 18-69zm-822 72c11 0 21 4 30 13 18 17 15 46-1 62a45 45 0 0 1-63 1 45 45 0 0 1 1-63 46 46 0 0 1 33-13zm-58 63c-8 9-17 22-56 54 7 6 27 12 41-2-14 14-8 34-2 41 32-39 46-48 54-55l-2 11c-7 21-23 47-46 70s-49 39-70 45l-10 2c8-8 14-21 58-57-6-7-26-12-40 2 14-14 8-34 1-41-37 46-49 50-58 59l3-11c7-21 22-47 45-70a184 184 0 0 1 82-48zm1148 51l-199 184-5 30 204-189zM165 930a15 15 0 0 0-15 15 15 15 0 0 0 15 15 15 15 0 0 0 15-15 15 15 0 0 0-15-15zM38 1047a15 15 0 0 0-15 15 15 15 0 0 0 15 15 15 15 0 0 0 15-15 15 15 0 0 0-15-15z'
				],
				[
					'',
					'M746 0l206 341 44-24L798 0zm129 35c-31 8-42 4-54 2l58 92c7-20 14-39 26-59-2-16 2-22 5-30-17 2-27-1-35-5zm165 245c-15 4-45 5-66 0l23 36c26-13 52-23 83-16-15-6-31-11-40-20zm130 20c0 14-11 28-20 38-28-21-68 21-47 48-10 8-24 19-38 19 14 0 28 11 38 19-23 26 19 70 47 47 8 10 20 24 20 39 0-16 14-31 21-42 29 30 77-20 49-46 10-8 22-17 35-17-13 0-25-9-35-17 28-26-20-76-49-47-7-10-21-25-21-41zm0 37a3 3 0 0 1 3 3v23c21 1 38 18 39 39h28a3 3 0 1 1 0 6h-28c-1 21-18 38-39 39v28a3 3 0 1 1-6 0v-28c-21-1-38-18-39-39h-28a3 3 0 1 1 0-6h28c1-21 18-38 39-39v-23a3 3 0 0 1 3-3zm-692 85l-57 32c169 94 327 63 482 16-11-15-22-30-32-47h-1c-135 40-258 61-392-1zm-87 228l-13 8c10 58 15 127 10 186 32 9 57 31 74 61a295 295 0 0 1 68-10c23 0 48 3 74 10-7-67-20-144-39-208-60-8-118-24-174-47zm504 20l-70 17c-24 85-31 173-35 264 14-3 29-9 51-20v-1c14-27 35-49 58-63zm-686 35a14 15 45 0 0-11 5 14 15 45 0 0-1 20 14 15 45 0 0 21-1 14 15 45 0 0 0-20 14 15 45 0 0-9-4zm1047 37l44 23zM9 905a14 15 45 0 0-9 3v24a14 15 45 0 0 18-3 14 15 45 0 0 0-20 14 15 45 0 0-9-4zm531 50a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10 10 10 0 0 0-10-10zm110 35a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10 10 10 0 0 0-10-10z'
				],
				[
					'',
					'M526 167a13 20 0 0 0-12 20 13 20 0 0 0 12 20 13 20 0 0 0 13-20 13 20 0 0 0-13-20zm153 2a13 20 0 0 0-13 20 13 20 0 0 0 13 20 13 20 0 0 0 12-20 13 20 0 0 0-12-20zM479 424l-10 2 1 5 12 46 36-19 15 34 35-20 23 34 33-27 26 31 30-30 31 27 24-31 29 27 25-39 38 23 20-35 38 19 7-16-7-10-5 12-37-19-20 35-37-23-24 37-29-25-24 31-29-27-29 29-26-30-32 26-21-33-35 20-14-34-35 19-8-34zm-58 30l-114 67a672 672 0 0 0 674 36c-28-26-53-55-78-87l-16 5 57 44 7 20c13 38-29 41-38 13l-26-77-4 1 26 82c12 38-30 40-39 12l-25-82 31-10-35 10 18 86c9 39-32 37-39 8l-18-83 34-10-35 9 13 86c6 39-35 36-39 6l-14-84 22-5-23 5 7 85c3 40-38 33-40 3l-6-83-5 1 7 83c3 40-38 33-40 3l-7-83h-2v84c0 40-40 30-40 0v-84l-5-1-8 83c-3 40-42 26-39-4l7-82-5-1-8 80c-4 39-42 26-40-4l9-83-3-1-21 79c-10 39-46 19-39-10l16-60-23 56c-15 37-48 13-37-15l28-67-38 70c-18 35-49 7-35-19l38-71-54 64c-26 30-50-3-31-26l9-10 78-31v-1h1l-13-7zm573 179c-33 15-66 27-99 37l5 197c20-12 42-18 65-17l1-10c9-80 12-152 28-207zm-207 11l-72 9c47 3 63 22 7 27 39 5 44 20-7 25 40 4 54 23-2 33 35 4 44 22 0 27v7c32 7 40 20-1 23v8c31 5 38 16 0 21v5c25 5 30 15-1 20v5c26 5 32 15 0 20v5c26 5 32 15 0 20v1c21 5 24 13-1 18v1c22 6 26 14 0 19v5l31 9c4-97 13-213 46-308zm-185 7c30 87 46 181 52 270l26 10 14 7v-17c-41-3-48-17-1-23l-1-3c-42-3-49-17-1-23v-1c-44-2-52-17-1-23v-3c-45-2-53-18-1-24v-1c-48-2-56-20-2-26v-2c-51-1-61-20-1-26v-3c-50-1-60-20-1-26v-2c-57 0-68-23-2-29v-1c-64 2-78-24-1-29v-1c-57 2-78-13-40-21-13 0-27-1-40-3zm654 91a4683 4683 0 0 0 44 23zm18 9l-2-1-3 3c14 7 2 26-28 29h-1c-3 19-21 43-35 48-19 7-62 14-87-7l-17 150 199-185v-23l-26-14z'
				],
				[
					'',
					'M676 0l364 600 50-30L746 0zM504 244c-27 61-54 131-81 209l122-71c-17-29-28-58-30-67l-11-71zM259 548l-24 14a722 722 0 0 0 330 135c19 64 32 141 38 208l25 7c-6-77-20-162-44-238a690 690 0 0 1-325-126zm763 45c-71 35-143 59-216 72-28 91-37 197-41 290h10l16-4c3-91 10-179 34-264 57-11 113-29 169-54-16 55-19 127-28 207l-2 10 13 1 11 2c14-106 18-200 44-250z'
				],
				[
					'',
					'M1170 388c9 0 18 8 18 17s-9 18-18 18-17-9-17-18 8-17 17-17m-540 647c-43 0-4-19 6-31-15-6-58-3-21-24 0-43 19-4 31 6 6-15 3-58 24-21 43 0 4 19-6 31 15 6 58 3 21 24 0 43-19 4-31-6-6 15-3 58-24 21m-90-30c-37 22-13-14-10-30-16 3-52 27-30-10l-3-6c-15-28 18-7 33-4-3-16-27-52 10-30 37-22 13 14 10 30 16-3 49-25 32 6l-2 4c22 37-14 13-30 10 3 16 27 52-10 30m-487 57c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15m127-117c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15m470-760c-5 15 17 25 30 25 19 0 45-20 60-20m-110 0c22-1 31-18 45-20 30-5 50 20 65 20m-242 2c3 9 14 13 27 13 21 1 35-10 50-15m-75-5c4-9 14-17 25-17 20 0 35 22 50 22m20 185c13 16 29 11 45 0-14 8-29 5-45 0m-15-20c12 6 14-5 20-5 5 0 11 5 16 5s12-6 17-6c18 10 20 1 32 1m-35-80c30-1 25 35 10 35-7 0-13-8-19-9-16-1-16 9 4 4m-5-150c36-43 75-22 115 0-38-16-75-35-109 0h-6m-15 180s-5-20-15-20-20-4-20-19c0-10 24-82 15-141-27-19-56-30-90-10h5c30-10 58-10 85 10m-90-72c46-29 57-54 65-78m-65 102c70-39 75-70 84-102m62 0c16 35 41 56 74 65M623 0c18 57 55 85 107 89m446 402c4 71 30 97 34 145m-50-150c4 81 36 105 35 162m32-218c10-3 28-25 48-25-20 0-38-22-48-25-11-5-27 0-42 10 10-15 15-31 10-42-3-10-25-28-25-48 0 20-22 38-25 48-5 11 0 27 10 42-15-10-31-15-42-10-10 3-28 25-48 25 20 0 38 22 48 25 11 5 27 0 42-10-10 15-15 31-10 42 3 10 25 28 25 48 0-20 22-38 25-48 5-11 0-27-10-42 15 10 31 15 42 10m-347 8c24 13 54 28 84 36m-119-93c24 14 56 32 88 43M798 281c18 11 44 26 72 38m-51 11c21 12 51 30 83 42m-343 33l-30 37m311-72c-17 27-39 51-60 76m-90-13c44-11 110-61 137-85M495 0v160c0 15 15 135 20 155s55 140 110 140 105-55 105-55m-307 53c27-78 54-148 81-209M385 476c38-111 76-207 113-284M323 511c59-175 116-315 171-407M286 532c72-217 142-384 209-473M173 599l32 25m24 18l12 9m39 31l15 11m-282-2l64 49m25 20l17 13m40 30l15 12m24 18l40 32M61 663l66 51m91 70l40 31M111 918l38 28m16 13l29 22M0 810l9 7m25 19l12 10m40 31l15 11m26 20l31 24m21 16l28 22M0 746l39 30m24 18l80 61m24 19l55 43M47 997l71 55m-52-83l78 60m-134-17l83 64m-93-29l24 19m15 11l28 22m-65-72l29 23m-31-19a171 171 0 0 0 21-57m338-338l-20 23a184 184 0 0 1-80 48m-39-37l3-12a184 184 0 0 1 47-72m-25-17a207 207 0 0 0-54 95m72 72l16-4c15-4 30-12 45-22m-169-3l-24 5c-27 9-56 27-82 53-23 23-40 48-49 73m63 97l18-5c27-8 56-26 81-52 26-26 44-54 53-82l5-24m-31 4l-2 11c-7 21-23 47-46 70a184 184 0 0 1-80 48m-39-37l3-12c7-21 22-47 45-70a184 184 0 0 1 81-48M35 918c41-16 14-14 84-71-6-7-26-12-40 2 14-14 8-34 1-41-57 70-55 43-71 84m4 61c1 28 7 7 32 46 7-7 18-25 11-32 7 7 24-3 31-10-38-25-18-32-46-32M0 908c5.786-3.947 13.265-3.532 18 1 5.36 5.226 5.36 14.036 0 20-4.855 5.037-12.323 6.281-18 3m235-214c41-16 14-14 84-71-6-7-26-12-40 2 14-14 8-34 1-41-57 70-55 43-71 84m-2 55c-16 41-14 14-72 84-6-7-12-27 2-41-14 14-34 8-41 2 71-57 44-56 85-71m-7-7c-28 0-7-7-46-32 7-7 25-17 32-10-7-7 4-25 11-32 24 39 31 18 32 46m10 67c1 28 7 7 32 46 7-7 18-25 11-32 7 7 24-3 31-10-38-25-18-32-46-32m-25-26c6-6 11-14 14-28m-2 41c6-7 14-12 28-15m-69 30c-5 6-13 12-27 15m40-2c-6 6-12 13-15 28m10-75c-4-3-6-9-5-21m-9 35c-3-4-8-7-20-7m73 31c3 4 9 6 20 5m-34 9c4 3 7 9 6 20m-8-36c-5.843 6.264-15.412 6.72-21 1-5.045-5.5-4.605-14.298 1-20 5.702-5.605 14.5-6.045 20-1 5.36 5.226 5.36 14.036 0 20m682 341l33-39m-53-51l41 10m-16-55l28 34m-63 36l50-3m-40 53l46-32m-16 72l29-60m-19-120l20-35 35 20-13 61m-21 2l-21-48-33-5 3 40-35 15 15 40-23 30 33 20-10 40h40l5 35m40-90c-19 0-35-18-35-40s16-40 35-40c7 0 13 2 18 6m-51 167l-4-1c-48-14-83-74-71-143 13-74 72-122 126-113l8 2 5 1m-160 92c-18 8-33 12-48 14-25 2-57-3-110-26-41-18-76-28-108-32m-40-1a203 203 0 0 0-47 8m347 71a162.002 162.002 0 0 1-47 10m-27-1c-21-3-46-10-77-22m172-61c-31 15-49 22-66 24-18 1-44-2-95-24a370 370 0 0 0-169-35c-18 2-34 5-49 10m18 73l15-5m92 4l21 6m632-202c-3 19-21 43-35 48-19 7-62 14-87-7m117-70c55-13 49 25 6 29-48 3-59-17-6-29m1-38c54-29 58 12 14 29-49 18-67 0-14-29m0-35c52-37 61 4 18 26-49 25-69 10-18-26m-6-35c40-50 60-14 25 20-40 38-64 28-25-20m-88 33l18-18c5-5 28 2 39-13 17-23 35-6 18 13-14 15-37 27-37 27 11 35 6 67-10 98M870 423c-135 40-258 61-392-2m-57 33c169 94 327 63 482 16m-5-311c4-23 2-48 32-69 2-29 7-59 14-90M821 37c12 2 23 6 54-2 8 4 18 7 35 5-3 8-7 14-5 30-12 20-19 39-26 59m84 135c27 10 57 6 82-9 10 20 32 34 50 50m-168-98c27-9 52-25 78-37m35-25c-35 32-9 91-44 107-39 19-57-39-40-51 19-12 43 7 33 24-10 18-18 1-18 1m69-81c-45 15-84-37-115-15-35 25 6 70 25 60 20-10 15-40-5-40s-10 15-10 15m6 63l-23 13m42 17l-44 25m63 5l-43 26m61 3L798 0m154 341c49-25 87-58 143-36-30-94-66-186 12-305M575 648c29 83 46 178 53 264m187-273c-35 96-45 214-50 316m-84-301l14 284m20-285l-5 291M283 535c213.743 144.427 489.538 159.792 718 40M751 123c41.217 233.98 184.547 437.429 391 555m-984 644c46-143 4-495 221-664l11-9m-12 9c10 58 15 127 10 186m731-179c-9 28-15 62-19 99-8 57-13 124-23 193-19 132-56 268-160 356m-7-101l24-45c55-107 72-231 83-337 6-53 10-102 17-141 6-23 8-48 18-69M388 844c64 18 103 92 89 172-15 85-84 144-154 133l-10-3m599 10c99-195 71-456 120-553M210 967L0 1161m546-779L0 698'
				]
			],
			[
				[
					'',
					'M320 0c61 95 92 153 116 220 187-17 340-9 491 15 21-60 42-111 139-235zm770 79c-15 0-30 9-30 31 0 20 15 81-5 95 26 40 26 70 4 91 5-7 3-21-12-23-25-2-22 47 13 47 65 0 25-130 25-215 5 20 35 20 35-5 0-13-15-21-30-21zm140 106h-2c0 17-4 33-13 49 4 7 9 11 15 11 11 0 20-13 20-30s-9-30-20-30zm20 30a23 25 0 0 0 23 25 23 25 0 0 0 22-25 23 25 0 0 0-22-25 23 25 0 0 0-23 25zm-50 120a25 25 0 0 0-11 3c-36 17-52 17-88 0a25 25 0 1 0-22 44c28 15 56 20 84 16l-12 57c-4 16-10 32-18 48-9-14-15-28-18-43l-12-58-34 49c-18 26-35 40-50 48-4 5-20 22-29 29h-4l1 2h-1 1c58 131 191 271 313 374v-40c-111-98-228-225-281-339 24-8 48-26 71-60 7 33 26 59 45 85 20-30 33-60 40-90 28 55 77 71 125 87v-3c-16-10-29-22-39-38-27-12-48-27-64-57l-26-52c13-3 27-8 40-15a25 25 0 0 0-11-47zM721 538l-25 25c-3 6-9 12-17 17L511 744l22 81c16-17 16-43 0-59l-4-4 4 4a42 42 0 0 0 61-60l-4-4 4 4a42 42 0 1 0 61-59l-5-4 5 4a42 42 0 1 0 61-59l-5-5 5 5c10 10 24 14 38 12l10-48c-15-3-30-8-43-14zm-6 110a42 42 0 0 0-1 60l3 3-3-3a42 42 0 1 0-61 59l4 4-4-4a42 42 0 1 0-61 60l4 3-4-3a43 43 0 0 0-59-2c7 27 13 55 18 84l183-179c3-31 7-63 13-94-12-1-24 4-32 12zm242-70l-13 23a318 318 0 0 1 88 223c1 71-21 138-61 192-24 31-56 59-93 76l45 4c26-18 50-41 68-65 44-58 67-131 67-207a344 344 0 0 0-101-246zm-205 30zm151 83a630 630 0 0 0-44 309c15-10 29-23 40-38 27-36 44-85 44-138 0-51-15-98-40-133zm227 50v289h105l15-18v-67l-44-54 34-38-43-41-37 41v-79zM571 925l-15 14 4 31 10-10 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20 2 2-2-37zm589 4l40 49-40 40zm-70 81c-21 28-41 58-74 77a15 15 0 0 0-8-3 15 15 0 0 0-15 19c9 39 9 54 0 82a15 15 0 0 0 26 14l71 71c4-21 5-45-20-90 29-10 53-26 70-50-17-7-40-13-70-20 23-37 25-69 20-100zm-31 72l-8 16-17 27 31 7 34 8c-10 8-22 14-36 19l-26 8 13 24 8 16-23-24-9-6c5-21 4-42-2-69l3-2c12-7 23-15 32-24zm241 206c-63 54-136 97-214 136l22 22c69-34 133-73 192-120z'
				],
				[
					'',
					'M667 61c-8 7-17 14-28 18-5 22-15 42-27 57-58 1-118 3-182 9-6-7-11-14-15-22-8-15-12-29-15-40-15-4-29-12-41-21 29 49 49 88 65 128 196-17 356-9 514 16 15-38 35-78 79-140-18 9-41 17-70 22a111 111 0 0 1-32 69l-204-14 203 14c-66-10-133-16-203-19-9-16-16-35-18-56-10-6-19-13-26-21zm423 284a15 15 0 0 0-15 15 15 15 0 0 0 15 15 15 15 0 0 0 15-15 15 15 0 0 0-15-15zm110 0a15 15 0 0 0-15 15 15 15 0 0 0 15 15 15 15 0 0 0 15-15 15 15 0 0 0-15-15zm-55 15a15 15 0 0 0-15 15 15 15 0 0 0 15 15 15 15 0 0 0 15-15 15 15 0 0 0-15-15zM747 548l-17 17 4 5c7 8 17 8 24 1l2-3 4-16zm-200 5c-13 11-29 19-46 24-16 5-32 8-49 10 19 43 36 86 50 131l112-109c-24-8-47-27-67-56zm-45 165h1-1zm191-117l-24 23 4 6c7 7 17 7 24 0 8-7 8-18 1-25l-5-4zm50 60c-4 0-8 2-11 5-7 7-7 17 0 25l4 2zm-111 0l-24 23 4 5c7 7 17 7 24 0 8-7 8-17 1-25l-5-3zm668 29h-171c52 62 112 122 171 174zm-616 30c-5 0-9 2-13 5-7 7-7 18 0 25l4 3 24-24-3-4c-3-3-8-5-12-5zm-113 0l-24 23 4 5c7 7 17 7 25 0 7-6 7-17 0-24l-5-4zm331 16c-12 4-20 15-20 28 0 17 13 30 29 30h7l-2 1c-16 0-29 13-29 30s13 30 29 30l2 1-8 1c-16 0-29 13-29 30 0 10 6 20 14 25l-10-1c-16 0-29 13-29 30 0 9 4 18 12 23 33-33 52-85 52-140 0-31-6-61-18-88zm-171 32L571 925h159c-3-52-3-104 1-157zm429 5v79l37-41c-12-14-25-26-37-38zm-537 6c-5 0-9 2-13 5-7 7-7 18 0 25l4 3 24-23-3-4c-3-4-8-6-12-6zm-61 59c-5 0-9 2-13 6-7 7-7 17 0 24l5 4 23-24a19 19 0 0 0-15-10zm678 15l-34 38 44 54v-83zm30 26v151h30V904l-30-25zm-110 50v89l40-40zm90 84l-18 17h18zm50 17h-208c1 25-4 51-22 80 30 7 53 13 70 20l-14 17c68-15 130-71 174-109zm-2 165l-48 35 33 44-28 19-14-16 3-2 8 10 23-15-30-36-48 35 31 43-30 18-13-16 3-2 8 10 24-14-28-38-49 33 28 46-30 16-12-17 3-2 7 11 25-13-26-39-51 30 28 46-30 16-12-17 3-2 7 11 25-13-26-39-49 28 8 9 37-21 12 19-3 1-7-11-25 14 26 37 52-28-30-46 31-18 12 19-3 1-7-11-25 14 26 37 52-28-30-46 30-20 13 18-3 1-7-10-24 15 28 35 49-30-31-45 29-21 14 17-3 2-8-10-23 16 30 34 47-32v-1l-33-43 29-22 4 5v-19zm1 25l-23 16 24 28v-18l-6-8 3-2 3 4v-19z'
				],
				[
					'',
					'M603 277c-15 4-11 33 0 33 15-4 10-32 0-33zm-123 1c-15 4-11 33 0 34 15-4 11-33 0-34zm720 22c-16 12-38 20-55 20-16 0-33-9-44-17l1 35c35 17 51 17 87 0 3-2 7-3 11-3zm-25 160c-7 30-20 60-40 90-19-26-38-52-45-85-23 34-47 52-71 60 25 54 64 110 110 165h171V547c-48-16-97-32-125-87zm-189 68l-16 28c73 70 114 167 113 268 1 85-28 169-82 235h8l4 1c22-16 38-39 57-65l20 15 2 20h38l1-289a878 878 0 0 1-145-213zm-182 42c-17-6-17 10-10 14 16 8 22-7 12-12l-2-2zm80 4c-16-7-16 10-9 15 17 8 21-9 11-14l-2-1zm-37-4l-77 100 39-19 12 31 23-25 21 29zm-171 99v17h17v-17zm95 61c-12 0-11 16-1 17 13 2 16-16 3-17h-2zm68 5c-12 0-12 17-2 18 13 1 17-17 4-18h-2zm-38 13l-47 108 26-19 10 24 21-24 24 23zm-186-20v17h17v-16zm138 206c2 14 20 13 20 1-2-14-20-12-20-1zm60 3c3 15 21 13 20 2-2-15-20-13-20-2zm-19 9l-29 129 27-27 19 29 7-35 35 21zm506 93c-44 38-106 93-175 108l-55 33c25 45 24 69 20 90l-71-71c-8 11-25 7-27-6l-63 21c21 40 47 78 76 116 109-58 212-118 295-193zm-308 154l1-1h-1zm-72 74l-15 33-31-13-5 30-40-15 107 98zm45 105c-10 0-10 18 2 14 8 0 4-15-2-14zm-63 24l-2 1c-7 2-4 15 6 12 7-4 1-12-4-13z'
				],
				[
					'',
					'M632 181c-66 0-134 3-207 10l11 29c187-17 340-9 491 15l11-29c-99-16-198-25-306-25zm441 226l-9 18c50 23 105 24 155 3l-8-18c-45 19-93 18-138-3zm-523 98c-12 40-59 53-110 57l12 24c17-1 33-4 49-9 17-5 33-13 46-24 20 29 43 48 67 56L502 717l9 27 168-164c-31 19-90 17-129-75zm420 51l-13 22a344 344 0 0 1 101 245c0 77-23 150-67 208-18 24-42 47-68 65l69 3c0-8 7-15 16-15 3 0 6 2 8 3 33-19 53-49 74-77l-20-15c-19 26-35 49-57 65l-4-1h-8l10-13c47-63 71-141 71-222a369 369 0 0 0-112-268zm77 21l4 6h249v-6zm13 20l4 6h236v-6zm12 19l6 9h222v-9zm17 23l9 12h202v-12zm18 24l12 15h181v-15zm-373 67L551 909l5 30 175-171zm516 132v168h20V880zm-680 98l-10 10 5 35h171l-4-43-2-2-20 20-20-20-20 20-20-20-20 20-20-20-20 20zm521 89l-1 12h184l14-12zm-3 22l-3 9h166l11-9zm-6 16l-3 6h155l7-6zm218 50c-83 75-186 135-295 193l19 24c99-53 195-108 276-177z'
				],
				[
					'',
					'M645 295c-20 0-30-16-40-16-20 1-25 16-35 16 5 0 15 15 40 15 15 0 15-15 35-15m-205 0c20 0 30-16 40-16 20 1 25 16 35 16-5 0-15 15-40 15-15 0-15-15-35-15m90 155c17 17 30 15 45 0m-75-10l4-6c1-1 16-4 26-14 0 0 0 10 13 10 10 0 17-10 17-10s10 10 20 10l25 5-5-5c-28 7-90-3-100 10m65-75c25 0 29 24 11 31-6 2-16-2-18-9m-33-132s10 25 10 30-20 50-20 60-10 35-10 40 15 15 20 15 20-10 30-15m115-125s-35-20-45-20c-15 0-35 10-45 10s-25-5-25-5v5c8 0 20 5 25 5s30-15 45-15m-190 25s15-20 35-20 30 10 40 10c5 0 15-10 15-10v10c-5 0-10 5-15 5s-30-15-35-15m-38-26c-6 11-12 26-12 38 0 20 5 48 5 48m18-88c-5 14-13 42-13 53 0 15 5 25 5 50 0 40-70 55-70 0 0-45 60-55 60-15s-40 30-40 10 25-20 25-5m10 38c-2 18-9 27-8 40 1 8 8 27 8 52m10-100s6 80 5 105c-2 39-75 78-75 0 0-50 60-45 60-5s-45 30-45 5 35-20 35 0m92 103c8-16 12-36 13-53m-36 61c13-18 20-44 21-66m-44 70c18-17 27-49 29-75m-97 78c48 8 69-55 69-97s-27-66-27-126m-50 195c49 8 64-29 64-70 0-43-24-85-14-125m285 103c-6-7-11-14-15-23m-19 43c-4-5-8-11-11-18m11 64c-14-7-27-20-36-39m12 62c-17-7-32-21-42-42m65 60c-25 35-75 8-100-45m169-21c3-19 5-22 4-33-5-67-67-44-58-238m69 340c27-21 42-72 39-108-8-85-63-90-66-230m61 343c24-22 35-81 35-113 1-96-60-132-69-228m62 342c25-21 37-81 37-114 1-95-61-132-71-226m66 339c24-22 35-81 35-113 1-95-63-131-74-224m70 331c23-23 34-75 35-107 0-94-64-130-77-220m76 312c21-22 31-62 31-92 1-92-65-129-79-217M707 530c49 2 68-20 68-66 1-75-65-84-59-251m19 272c0-35-35-35-35 5s55 20 55-15c0-50-75-40-75 10 0 64 114 78 179 73s130-48 130-113c1-91-65-128-81-213m6 23h161m-122-85h112m230 45c0 13-10 24-22 25-13 0-23-11-23-25s10-25 23-25c12 1 22 12 22 25m-67-30h2c11 0 20 13 20 30s-9 30-20 30c-6 0-11-4-15-11m-19-86c22-14 37 22 31 54-8 46-31 49-27 7m-33-66c24-21 40 17 36 51-7 44-28 62-31 31m-32-85c40-34 38 72 35 80-8 20-26 27-30-6m-45-54c2-12 8-19 20-25 21-11 29 21 30 41m-1 23c-6 38-23 36-28-6m-32-29c3-2 8-4 16-4 25 0 35 15 40 15 18 0 24 24-5 25-20 0-30-20-30-20 6 14 17 29 5 40 35 7 45 30 45 60m-68 16c10 9 32 24 53 24 30 0 75-25 75-50 0-12-4-24-9-33m-126-132c0 85 40 215-25 215-35 0-38-49-13-47 18 2 18 22 8 27 26-21 28-52 0-95 20-14 5-75 5-95 0-45 60-35 60-10s-30 25-35 5m115 195v35m-99-32l3 36m-80 769l3-2c12-7 23-15 32-24l-8 16-17 27 31 7 34 8c-10 8-22 14-36 19l-26 8 13 24 8 16-23-24-9-6m-33 15l-83 28c-15 5-25 10-36 16-27 15-34-11-19-21s25-10 25-10m5-85h-45c-40 0-75 25-35 30m85-5c-5 0-60 5-80 5s-45 25 0 30m90-5c-40 0-60 5-80 5-30 0-40 25-10 25h83m99-105c-28-2-117-8-142-8-55 0-79 28-10 28m461-82c-45 38-107 94-176 109m-117-63c-10 0-18 9-15 19 9 39 9 54 0 82a15 15 0 1 0 28 9c11-32 11-57 1-98a15 15 0 0 0-14-12m121-394h171m-82 143l-51 57 73 90-50 50m-98 0h208m0 258c-63 54-136 97-214 136m116-1038c26 73 57 131 98 158m-100-209a25 25 0 0 0-11 3c-36 17-52 17-88 0a25 25 0 1 0-22 44c44 23 88 23 132 0a25 25 0 0 0-11-47M986 530c52-40 73-94 97-146m-205 708c37-17 69-45 93-76 40-54 62-121 62-192a318 318 0 0 0-89-223m-85 399c15-10 29-23 40-38 27-36 44-85 44-138 0-51-15-98-40-133m397 173c-111-99-228-226-281-339m-70-2c49 16 96 7 141-58 7 33 26 59 45 85 20-30 33-60 40-90 28 55 77 71 125 87m-915-42c-10 0-19 29 5 30 19 1 40-45 0-45-45 0-40 74 10 74 65 0 135-9 150-59 55 130 150 80 150 45 0-28-35-30-40-15-7 21 10 30 25 15M556 939l175-171m8-77L545 880m13 70h173M519 771l228-223m17 4c-77 322-24 630 95 886M0 674c108-87 238-145 369-202m738 974a993 993 0 0 1-178-233m-50-120c-49-165-27-351 107-565 58 132 192 272 314 376M405 147c211-20 383-11 552 16M321 0c60 95 91 153 115 220M1065 1a728 728 0 0 0-138 234m-177-95c-18-18-29-43-28-78-32-8-43-32-48-62m-8 0c-8 29-21 52-54 56-3 40-20 65-45 81m-91 4c-42-20-41-54-54-86-27 1-58-24-87-55m534 151c32-12 51-38 48-89 92-11 108-39 144-62M827 0c-21 55-79 53-85 98-5 45 65 53 70 8 4-30-36-34-40-5-1 15 23 18 25 3M832 0c7 59 65 70 59 116-5 44-74 36-69-9 3-30 43-25 40 5-2 15-27 12-25-3M514 0c-10 55-59 62-57 107s64 42 62-3c-2-31-37-28-36 2 1 15 23 13 22-2M521 0c16 53 66 55 68 100 3 45-59 48-61 3-2-30 33-32 35-2 1 15-21 16-22 1'
				]
			]
		]
	];
	create({ cardt: s, attributes: t });
	let h = (c) => (c.src = s(pars(c, { cid: c.getAttribute('is'), img: 1 })));
	a.map((c) =>
		z.map((m) =>
			customElements.define(
				c + '-of-' + m,
				class extends HTMLImageElement {
					static get observedAttributes() {
						return t;
					}
					constructor() {
						super(), props(this), h(this);
					}
					attributeChangedCallback() {
						h(this);
					}
				},
				{ extends: 'img' }
			)
		)
	);
})();
