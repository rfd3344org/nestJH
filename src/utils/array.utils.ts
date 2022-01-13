export const buildTree = (list, parentId = 'parentId') => {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node[parentId]) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node[parentId]]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};


export const flattenTree = (root = {}, children='children') => {
  let flatten = [Object.assign({}, root)];
  delete flatten[0][children];

  if (root[children] && root[children].length > 0) {
    return flatten.concat(root[children]
      .map((child)=>flattenTree(child, children))
      .reduce((a, b)=>a.concat(b), [])
    );
  }

  return flatten;
};
