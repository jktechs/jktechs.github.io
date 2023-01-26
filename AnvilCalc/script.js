const enchants = {
		Pr: [1, 4],
		FP: [2, 4],
		FF: [2, 4],
		BP: [4, 4],
		PP: [2, 4],
		T: [8, 3],
		Re: [4, 3],
		DS: [4, 3],
		AA: [4, 1],
		Sh: [1, 5],
		Sm: [2, 5],
		BoA: [2, 5],
		K: [2, 2],
		FA: [4, 2],
		Loo: [4, 3],
		E: [1, 5],
		ST: [8, 1],
		U: [2, 3],
		Fo: [4, 3],
		Po: [1, 5],
		Pu: [4, 2],
		Fl: [4, 1],
		In: [8, 1],
		LotS: [4, 3],
		Lu: [4, 3],
		FW: [4, 2],
		Me: [4, 1],
		CoB: [8, 1],
		CoV: [8, 1],
		Im: [4, 5],
		Ri: [4, 3],
		Loy: [1, 3],
		C: [8, 1],
		Mu: [4, 1],
		Pi: [1, 4],
		QC: [2, 3],
		SSp: [8, 3],
		SSn: [8, 3],
		SE: [4, 3]
}

function allPossibleFBT(n) {
    if (n == 1)
        return [0];
    let left = [];
    let right = [];
    let all = [];
    for (let i = 1; i < (n+1)/2; i = i + 2) {
        left = allPossibleFBT(i);
        right = allPossibleFBT(n - i - 1);
        for (let treeNode1 of left)
            for (let treeNode2 of right)
                all.push({"ench": [], "used": 0, "book": true, "total": 0, left: treeNode1, right: treeNode2});
    }
    return all;
}
function permutations(array) {
    let permutationList = [];
    if(array.length == 1)
        return array;
    for(let i = 0; i < array.length; i++) {
        let arrayLength1 = [ array[i] ];
        let auxArray = Object.values(array);
        auxArray.splice(i, 1);
        let subPermutations = permutations(auxArray);
        for(let j = 0; j < subPermutations.length; j++) {
            let arrayMerge = arrayLength1.concat(subPermutations[j]);
            permutationList.push(arrayMerge);
        }
    }
    return permutationList;
}
function BFS(root, func) {
    if(root.left !== undefined) {
        BFS(root.left, func);
        BFS(root.right, func);
        if(root.left.left === undefined){
            root.left = func(root.left);
        }
        if(root.right.left === undefined){
            root.right = func(root.right);
        }
    }
}
function BFS2(root, func) {
    if(root.left !== undefined) {
        BFS2(root.left, func);
        BFS2(root.right, func);
        func(root);
    }
}
function BFS3(root){
    if(root.left !== undefined) {
        let s = BFS3(root.left);
        let s2 = BFS3(root.right);
        return "(" + s + " + " + s2 + ")"
    } else {
        return root.name
    }
}
function call(choises) {
    let itemOptions = []
    for(let c of choises){
        itemOptions.push({"ench": [enchants[c]], "used": 0, "book": true, "total": 0, "name": c});
    }
itemOptions.push({"ench": [], "used": 0, "book": false, "total": 0, "name": "item"})
const size = itemOptions.length;
let all = [];
for(let items of permutations(itemOptions)){
    let trees = allPossibleFBT(size*2-1);
    for(let tree of trees){
        var i = 0;
        func = ()=>{
            let v = items[i];
            i++;
            return v;
        }
        BFS(tree, func)
    }
    all = all.concat(trees)
}
let viable = [];
for(let tree of all){
    BFS2(tree, branch=>{
        let target = branch.left;
        let sacrifice = branch.right;
        branch.ench = branch.left.ench.concat(branch.right.ench)
        if(target.book === undefined || sacrifice.book === undefined || (target.book && !sacrifice.book)){
            branch.book = undefined;
        } else {
            branch.book = target.book && sacrifice.book; 
        }
        branch.used = Math.max(target.used, sacrifice.used) + 1;
        let enchCost = 0;
        for(let ench of sacrifice.ench){
            enchCost += ench[1] * (sacrifice.book ? Math.max(Math.floor(ench[0]/2),1) : ench[0])
        }
        branch.total = target.total + sacrifice.total + Math.pow(2, target.used) + Math.pow(2, sacrifice.used) - 2 + enchCost;
    })
    if(tree.book !== undefined){
        viable.push(tree);
    }
}
viable = viable.sort((a,b) =>{
    if(a.total === b.total) return 0;
    return a.total < b.total ? -1 : 1;
})
let done = []
let output = ""
for(let v of viable) {
	if(done.includes(v.total)) continue
	done.push(v.total)
	output += BFS3(v) + " takes " + v.total + " levels \n"
}
document.getElementById('data').innerText = output
}
var items = []
function addBox(name) {
	const div = document.createElement('div');div.innerText = name;const e = document.createElement('input');div.appendChild(e);e.type="checkbox";e.innerText = "lol";document.body.appendChild(div);e.onchange = v => {
		if(v.target.checked)
			items.push(div.innerText)
		else
			items.splice(items.indexOf(div.innerText), 1)
	}
}
Object.keys(enchants).forEach(v=>addBox(v))