export default function getWind(DiagramData) {
  let side = { N: 0, "N-E": 0, E: 0, "E-S": 0, S: 0, "S-W": 0, W: 0, "N-W": 0 };

  if (
    DiagramData.list[0].wind.deg < 20 &&
    DiagramData.list[0].wind.deg >= 335
  ) {
    side.N = DiagramData.list[0].wind.speed;
    side["N-E"] = DiagramData.list[0].wind.speed * 0.3;
    side["N-W"] = DiagramData.list[0].wind.speed * 0.3;
    return Object.values(side);
  } else if (
    DiagramData.list[0].wind.deg < 65 &&
    DiagramData.list[0].wind.deg >= 20
  ) {
    side["N-E"] = DiagramData.list[0].wind.speed;
    side.N = DiagramData.list[0].wind.speed * 0.3;
    side.E = DiagramData.list[0].wind.speed * 0.3;
    return Object.values(side);
  } else if (
    DiagramData.list[0].wind.deg < 110 &&
    DiagramData.list[0].wind.deg >= 65
  ) {
    side.E = DiagramData.list[0].wind.speed;
    side["N-E"] = DiagramData.list[0].wind.speed * 0.3;
    side["E-S"] = DiagramData.list[0].wind.speed * 0.3;
    return Object.values(side);
  } else if (
    DiagramData.list[0].wind.deg < 145 &&
    DiagramData.list[0].wind.deg >= 110
  ) {
    side["E-S"] = DiagramData.list[0].wind.speed;
    side.E = DiagramData.list[0].wind.speed * 0.3;
    side.S = DiagramData.list[0].wind.speed * 0.3;
    return Object.values(side);
  } else if (
    DiagramData.list[0].wind.deg < 200 &&
    DiagramData.list[0].wind.deg >= 145
  ) {
    side.S = DiagramData.list[0].wind.speed;
    side["S-W"] = DiagramData.list[0].wind.speed * 0.3;
    side["E-S"] = DiagramData.list[0].wind.speed * 0.3;
    return Object.values(side);
  } else if (
    DiagramData.list[0].wind.deg < 245 &&
    DiagramData.list[0].wind.deg >= 200
  ) {
    side["S-W"] = DiagramData.list[0].wind.speed;
    side.S = DiagramData.list[0].wind.speed * 0.3;
    side.W = DiagramData.list[0].wind.speed * 0.3;
    return Object.values(side);
  } else if (
    DiagramData.list[0].wind.deg < 290 &&
    DiagramData.list[0].wind.deg >= 245
  ) {
    side.W = DiagramData.list[0].wind.speed;
    side["N-W"] = DiagramData.list[0].wind.speed * 0.3;
    side["S-W"] = DiagramData.list[0].wind.speed * 0.3;
    return Object.values(side);
  } else if (
    DiagramData.list[0].wind.deg < 335 &&
    DiagramData.list[0].wind.deg >= 290
  ) {
    side["N-W"] = DiagramData.list[0].wind.speed;
    side.N = DiagramData.list[0].wind.speed * 0.3;
    side.W = DiagramData.list[0].wind.speed * 0.3;
    return Object.values(side);
  }
}
