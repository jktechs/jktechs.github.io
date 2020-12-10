let pag = new URLSearchParams(window.location.search).get('page');
if(!pag)
pag = 0;
let day = new URLSearchParams(window.location.search).get('day');
if(!day)
day = 0;
function curday(sp, off){
	today = new Date();
	today.setDate(today.getDate() + off);
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) dd='0'+dd;
	if(mm<10) mm='0'+mm;
	return (mm+sp+dd+sp+yyyy);
};
function Ready(){
	document.getElementById("menubar").children[pag].children[0].className = "active";
	for(let i = 0;i<document.getElementById("menubar").childElementCount;i++){
		document.getElementById("menubar").children[i].children[0].href = "?page="+i+"&day="+day;
	}
	if(pag == 1){
		document.getElementById("header").innerText = "Huiswerk"
	} else if(pag == 0) {
		document.getElementById("header").innerHTML = "<a href='?day="+(parseInt(day)-1)+"&page="+pag+"'> < </a>Datum: "+curday("/",parseInt(day))+"<a href='?day="+(parseInt(day)+1)+"&page="+pag+"'> > </a>"
	}
	let lines = []
	if(pag==0)
		lines = ["Vak Naam","Huiswerk titel","[xx:xx-xx:xx]","hier staat meer uitleg over het huiswek"];
	else
		lines = ["Huiswerk titel","vak","[xx/xx/xxxx xx:xx-xx:xx]","uitleg"];
	for(let k = 0;k<10;k++){
		data = document.getElementById("dataHolder");
		div = document.createElement('div');
		data.appendChild(div);
		div.className = "LessonItem"
		for(let i = 0;i<2;i++){
			div2 = document.createElement('div');
			div.appendChild(div2);
			div2.className = "LessonLine";
			div2.style = "width:75%;margin:0 auto;";
			for(let j = 0;j<2;j++){
				span = document.createElement('span');
				div2.appendChild(span);
				span.innerText = lines[j+i*2];
			}
		}
	}
}