/*
 * Accepts the same arguments as run, and checks if they are valid.
 * Returns a iterable stream of error strings. If no errors are returned,
 * the arguments are valid.
 */
const Validate = (candidates, ballots) =>{
  let n = null;
  if (candidates instanceof Array) {
    n = candidates.length;
    for (const c of candidates) {
      if (typeof c !== "string") {
        return "each candidate must be a string";
      }
    }
  } else {
    return "candidates must be an array";
  }

  if (ballots instanceof Array) {
    for (const b of ballots) {
      if (b instanceof Array) {
        if (n !== null && b.length !== n) {
          return "each ballot must contain a rank for each candidate";
        }
        for (const r of b) {
          if (typeof r !== "number") {
            return "each candidate in a ballot must be given a number";
          }
        }
      } else {
        return "each ballot must be an array";
      }
    }
  } else {
    return "ballots must be an array";
  }
  return "AllOk";
};

/**
 * Takes in some ranks, e.g. [3, 1, 2, 1, 2],
 * and returns groups with places, e.g.
 *  [
 *    { place: 1, indexes: [1, 3] },
 *    { place: 3, indexes: [2, 4] },
 *    { place: 5, indexes: [0] }
 *  ]
 */
 const RanksToGroups = (ranks,candidates) => {
  //  console.log(candidates);
  const byRank = {};
  ranks.forEach((rank, i) => {
    if (byRank[rank] === undefined) {
      byRank[rank] = [];
    }
    byRank[rank].push(candidates[i]);
  });

  const keys = Object.keys(byRank);
  keys.sort((a, b) => a - b);
  const groups = keys.map((key) => byRank[key]);
  let place = 1;
  return groups.map((indexes) => {
    const placedGroup = { place, indexes };
    // place += indexes.length;
    place++;
    return placedGroup;
  });
};

/**
 * Takes a total number of candidates, and an ordering grouping, e.g.
 * groupsToRanks(5, [[0, 2], [1, 4]]), and returns a rank for each candidate, e.g.
 * [1, 2, 1, 3, 2]. Note that missing candidates are
 * assumed to be ranked last.
 */
 const GroupsToRanks = (n, groups) => {
  const ranks = Array(n).fill(groups.length + 1);
  groups.forEach((group, i) => {
    group.forEach((index) => {
      ranks[index] = i + 1;
    });
  });
  return ranks;
};


const Run = (n, ballots,candidates) => {
  // Initialize some tables
  const d = [];
  const p = [];
  for (var i = 0; i < n; i++) {
    d[i] = Array(n).fill(0);
    p[i] = Array(n).fill(0);
  }
  // Record preferences for each matchup
  for (const ballot of ballots) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i != j) {
          // For each distinct pair of candidates, record each preference
          if (ballot[i] < ballot[j]) {
            d[i][j]++;
          }
        }
      }
    }
  }

  // Calculate strongest paths (Floyd-Warshall algorithm)

  // Initialize trivial paths
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i != j) {
        if (d[i][j] > d[j][i]) {
          p[i][j] = d[i][j];
        }
      }
    }
  }

  // Explore alternate paths
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i != j) {
        for (let k = 0; k < n; k++) {
          if (i != k && j != k) {
            p[j][k] = Math.max(p[j][k], Math.min(p[j][i], p[i][k]));
          }
        }
      }
    }
  }

  // Count the number of pairwise wins per candidate
  const wins = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && p[i][j] > p[j][i]) {
        wins[i]++;
      }
    }
  }

  // Rank the candidates by wins
  // console.log(wins);
  return RanksToGroups(wins.map((w) => -w),candidates);
};

module.exports=Run;