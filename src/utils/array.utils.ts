export const buildTree = (
  list,
  parentId = 'parentId',
  children = 'children',
) => {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i][children] = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node[parentId]) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node[parentId]]][children].push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};

export const flattenTree = (root = [], childField = 'children') => {
  if(!root || root.length === 0) {
    return root;
  }

  let res = root.map(item => {
    const temp = { ...item };
    delete temp[childField];
    return temp;
  });

  for(let item of root) {
    const itemClone = {...item};
    const children = itemClone[childField];

    if(!children || children.length === 0) {
      continue;
    }

    res = [
      ...res,
      ...flattenTree(children, childField),
    ]
  }

  return res;
}