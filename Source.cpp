#include <iostream>
#include <vector>
#include <string>
#include <forward_list>
#include <algorithm>
#include <bitset>
#include <unordered_map>
using namespace std;
constexpr int itemCount = 8;
#define item Item<itemCount>
#define list forward_list<item*>
template<int N>
class Item {
public:
	Item* left = nullptr;
	Item* right = nullptr;
	bool isBook;
	int useCost = 0;
	int itemCost;
	int bookCost;
	int totalCost = 0;
	bitset<N> id = bitset<N>();
	Item(Item* left, Item* right) : left(left), right(right) {
		isBook = left->isBook && right->isBook;
		useCost = max(left->useCost, right->useCost) * 2 + 1;
		itemCost = left->itemCost + right->itemCost;
		bookCost = left->bookCost + right->bookCost;
		id = left->id | right->id;
		totalCost = left->totalCost + right->totalCost + left->useCost + right->useCost + (right->isBook ? right->bookCost : right->itemCost);
	}
	Item(bool isBook, int itemCost, int bookCost, int type) : itemCost(itemCost), bookCost(bookCost), isBook(isBook) {
		id = bitset<N>();
		id.set(type);
	}
};
void CheckPair(item* i, item* j, list* items, list* full) {
	auto endList = (i->id | j->id).all() ? full : items;
	if ((i->id & j->id).any()) return;
	if (!(i->isBook || j->isBook)) {
		endList->push_front(new item(i, j));
		endList->push_front(new item(j, i));
	} else {
		if (j->isBook) endList->push_front(new item(i, j));
		if (i->isBook) endList->push_front(new item(j, i));
	}
}
list* GetTrees(list* items, list* old, list* full) {
	auto out = new forward_list<item*>();
	auto begin = items->begin();
	auto end = items->end();
	for (; begin != end; begin++) {
		item* i = begin.operator*();
		auto begin2 = forward_list<item*>::iterator(begin);
		for (; begin2 != end; begin2++) {
			item* j = begin2.operator*();
			CheckPair(i, j, out, full);
		}
		for (item* j : *old) CheckPair(i, j, out, full);
	}
	return out;
}
string ToString(item* i, char** names) {
	if (i->left == nullptr) {
		int v = 0;
		for (int j = 0; j < 8; j++) if (i->id.test(j)) v += j;
		return names[v+1];
	} else return "(" + ToString(i->left, names) + "," + ToString(i->right, names) + ")";
}
std::unordered_map<std::string, int> enchants = {
		{"Protection", 1},
		{"Fire_Protection",2},
		{"Feather_Falling", 2},
		{"Blast_Protection",4},
		{"Projectile_Protection", 2},
		{"Thorns",8},
		{"Respiration", 4},
		{"Depth_Strider",4},
		{"Aqua_Affinity", 4},
		{"Sharpness",1},
		{"Smite", 2},
		{"Bane_of_Arthropods",2},
		{"Knockback", 2},
		{"Fire_Aspect",4},
		{"Looting",4},
		{"Efficiency",1},
		{"Silk_Touch",8},
		{"Unbreaking",2},
		{"Fortune",4},
		{"Power",1},
		{"Punch",4},
		{"Flame",4},
		{"Infinity",8},
		{"Luck_of_the_Sea",4},
		{"Lure",4},
		{"Frost_Walker",4},
		{"Mending",4},
		{"Curse_of_Binding",8},
		{"Curse_of_Vanishing",8},
		{"Impaling",4},
		{"Riptide",4},
		{"Loyalty",1},
		{"Channeling",8},
		{"Multishot",4},
		{"Piercing",1},
		{"Quick_Charge",2},
		{"Soul_Speed",8},
		{"Swift_Sneak",8},
		{"Sweeping_Edge",4}
};
int main(int argc, char* argv[]) {
	auto items = new list();
	auto old = new list();
	auto full = new list();
	//string strings[] = {"Protection_4","Feather_Falling_4","Thorns_3","Depth_Strider_3","Unbreaking_3","Mending_1","Soul_Speed_3","_"};
	for (int i = 0; i < argc - 1;i++) {
		string s = string(argv[i+1]);
		int cost = 0;
		int book = 0;
		int lvl = 0;
		if (s != "_") {
			int index = s.find_last_of('_');
			lvl = stoi(s.substr(index + 1));
			cost = enchants[s.substr(0, index)];
			book = (cost == 0 ? 0 : max(1, cost / 2));
		}
		items->push_front(new item(s != "_", cost * lvl, book * lvl, i));
	}
	for (int i = 0; i < 3; i++) {
		auto out = GetTrees(items, old, full);
		items->splice_after(items->begin(), *old);
		old = items;
		items = out;
	}
	int minLevel = 1000;
	item* end = nullptr;
	for (item* i : *full) if (i->totalCost < minLevel) {
			minLevel = i->totalCost;
			end = i;
		}
	cout << ToString(end, argv) << " " << minLevel << "\n";
}
