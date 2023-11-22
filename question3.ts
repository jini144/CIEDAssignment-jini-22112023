interface MenuItem {
  name: string;
  id: string;
  parent?: MenuItem;
  child?: MenuItem;
}

function transformMenu(input: MenuItem[]): MenuItem[] {
  const idToMenuMap: { [id: string]: MenuItem } = {};

  // Create a map of id to menu item
  input.forEach((item) => {
    idToMenuMap[item.id] = item;
  });

  // Traverse the input array to build the hierarchy
  input.forEach((item) => {
    if (item.parent && idToMenuMap[item.parent.id]) {
      item.parent = idToMenuMap[item.parent.id];
      if (!item.parent.child) {
        item.parent.child = {};
      }
      item.parent.child = { ...item, child: item.parent.child };
    }
  });

  // Find the root menu items
  const roots: MenuItem[] = input.filter((item) => !item.parent);

  return roots;
}

// Example usage
const input: MenuItem[] = [
  {
    name: "Menu3",
    id: "1",
    parent: {
      name: "Menu2",
      id: "2",
      parent: {
        name: "Menu1",
        id: "3",
      },
    },
  },
  {
    name: "Menu44",
    id: "11",
    parent: {
      name: "Menu33",
      id: "22",
      parent: {
        name: "Menu22",
        id: "33",
        parent: {
          name: "Menu11",
          id: "44",
        },
      },
    },
  },
];

const output: MenuItem[] = transformMenu(input);

console.log(JSON.stringify(output, null, 2));
