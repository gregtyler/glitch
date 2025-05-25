const sockets = [
  "DIRT", "GRASS",
  "DG-TOPBOTTOM",
  "DG-BOTTOMTOP",
  "DG-LEFTRIGHT",
  "DG-RIGHTLEFT",
];

const tilemap = [
  { x: 0, y: 0, left: "DIRT", top: "DIRT", right: "DG-TOPBOTTOM", bottom: "DG-LEFTRIGHT" },
  { x: 1, y: 0, left: "DG-TOPBOTTOM", top: "DIRT", right: "DG-TOPBOTTOM", bottom: "GRASS" },
  { x: 2, y: 0, left: "DG-TOPBOTTOM", top: "DIRT", right: "DIRT", bottom: "DG-RIGHTLEFT" },
  { x: 2, y: 1, left: "GRASS", top: "DG-RIGHTLEFT", right: "DIRT", bottom: "DG-RIGHTLEFT" },
  { x: 2, y: 2, left: "DG-BOTTOMTOP", top: "DG-RIGHTLEFT", right: "DIRT", bottom: "DIRT" },
  { x: 1, y: 2, left: "DG-BOTTOMTOP", top: "GRASS", right: "DG-BOTTOMTOP", bottom: "DIRT" },
  { x: 0, y: 2, left: "DIRT", top: "DG-LEFTRIGHT", right: "DG-BOTTOMTOP", bottom: "DIRT" },
  { x: 0, y: 1, left: "DIRT", top: "DG-LEFTRIGHT", right: "GRASS", bottom: "DG-LEFTRIGHT" },
  
  { x: 1, y: 1, left: "GRASS", top: "GRASS", right: "GRASS", bottom: "GRASS" },
  { x: 5, y: 0, weight: 1/3, left: "DIRT", top: "DIRT", right: "DIRT", bottom: "DIRT" },
  { x: 6, y: 0, weight: 1/3, left: "DIRT", top: "DIRT", right: "DIRT", bottom: "DIRT" },
  { x: 7, y: 0, weight: 1/3, left: "DIRT", top: "DIRT", right: "DIRT", bottom: "DIRT" },
  
  { x: 3, y: 0, left: "DG-TOPBOTTOM", top: "DG-LEFTRIGHT", right: "DG-BOTTOMTOP", bottom: "DG-RIGHTLEFT" },
  { x: 4, y: 0, left: "DG-BOTTOMTOP", top: "DG-RIGHTLEFT", right: "DG-TOPBOTTOM", bottom: "DG-LEFTRIGHT" },
  
  { x: 3, y: 1, left: "GRASS", top: "GRASS", right: "DG-BOTTOMTOP", bottom: "DG-RIGHTLEFT" },
  { x: 4, y: 1, left: "DG-BOTTOMTOP", top: "GRASS", right: "GRASS", bottom: "DG-LEFTRIGHT" },
  { x: 3, y: 2, left: "GRASS", top: "DG-RIGHTLEFT", right: "DG-TOPBOTTOM", bottom: "GRASS" },
  { x: 4, y: 2, left: "DG-TOPBOTTOM", top: "DG-LEFTRIGHT", right: "GRASS", bottom: "GRASS" },
];

export const treemap = [
  { x: 9, y: 3, left: "", top: "", right: "T1", bottom: "T2" },
  { x: 9, y: 4, left: "", top: "T2", right: "T3", bottom: "" },
  { x: 10, y: 3, left: "T1", top: "", right: "", bottom: "T4" },
  { x: 10, y: 4, left: "T3", top: "T4", right: "", bottom: "" },
];

export default tilemap;